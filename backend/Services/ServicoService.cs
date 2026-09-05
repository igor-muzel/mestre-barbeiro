using backend.Data;
using backend.DTOs;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration; // Necessário caso você use o IConfiguration

namespace backend.Services
{
    // A classe deve herdar da interface IServicoService
    public class ServicoService : IServicoService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuracao;

        // Injetando o banco de dados e as configurações
        public ServicoService(AppDbContext context, IConfiguration configuracao)
        {
            _context = context;
            _configuracao = configuracao;
        }


        public async Task<(bool Sucesso, string Mensagem)> CriarServicoAsync(ServicoCreateDTO servicoCreateDTO)
        {
            try
            {
                if (servicoCreateDTO == null) return (false, "Serviço nulo");

                var verificaServico = await _context.Servicos.FirstOrDefaultAsync(s => s.NomeServico == servicoCreateDTO.NomeServico);

                if (verificaServico != null)
                {
                    return (false, "Serviço já cadastrado");
                }

                var novoServico = new Servico
                {
                    NomeServico = servicoCreateDTO.NomeServico,
                    PrecoServico = servicoCreateDTO.PrecoServico,
                    DuracaoEmMinutos = servicoCreateDTO.DuracaoEmMinutos,
                    BarbeiroId = servicoCreateDTO.BarbeiroId
                };

                _context.Servicos.Add(novoServico);
                await _context.SaveChangesAsync();

                return (true, "Serviço criado com sucesso");
            }
            catch(Exception ex)
            {
                return (false, "Erro ao criar serviço: " + ex.Message);
            }
        }

        public async Task<IEnumerable<ServicoResponseDTO>> ObterTodosServicosAsync()
        {
            try
            {
                var servicos = await _context.Servicos
            .Include(s => s.Barbeiro)
            .ToListAsync();

            if (servicos == null || !servicos.Any())
            {
                return new List<ServicoResponseDTO>();
            }

            var servicosResponseDTO = servicos.Select(s => new ServicoResponseDTO
            {
                Id = s.IdServico, // Corrigido aqui: s.IdServico
                NomeServico = s.NomeServico,
                PrecoServico = s.PrecoServico,
                DuracaoEmMinutos = s.DuracaoEmMinutos,
                NomeBarbeiro = s.Barbeiro != null ? s.Barbeiro.Name : "Desconhecido"
            });

            return servicosResponseDTO;
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao buscar serviços: " + ex.Message);
            }


        }

    }
}