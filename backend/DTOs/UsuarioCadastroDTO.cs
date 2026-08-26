using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class UsuarioCadastroDTO
    {
        
        public string Name {get;set;}= string.Empty;
        public string Email {get; set;}= string.Empty;
        [Required(ErrorMessage = "O telefone é obrigatório.")]
        [Phone(ErrorMessage = "O formato do telefone é inválido.")]
        [StringLength(15, MinimumLength = 10, ErrorMessage = "O teletone deve ter de 10 a 15 caracteres (incluindo DDD)")]
        public string Telefone {get; set;}= string.Empty;
        public string Senha {get; set;}= string.Empty;
        
    }
}