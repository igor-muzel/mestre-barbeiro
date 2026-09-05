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
        private readonly AppDbContext _context;

        public UsuariosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsuarios()
        {
            try
            {
                var usuarios = await _context.Usuarios
                .Where(u => u.Role == "Comum")
                .Select(u => new UsuarioClienteDTO
                {
                    Name = u.Name,
                    Email = u.Email,
                    Telefone = u.Telefone
                })
                .ToListAsync();

                if (usuarios == null)
                {
                    throw new Exception("Nenhum usuário encontrado.");
                }

                return Ok(usuarios);
            }
            
            catch (Exception ex)
            {
                throw new Exception("Erro ao buscar usuários: " + ex.Message);
            }
        }





    }

}