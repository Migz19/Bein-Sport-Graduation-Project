using GPBack.Models;

namespace GPBack.Services
{
    public interface IUserService
    {
        public List<ApplicationUser> GetUsers();
        public ApplicationUser GetUser(string id);
        public ApplicationUser GetUserByUsername(string username);
        public ApplicationUser GetUserByEmail(string email);
    }
}
