using System.ComponentModel.DataAnnotations;

namespace GPBack.Models
{
    public class AddMatchDto
    {
        public string UserId { get; set; }

        [Required]
        public string Championship { get; set; }

        [Required]
        public string Team1 { get; set; }

        [Required]
        public string Team2 { get; set; }

        [Required]
        public int PossT1 { get; set; }

        [Required]
        public int PossT2 { get; set; }

        public string? Round { get; set; }

        [Required]
        public int Year { get; set; }

        public string? Description { get; set; }
    }
}
