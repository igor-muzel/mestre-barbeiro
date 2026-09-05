using backend.Data;
using backend.Models;
using backend.DTOs;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using MySqlConnector;

namespace backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuracao;

        public AuthService(AppDbContext context, IConfiguration iconfiguration)
        {
            _context = context;
            _configuracao = iconfiguration;
        }


        public async Task<(bool Sucesso, string Message, string? Token, string? Role)> LoginAsync(UsuarioLoginDTO usuarioLoginDTO)
        {

            try
            {
                if (usuarioLoginDTO == null) return (false, "Usuário nulo", null, null);

                var encontrarUsuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == usuarioLoginDTO.Email);

                if (encontrarUsuario == null)
                {
                    return (false, "E-mail ou senha inválidos", null, null);
                }
                //verifica a senha digitada no login com a senha com hash no banco de dados
                bool senhaValida = BCrypt.Net.BCrypt.Verify(usuarioLoginDTO.Senha, encontrarUsuario.Senha);

                if (!senhaValida)
                {
                    return (false, "E-mail ou senha inválidos", null, null);
                }
                //cria-se o token passando o usuario encontrado no banco de dados
                var token = GenerateTokenJwt(encontrarUsuario);

                return (true, "Login realizado com sucesso", token, encontrarUsuario.Role);
            }
            catch (MySqlException ex)
            {
                return (false, "Erro ao realizar login: " + ex.Message, null, null);
            }
            catch (Exception)
            {
                throw;
            }

        }

        //criação do token
        private string GenerateTokenJwt(Usuario usuario)
        {
            //busca no appsetings.json a chave(key) do jwt 
            var jwtKey = _configuracao["Jwt:Key"] ?? "";
            var keyBytes = Encoding.ASCII.GetBytes(jwtKey);
            var chaveSimetrica = new SymmetricSecurityKey(keyBytes);
            var credenciais = new SigningCredentials(chaveSimetrica, SecurityAlgorithms.HmacSha256Signature);


            //criação das Claims para autorização.

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
                new Claim(ClaimTypes.Email, usuario.Email),
                new Claim(ClaimTypes.Name, usuario.Name),
                // Embutimos se ele é "Admin" ou "Comum" diretamente no Token
                new Claim(ClaimTypes.Role, usuario.Role)
            };

            var descritorToken = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(2),
                Issuer = _configuracao["Jwt:Issuer"],
                Audience = _configuracao["Jwt:Audience"],
                SigningCredentials = credenciais
            };

            var manipuladorToken = new JwtSecurityTokenHandler();
            var tokenCriado = manipuladorToken.CreateToken(descritorToken);

            return manipuladorToken.WriteToken(tokenCriado);
        }


        public async Task<(bool Sucesso, string Message)> CadastrarAsync(UsuarioCadastroDTO usuarioCadastroDTO)
        {
            string verificarSenha = usuarioCadastroDTO.Senha;
            if (verificarSenha.Length < 6 ||
            !verificarSenha.Any(char.IsUpper) ||
            !verificarSenha.Any(char.IsLower) ||
            !verificarSenha.Any(char.IsDigit) ||
            !verificarSenha.Any(c => !char.IsLetterOrDigit(c)))
            {
                return (false, "Senha fraca! A senha deve conter acima de 6 caracteres, pelo menos uma letra maiúscula, uma letra minúscula e um caractere especial (!@#$%&(*)");
            }

            var usuarioExiste = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == usuarioCadastroDTO.Email);

            if (usuarioExiste != null)
            {
                return (false, "Este e-mail já existe, tente novamente");
            }

            string senhaCriptografada = BCrypt.Net.BCrypt.HashPassword(usuarioCadastroDTO.Senha);

            var novoUsuario = new Usuario
            {
                Name = usuarioCadastroDTO.Name,
                Email = usuarioCadastroDTO.Email,
                Telefone = usuarioCadastroDTO.Telefone,
                Senha = senhaCriptografada
            };

            await _context.Usuarios.AddAsync(novoUsuario);
            await _context.SaveChangesAsync();

            return (true, "Usuário cadastrado com sucesso");
        }

    }
}