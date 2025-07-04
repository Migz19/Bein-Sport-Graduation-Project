using GPBack.Data;
using GPBack.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace GPBack.Repositories
{
    public class MatchRepository : IMatchRepository
    {
        private readonly ApplicationDbContext _context;

        public MatchRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Match> GetMatches()
        {
            return _context.Matches.ToList();
        }

        public async Task<List<Match>> GetMatchesByUserId(string userId)
        {
            List<Match> match = await _context.Matches.Where(m => m.UserId == userId).ToListAsync();
            return match;
        }

        public Match GetMatch(string id)
        {
            return _context.Matches.Find(id);
        }

        public async Task<Match> GetMatchAsync(string id)
        {
            return await _context.Matches.FindAsync(id);
        }

        public int GetLastMatchId()
        {
            return _context.Matches.OrderByDescending(m => m.Id).FirstOrDefaultAsync().Result?.Id ?? 0;
        }

        public Match? GetLastMatchAsync()
        {
            return _context.Matches.LastOrDefault();
        }

        public async Task<bool> AddMatch(Match match)
        {
            _context.Matches.Add(match);
            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
