using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs;

namespace backend.Interfaces
{
    public interface IServicoService
    {
        Task<(bool Sucesso, string Mensagem)> CriarServicoAsync(ServicoCreateDTO servicoCreateDTO);

        Task<IEnumerable<ServicoResponseDTO>> ObterTodosServicosAsync();
    }
}