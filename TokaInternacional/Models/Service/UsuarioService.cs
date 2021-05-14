using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace TokaInternacional.Models
{
    public class UsuarioService
    {
        private readonly TokaInternacionalContext _db;
        private readonly IHttpContextAccessor _httpContext;
        private readonly ApplicationSetting_Token _appSettingsToken;

        public UsuarioService(TokaInternacionalContext db, IOptions<ApplicationSetting_Token> appSettingsToken,
            IHttpContextAccessor httpContext)
        {
            _db = db;
            _httpContext = httpContext;
            _appSettingsToken = appSettingsToken.Value;
        }
        public async Task<Usuarios> GetUsuario()
        {
            string userId = _httpContext.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "UserID")?.Value ?? "0";
            //string userId = _httpContext.HttpContext.User?.Identity?.Name ?
            //el valor del id del dbSet<Usuario> es short por ello hay que convertir
            short idConvert = Convert.ToInt16(userId);
            //mostrar ese alumno autenticado 
            //var user = await db.Usuarios.FindAsync(idConvert);
            Usuarios user = await _db.Usuarios.Where(s => s.IdUsuarios == idConvert).FirstOrDefaultAsync();
            return user;
        }
        public async Task<ActionResult<Usuarios>> Login(Usuarios usuario)
        {
            //obtener la consulta del usuario 
            var Query_Usuario = await _db.Usuarios.Where(s => s.NombreUsuario == usuario.NombreUsuario
            && s.Password == usuario.Password).FirstOrDefaultAsync();

            //si la consulta devuelve datos
            if (Query_Usuario != null)
            {
                //crear e inicializar el descriptor del token
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID", Query_Usuario.IdUsuarios.ToString()) //inicializar el ID del Query
                    }),
                    //agregar fecha de expiración del token
                    Expires = DateTime.UtcNow.AddDays(1),

                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettingsToken.JWT_Secret)),
                        SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                //escribir el token esn eta variable 
                var token = tokenHandler.WriteToken(securityToken);
                return new ObjectResult(new { data = token, exito = true, message = "Inicio de sesión correcto" });
            }
            else
            {
                return new ObjectResult(new { exito = false, message = "Usuario o contraseña incorrectos" });
            }

        }
        public async Task<List<Usuarios>> GetUsuarios()
        {
            List<Usuarios> usuario = await _db.Usuarios.ToListAsync();
            return usuario;

        }
        public async Task<ActionResult<Usuarios>> RegistrarUsuario(Usuarios usuarios)
        {
            using IDbContextTransaction tranpost = this._db.Database.BeginTransaction();
            try
            {
                usuarios.FechaCreacion = DateTime.Now;
                usuarios.Password = Cifrado.ComputeHash(usuarios.Password, "SHA512", Cifrado.GetBytes("MyDemo"));
                _db.Usuarios.Add(usuarios);
                await _db.SaveChangesAsync();
                tranpost.Commit();
                return new ObjectResult(new { data = usuarios, exito = true, message = "El usuario ha sido registrado" });
            }
            catch (Exception ex)
            {
                tranpost.Rollback();
                return new ObjectResult(new { message = "Ha ocurrido un error en el registro: " + ex.Message });
            }
        }
    }
}
