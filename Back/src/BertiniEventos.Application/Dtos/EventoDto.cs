using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using BertiniEventos.Domain;

namespace BertiniEventos.Application.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }

        [Display(Name = "Local")]
        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "O campo {0} deve ter entre 3 e 100 caracteres.")]
        public string Local { get; set; }

        public string DataEvento { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "O campo {0} deve ter entre 3 e 50 caracteres.")]
        public string Tema { get; set; }

        [Range(1, 100000, ErrorMessage = "A quantidade de pessoas deve ser entre 1 e 100.000.")]
        public int QtdPessoas { get; set; }

        public string Lote { get; set; }

        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$", ErrorMessage = "O campo {0} deve ser uma imagem válida. (gif, jpg, jpeg, bmp ou png)")]
        public string ImagemURL { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        [Phone(ErrorMessage = "O campo {0} é inválido.")]
        public string Telefone { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        [Display(Name = "e-mail")]
        [EmailAddress(ErrorMessage = "Precisa ser um {0} válido.")]
        public string Email { get; set; }

        public int UserId { get; set; }

        public UserDto UserDto { get; set; }

        public IEnumerable<LoteDto> Lotes { get; set; }
        public IEnumerable<RedeSocialDto> RedesSociais { get; set; }
        public IEnumerable<PalestranteDto> Palestrantes { get; set; }
    }
}