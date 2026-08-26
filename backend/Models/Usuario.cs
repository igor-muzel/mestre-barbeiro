using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Usuario
    {
        public int Id {get; set;}
        
        [Required(ErrorMessage = "O Nome é obrigatório.")]
        public string Name {get;set;}= string.Empty;

        [Required(ErrorMessage = "O e-mail é obrigatório.")]
        [EmailAddress(ErrorMessage = "Formato de e-mail inválido.")]
        public string Email {get; set;}= string.Empty;

        [Required(ErrorMessage = "O telefone é obrigatório.")]
        [Phone(ErrorMessage = "O formato do telefone é inválido.")]
        [StringLength(15, MinimumLength = 10, ErrorMessage = "O teletone deve ter de 10 a 15 caracteres (incluindo DDD)")]
        public string Telefone {get; set;}= string.Empty;
        [Required(ErrorMessage = "A senha é obrigatória.")]
        public string Senha {get; set;}= string.Empty;
        public string Role {get; set;} = "Comum";
    }
}