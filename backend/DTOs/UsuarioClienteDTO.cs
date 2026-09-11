using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class UsuarioClienteDTO
    {
        public int Id { get; set; }
        public string Name {get;set;}= string.Empty;
        public string Email {get; set;}= string.Empty;
        public string Telefone {get; set;}= string.Empty;
       
        
    }
}