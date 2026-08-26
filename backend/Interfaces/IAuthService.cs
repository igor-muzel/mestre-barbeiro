using backend.DTOs;

namespace backend.Interfaces
{
    public interface IAuthService
    {
        Task<(bool Sucesso, string Message)> CadastrarAsync(UsuarioCadastroDTO usuarioCadastroDTO);
        Task<(bool Sucesso, string Message, string Token, string Role)> LoginAsync(UsuarioLoginDTO usuarioLoginDTO);
    }
}