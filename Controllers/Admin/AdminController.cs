using System.Threading.Tasks;
using API.Data.AdminRepo;
using HoozOn.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using API.Entities.Control;
using System;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers.Admin
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase{
         private readonly IAdmin _iAdminRepo;
         private readonly DataContext _context;
         public AdminController(IAdmin iAdminRepo,  DataContext context){
            _iAdminRepo = iAdminRepo; 
            _context = context;
         }

        //AddSets Method 
        [HttpPost("AddSet")]
        public async Task<IActionResult> AddSet([FromBody] MasterSet sets){
            try{
                if (await _iAdminRepo.IsSetExist(sets.Name))
                    return BadRequest();

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                //Saving Sets
                Sets set = new Sets();
                set.Name = sets.Name;
                var addedSet = await _iAdminRepo.AddSet(set);
                //Saving JobSet
                var jobs=sets.JobId.Split(',');
                foreach (var item in jobs){
                      SetJob setJob = new SetJob();
                setJob.JobId = Convert.ToInt32(item.Trim());
                setJob.SetId = addedSet.Id;
                await _iAdminRepo.AddJobSet(setJob);
                await _context.SaveChangesAsync();
                }
              
                return Ok(addedSet);
            }
            catch (Exception ex)
            {
                throw new Exception("Exception " + ex);
            }

        }
    }
}