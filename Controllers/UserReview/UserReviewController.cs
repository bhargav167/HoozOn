using System.Threading.Tasks;
using HoozOn.Data.PhaseRepo1;
using HoozOn.Data.UserReview;
using HoozOn.Entities.Responces;
using HoozOn.Entities.UserReview;
using Microsoft.AspNetCore.Mvc;

namespace HoozOn.Controllers.UserReview {
    [ApiController]
    [Route ("api/[controller]")]
    public class UserReviewController : ControllerBase {
        private readonly ICrudRepo _crudrepo;
        private readonly IUserReview _userReview;
        public UserReviewController (ICrudRepo crudrepo, IUserReview userReview) {
            _crudrepo = crudrepo;
            _userReview = userReview;
        }

        //Register Method api/Job/AddJob
        [HttpPost ("AddReview")]
        public async Task<IActionResult> AddReview ([FromBody] Review review) {
            //Instances of Responces
            ResponceData responceData = new ResponceData ();
            // validate request
            if (!ModelState.IsValid)
                return BadRequest (ModelState); 

                //Add Check for user avability

            try {
                var reviewCreated = await _userReview.AddReview (review);
                responceData.Status = 200;
                responceData.Success = true;
                responceData.Status_Message = "Your Review saved Successfully";
                return Ok (new { responceData, reviewCreated });
            } catch (System.Exception ex) {
                throw new System.Exception ("Error occure " + ex);
            }
        }

        [HttpGet ("GetUserReview/{userId}")]
        public async Task<IActionResult> GetUserReview (int userId) {
            float totalReview = 0;
            var serchItemShowing = await _userReview.GetReviews (userId);
            int reviewCount=await _userReview.GetReviewsCount(userId);
            foreach (var item in serchItemShowing) {
                totalReview = totalReview + item.ReviewValue;
            }
            float reviewValue=totalReview/reviewCount;
            return Ok (reviewValue);
        }
    }
}