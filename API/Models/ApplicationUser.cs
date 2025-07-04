using Microsoft.AspNetCore.Identity;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace GPBack.Models
{
    public class ApplicationUser : IdentityUser
    {     
        public IEnumerable<Match> Matches { get; set; }
    }
}
