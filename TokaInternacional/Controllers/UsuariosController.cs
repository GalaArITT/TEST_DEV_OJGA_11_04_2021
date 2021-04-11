using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using TokaInternacional.Models;

namespace TokaInternacional.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly TokaInternacionalContext db;
        private readonly ApplicationSetting_Token _appSettings_token;
        private readonly IHttpContextAccessor _httpContext;

        public UsuariosController(TokaInternacionalContext context, IOptions<ApplicationSetting_Token> appSettings_token)
        {
            db = context;
            _appSettings_token = appSettings_token.Value;
        }
        [HttpGet("[action]")]
        [Authorize]
        //endpoint para obtener el usuario autenticado
        public async Task<Usuarios> GetUsuario()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            //el valor del id del dbSet<Usuario> es short por ello hay que convertir
            short idConvert = Convert.ToInt16(userId);
            //mostrar ese alumno autenticado 
            //var user = await db.Usuarios.FindAsync(idConvert);
            Usuarios user = await db.Usuarios.Where(s => s.IdUsuarios == idConvert).FirstOrDefaultAsync();
            return user; 
        }
        // POST: api/Usuarios
        //login para usuario 
        [HttpPost("[action]")]
        public async Task<IActionResult> Login(Usuarios usuario)
        {
            //obtener la consulta del usuario 
            var Query_Usuario = await db.Usuarios.Where(s => s.NombreUsuario == usuario.NombreUsuario
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
                        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings_token.JWT_Secret)),
                        SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                //escribir el token esn eta variable 
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }
            else
            {
                return BadRequest(new { message = "Usuario o contraseña incorrectos" });
            }

        }
        public async Task<Usuarios> getUsuarioConectado()
        {
            Usuarios usuarioBD = null;
            string usuarioAD = _httpContext.HttpContext.User?.Identity?.Name ?? "0";
            if (usuarioAD != "0")
            {
                usuarioBD = await db.Usuarios.Where(s => s.IdUsuarios == Convert.ToInt32(usuarioAD)).FirstOrDefaultAsync();
            }
            return usuarioBD;
        }
    }
}
