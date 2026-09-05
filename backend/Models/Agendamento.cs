using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Agendamento
    {
        [Key]
        public int IdAgendamento { get; set; }

        [Required]
        public DateTime DataHora { get; set; }

        public string Status { get; set; } = "Pendente";
        [Required]
        public int ClienteId {get; set;} // Chave estrangeira para o client

        [ForeignKey("ClienteId")]
        public Usuario? Cliente { get; set; } // Mágica de navegação para o Cliente

        // --- RELACIONAMENTO COM O SERVIÇO --- //

        [Required]
        public int ServicoId { get; set; }

        [ForeignKey("ServicoId")]
        public Servico? Servico { get; set; } // Mágica de navegação para o Serviço
    
    }
}