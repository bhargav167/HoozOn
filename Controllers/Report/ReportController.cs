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

    }
}