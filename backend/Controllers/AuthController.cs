using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.DTOs;
using backend.Services;
using backend.Interfaces;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService )
        {
             _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UsuarioLoginDTO usuarioLoginDto)
        {
            var usuarioLogin = await _authService.LoginAsync(usuarioLoginDto);

            if (!usuarioLogin.Sucesso)
            {
                return Unauthorized(new{Sucesso=usuarioLogin.Sucesso,Message = usuarioLogin.Message});
            }

            return Ok(new{Sucesso=usuarioLogin.Sucesso, Message = usuarioLogin.Message, Token = usuarioLogin.Token, Role = usuarioLogin.Role});

        }

        [HttpPost("cadastrar")]
        public async Task<IActionResult> Cadastrar([FromBody] UsuarioCadastroDTO usuarioDto)
        {
           var resultado = await _authService.CadastrarAsync(usuarioDto);

           if(!resultado.Sucesso)
            {
                return BadRequest(new{Sucesso = false, Message = resultado.Message});
            }

            return Ok(new{Sucesso = true, Message = resultado.Message});

        }


    }    

}