using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace backend.DTOs
{
    public class ServicoResponseDTO
    {
       public int Id { get; set; }
        public string NomeServico { get; set; } = string.Empty;
        public decimal PrecoServico { get; set; }
        public int DuracaoEmMinutos { get; set; }
        public string NomeBarbeiro { get; set; } = string.Empty; // Em vez de mandar todo o objeto Barbeiro, mandamos só o nome!
    }
}