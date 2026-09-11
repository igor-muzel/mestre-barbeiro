using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.DTOs;
using backend.Services;
using backend.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsuariosController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }


        [HttpGet("BuscarUsuario/{id}")]
        public async Task<IActionResult> BuscarUsuario(int id)
        {
            var usuario = await _usuarioService.BuscarUsuarioAsync(id);
            if (usuario == null)
            {
                return NotFound("Usuário não encontrado");
            }
            return Ok(usuario);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> ExcluirUsuario(int id)
        {
            var usuarioExcluido = await _usuarioService.ExcluirUsuarioAsync(id);

            if(!usuarioExcluido.Sucesso)
            {
                return NotFound(new {sucesso = usuarioExcluido.Sucesso ,mensagem = usuarioExcluido.Mensagem });
            }

            
            return Ok(new { sucesso = usuarioExcluido.Sucesso, mensagem = usuarioExcluido.Mensagem });
        }

        [HttpGet]
        public async Task<IActionResult> GetUsuarios()
        {
            try
            {
                
                var usuarios = await _usuarioService.ListarUsuariosComunsAsync();

                if (usuarios == null || !usuarios.Any())
                {
                    return NotFound(new { mensagem = "Nenhum usuário encontrado." });
                }

                return Ok(usuarios);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Erro ao buscar usuários: " + ex.Message });
            }
        }





    }

}