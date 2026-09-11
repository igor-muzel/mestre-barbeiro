using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.DTOs;

namespace backend.Interfaces
{
    public interface IUsuarioService
    {
        
        Task<Usuario?> BuscarUsuarioAsync(int id);
        Task<(bool Sucesso, string Mensagem)> ExcluirUsuarioAsync(int id);
        Task<IEnumerable<UsuarioClienteDTO>> ListarUsuariosComunsAsync();

    }
}