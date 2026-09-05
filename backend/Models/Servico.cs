using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace backend.Models
{
    public class Servico
    {

        [Key]
        public int IdServico {get; set;}
        [Required]
        public string NomeServico {get; set;}= string.Empty;
        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal PrecoServico {get; set;}
        [Required]
        public int DuracaoEmMinutos {get; set;}
        [Required]
        public int BarbeiroId { get; set; }
        [ForeignKey("BarbeiroId")]
        public Usuario? Barbeiro { get; set; }
    }
}