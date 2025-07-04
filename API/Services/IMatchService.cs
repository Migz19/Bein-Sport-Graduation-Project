using GPBack.Models;

namespace GPBack.Services
{
    public interface IMatchService
    {
        public List<Match> GetMatches();
        public Task<List<Match>> GetMatchesByUserId(string userId);
        public int GetLastMatchId();
        public Match? GetLastMatchAsync();
        public Match GetMatch(string id);
        public Task<bool> AddMatch(Match match);
    }
}
