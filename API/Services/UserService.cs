using GPBack.Models;
using GPBack.Repositories;

namespace GPBack.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public List<ApplicationUser> GetUsers()
        {
            return _userRepository.GetUsers();
        }

        public ApplicationUser GetUser(string id)
        {
            return _userRepository.GetUser(id);
        }

        public ApplicationUser GetUserByEmail(string email)
        {
            return _userRepository.GetUserByEmail(email);
        }

        public ApplicationUser GetUserByUsername(string username)
        {
            return _userRepository.GetUserByUsername(username);
        }
    }
}
