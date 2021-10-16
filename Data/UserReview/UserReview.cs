using System.Threading.Tasks;
using HoozOn.Entities.UserReview;

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
    }
}