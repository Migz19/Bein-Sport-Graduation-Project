using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GPBack.Models
{
    public class Match
    {
        public int Id { get; set; }

        [Required]
        public string UserId { get; set; }

        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }

        public string? Championship { get; set; }

        [Required]
        public string Team1 { get; set; }
        
        [Required]
        public string Team2 { get; set; }

        [Required]
        public int PossT1 { get; set; }

        [Required]
        public int PossT2 { get; set; }

        public string? Round { get; set; }

        public int? Year { get; set; }

        public string? Description { get; set; }
    }
}