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

            try {
                var reviewCreated = await _userReview.AddReview (review);
                responceData.Status = 200;
                responceData.Success = true;
                responceData.Status_Message = "Your Job saved Successfully";
                return Ok (new { responceData, reviewCreated });
            } catch (System.Exception ex) {
                throw new System.Exception ("Error occure " + ex);
            }
        }

    }
}