using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HoozOn.Entities.UserReview;
using Microsoft.EntityFrameworkCore;

namespace HoozOn.Data.UserReview {
    public class UserReview : IUserReview {
        private readonly DataContext _context;
        public UserReview (DataContext context) {
            _context = context;
        }
        public async Task<Review> AddReview (Review userReview) {
            await _context.UserReview.AddAsync (userReview);
            await _context.SaveChangesAsync ();

            return userReview;
        }
        public async Task<IEnumerable<Review>> GetReviews (int userId) {
            return await _context.UserReview.Where (u => u.RecipientId==userId).ToListAsync();
        }

        public async Task<int> GetReviewsCount(int userId)
        {
             return await _context.UserReview.Where (u => u.RecipientId==userId).CountAsync();
        }
    }
}