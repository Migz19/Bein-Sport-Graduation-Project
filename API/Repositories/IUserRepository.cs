using GPBack.Models;

namespace GPBack.Repositories
{
    public interface IUserRepository
    {
        public List<ApplicationUser> GetUsers();
        public ApplicationUser GetUser(string id);
        public ApplicationUser GetUserByUsername(string username);
        public ApplicationUser GetUserByEmail(string email);
    }
}
