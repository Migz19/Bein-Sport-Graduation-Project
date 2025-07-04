using GPBack.Models;
using GPBack.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace GPBack.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MatchController : Controller
    {
        private readonly IMatchService _matchService;
        private readonly UserManager<ApplicationUser> _userManager;

        public MatchController(IMatchService matchService, UserManager<ApplicationUser> userManager)
        {
            _matchService = matchService;
            _userManager = userManager;
        }

        [HttpPost("display-matches")]
        public async Task<IActionResult> DisplayMatches(string userId)
        {
            var matches = await _matchService.GetMatchesByUserId(userId);
            return Ok(matches);
        }

        [HttpPost("add-match")]
        public async Task<IActionResult> AddMatch([FromBody] AddMatchDto matchDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new
                {
                    message = "Invalid match data",
                    errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage)
                });
            }

            var match = new Match
            {
                //Id = _matchService.GetLastMatchId() + 1,
                UserId = matchDto.UserId,
                User = _userManager.Users.FirstOrDefault(u => u.Id == matchDto.UserId),
                Championship = matchDto.Championship,
                Team1 = matchDto.Team1,
                Team2 = matchDto.Team2,
                Year = matchDto.Year,
                PossT1 = matchDto.PossT1,
                PossT2 = matchDto.PossT2,
                Round = matchDto.Round,
                Description = matchDto.Description ?? ""
            };

            var result = await _matchService.AddMatch(match);
            if (result)
            {
                return Ok(new { message = "The match is added successfully" });
            }
            return BadRequest(new { message = "The match failed to be added" });
        }

    }
}
