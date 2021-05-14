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
using Microsoft.EntityFrameworkCore.Storage;
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
        private readonly UsuarioService _usuarioService;
        private readonly IHttpContextAccessor _httpContext;

        public UsuariosController(TokaInternacionalContext context, IOptions<ApplicationSetting_Token> appSettings_token,
            UsuarioService usuarioService)
        {
            db = context;
            _appSettings_token = appSettings_token.Value;
            _usuarioService = usuarioService;
        }
        [HttpGet("[action]")]
        [Authorize]
        //endpoint para obtener el usuario autenticado
        public async Task<Usuarios> GetUsuario()
        {
            Usuarios usuarioConectado = await _usuarioService.GetUsuario();
            return usuarioConectado; 
        }
        // POST: api/Usuarios
        //login para usuario 
        [HttpPost("[action]")]
        public async Task<ActionResult<Usuarios>> Login(Usuarios usuario)
        {
            ActionResult<Usuarios> usuarioLogueado = await _usuarioService.Login(usuario);
            return usuarioLogueado;
        }
        [HttpGet("[action]")]
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
        [HttpGet("[action]")]
        public async Task<List<Usuarios>> getUsuarios()
        {
            List<Usuarios> usuario = await _usuarioService.GetUsuarios();
            return usuario;

        }
        [HttpPost("[action]")]
        public async Task<ActionResult<Usuarios>> RegistrarUsuario(Usuarios usuarios)
        {
            ActionResult<Usuarios> usuario = await _usuarioService.RegistrarUsuario(usuarios);
            return usuario;
        }

    }
}
