using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace backend.DTOs
{
    public class ServicoResponseDTO
    {
       public int Id { get; set; }
       public string NomeBarbeiro { get; set; } = string.Empty;
        public string NomeServico { get; set; } = string.Empty;
        public decimal PrecoServico { get; set; }
        public int DuracaoEmMinutos { get; set; }
       
    }
}