using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs
{
    public class ClienteAtualizarDTO
    {
        public int Id {get; set;}
        public string Name {get; set;} = string.Empty;
        public string Telefone {get;set;} = string.Empty;
        public string Email {get;set;} = string.Empty;
        
    }
}