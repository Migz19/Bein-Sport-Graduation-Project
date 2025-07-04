using GPBack.Models;
using GPBack.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace GPBack.Services
{
    public class MatchService : IMatchService
    {
        private readonly IMatchRepository _matchRepository;

        public MatchService(IMatchRepository matchRepository)
        {
            _matchRepository = matchRepository;
        }

        public List<Match> GetMatches()
        {
            return _matchRepository.GetMatches();
        }

        public async Task<List<Match>> GetMatchesByUserId(string userId)
        {
            return await _matchRepository.GetMatchesByUserId(userId);
        }

        public int GetLastMatchId()
        {
            return _matchRepository.GetLastMatchId();
        }

        public Match? GetLastMatchAsync()
        {
            return _matchRepository.GetLastMatchAsync();
        }

        public Match GetMatch(string id)
        {
            return _matchRepository.GetMatch(id);
        }

        public async Task<bool> AddMatch(Match match)
        {
            return await _matchRepository.AddMatch(match);
        }
    }
}
