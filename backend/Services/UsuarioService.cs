using backend.Data;
using backend.DTOs;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;


namespace backend.Services
{

    public class UsuarioService : IUsuarioService
    {
        private readonly AppDbContext _context;


        // Injetando o banco de dados e as configurações
        public UsuarioService(AppDbContext context)
        {
            _context = context;

        }

        public async Task<Usuario?> BuscarUsuarioAsync(int id)
        {
            try
            {
                // MUDANÇA 1: FindAsync só recebe o ID diretamente, e não uma expressão lambda (u => u.Id == id)
                var usuario = await _context.Usuarios.FindAsync(id);

                if (usuario == null)
                {
                    return null;
                }

                return usuario;
            }
            catch (Exception)
            {
                // MUDANÇA 2: 'throw' não pode ser retornado. Apenas jogamos o erro para cima!
                throw;
            }
        }

        // MUDANÇA 3: Trazendo a lógica do 'GetUsuarios' da Controller para o Cérebro (Serviço)
        public async Task<IEnumerable<UsuarioClienteDTO>> ListarUsuariosComunsAsync()
        {
            var usuarios = await _context.Usuarios
                .Where(u => u.Role == "Comum")
                .Select(u => new UsuarioClienteDTO
                {
                    Id = u.Id,
                    Name = u.Name,
                    Email = u.Email,
                    Telefone = u.Telefone
                })
                .ToListAsync();

            return usuarios;
        }


        public async Task<(bool Sucesso, string Mensagem)> ExcluirUsuarioAsync(int id)
        {
            try
            {
                var usuarioParaExcluir = await BuscarUsuarioAsync(id);

                if (usuarioParaExcluir == null)
                {
                    return (false, "Usuário não encontrado");
                }

                _context.Usuarios.Remove(usuarioParaExcluir);
                await _context.SaveChangesAsync();

                return (true, "Usuário excluído com sucesso");
            }

            catch (Exception ex)
            {
                return (false, "Erro ao excluir usuário: " + ex.Message);
            }
        }



    }
}