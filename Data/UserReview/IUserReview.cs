using System.Collections.Generic;
using System.Threading.Tasks;
using HoozOn.Entities.UserReview;

namespace HoozOn.Data.UserReview {
    public interface IUserReview { 
        Task<Review> AddReview (Review userReview);
        Task<IEnumerable<Review>> GetReviews(int userId);
         Task<int> GetReviewsCount(int userId);
    }
}