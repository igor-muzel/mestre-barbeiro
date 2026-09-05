using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.DTOs;
using backend.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    
    public class ServicoController : ControllerBase
    {
        private readonly IServicoService _servicoService;

        public ServicoController(IServicoService servicoService)
        {
            _servicoService = servicoService;
        }

        [HttpPost("CriarServico")]
        public async Task<IActionResult> CriarServico([FromBody] ServicoCreateDTO servicoCreateDTO)
        {
            var resultado = await _servicoService.CriarServicoAsync(servicoCreateDTO);

            if (!resultado.Sucesso)
            {
                return BadRequest(new { Sucesso = false, Mensagem = resultado.Mensagem });
            }

            return Ok(new { Sucesso = true, Mensagem = resultado.Mensagem });
           
            
        }

        [HttpGet("ObterTodosServicos")]
        public async Task<IActionResult> ObterTodosServicos()
        {
           var servicos = await _servicoService.ObterTodosServicosAsync();

            if (servicos == null || !servicos.Any())
            {
                return NotFound(new { Sucesso = false, Mensagem = "Nenhum serviço encontrado" });
            }
           
           return Ok(servicos);
        }
    }
}