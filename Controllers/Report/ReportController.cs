using System.Threading.Tasks;
using HoozOn.Entities.Report;
using HoozOn.Entities.Responces;
using HoozOn.Services.Report;
using Microsoft.AspNetCore.Mvc;

namespace HoozOn.Controllers.Report {
    [ApiController]
    [Route ("api/[controller]")]
    public class ReportController : ControllerBase {
        private readonly IReport _reportRepo;

        public ReportController (IReport reportRepo) {
            _reportRepo = reportRepo;
        }
        //Register Method api/Job/AddJob
        [HttpPost ("AddJobReport")]
        public async Task<IActionResult> AddJobReport ([FromBody] Reporting reporting) {
            // validate request
            if (!ModelState.IsValid)
                return BadRequest (ModelState);

                
            ResponceData _responceData = new ResponceData ();
            _responceData.Status = 200;
            _responceData.Success = true;
            _responceData.Status_Message = "Repoted Successfully";
            var CreatedReporting = await _reportRepo.Reporting (reporting);
            return Ok (new { _responceData, CreatedReporting });
        }

        //Register Method api/Job/AddJob
        [HttpPost ("AddContactForm")]
        public async Task<IActionResult> AddJobReport ([FromBody] ContactUs contactUs) {
            // validate request
            if (!ModelState.IsValid)
                return BadRequest (ModelState);

            ResponceData _responceData = new ResponceData ();
            _responceData.Status = 200;
            _responceData.Success = true;
            _responceData.Status_Message = "Saved Successfully";
            var CreatedContact = await _reportRepo.AddContactUs (contactUs);
            return Ok (new { _responceData, CreatedContact });
        }

        //Register Method api/Job/AddJob
        [HttpPost ("AddUserReport")]
        public async Task<IActionResult> AddUserReport ([FromBody] UserReport reporting) {
            ResponceData _responceData = new ResponceData ();
            // validate request
            if (!ModelState.IsValid)
                return BadRequest (ModelState);
            var user = await _reportRepo.getAuthById (reporting.repotedID);
            if (user == null) {
                _responceData.Status = 200;
                _responceData.Success = true;
                _responceData.Status_Message = "Repoted Successfully";
            
                return Ok (new { _responceData });
            }

            _responceData.Status = 200;
            _responceData.Success = true;
            _responceData.Status_Message = "Repoted Successfully";
            var CreatedReporting = await _reportRepo.ReportingUser (reporting);
            return Ok (new { _responceData, CreatedReporting });
        }

    }
}