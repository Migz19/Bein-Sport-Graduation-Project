//using GPBack.Migrations;
using GPBack.Models;
using GPBack.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace GPBack.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserStore<ApplicationUser> _userStore;
        private readonly IUserEmailStore<ApplicationUser> _emailStore;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IUserService _userService;
        private readonly IMatchService _matchService;

        public AuthController(UserManager<ApplicationUser> userManager, IUserStore<ApplicationUser> userStore, SignInManager<ApplicationUser> signInManager, IUserService userService, IMatchService matchService)
        {
            _userManager = userManager;
            _userStore = userStore;
            _emailStore = (IUserEmailStore<ApplicationUser>)_userStore;
            _signInManager = signInManager;
            _userService = userService;
            _matchService = matchService;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterVM input)
        {
            try
            {
                if (input == null) return BadRequest("Invalid request data.");

                if (input.Password != input.ConfirmPassword)
                {
                    return BadRequest(new { Message = "Passwords do not match" });
                }

                var user = new ApplicationUser { UserName = input.Username, Email = input.Email };
                var result = await _userManager.CreateAsync(user, input.Password);

                if (result.Succeeded)
                {
                    await _signInManager.SignInAsync(user, isPersistent: false);
                    return Ok(new { userId = user.Id });
                }

                // Return errors in JSON format
                var errors = result.Errors.Select(e => e.Description);
                return BadRequest(new { Message = "Registration failed", Errors = errors });
            }
            catch (Exception ex)
            {
                // Log the exception here
                return StatusCode(500, new { Message = "Internal server error" });
            }
        }


        [HttpPost("Login")]
        public async Task<IActionResult> PostLogin(LoginVM input)
        {
            var user = await _signInManager.UserManager.FindByEmailAsync(input.Email);
            if (user == null)
            {
                ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                return BadRequest(new { errors = ModelState });
            }
            //user.Matches = await _matchService.GetMatchesByUserId(user.Id);

            var result = await _signInManager.PasswordSignInAsync(user.UserName, input.Password, input.RememberMe, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                return Ok(new { userId = user.Id });
            }
            ModelState.AddModelError(string.Empty, "Invalid login attempt.");
            return BadRequest(new { errors = ModelState });
        }
    }
}
