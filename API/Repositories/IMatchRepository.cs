using GPBack.Models;
using Microsoft.AspNetCore.Mvc;

namespace GPBack.Repositories
{
    public interface IMatchRepository
    {
        public List<Match> GetMatches();
        public Task<List<Match>> GetMatchesByUserId(string userId);
        public int GetLastMatchId();
        public Match? GetLastMatchAsync();
        public Match GetMatch(string id);
        public Task<bool> AddMatch(Match match);
    }
}
