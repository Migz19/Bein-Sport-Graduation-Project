using GPBack.Data;
using GPBack.Models;

namespace GPBack.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public List<ApplicationUser> GetUsers()
        {
            return _context.Users.ToList();
        }

        public ApplicationUser GetUser(string id)
        {
            var user = _context.Users.Find(id);
            user.Matches = _context.Matches.Where(m => m.UserId == id).ToList();
            return user;
        }

        public ApplicationUser GetUserByEmail(string email)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == email);
            user.Matches = _context.Matches.Where(m => m.UserId == user.Id).ToList();
            return user;
        }

        public ApplicationUser GetUserByUsername(string username)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserName == username);
            user.Matches = _context.Matches.Where(m => m.UserId == user.Id).ToList();
            return user;
        }
    }
}
