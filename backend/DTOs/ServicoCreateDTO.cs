
namespace backend.DTOs
{
    public class ServicoCreateDTO
    {

        public string NomeServico {get; set;}= string.Empty;
        public decimal PrecoServico {get; set;}
        public int DuracaoEmMinutos {get; set;}
        public int BarbeiroId { get; set; }
        
    }
}