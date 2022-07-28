using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities.Control;
using HoozOn.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Data.AdminRepo
{
    public class Admin:IAdmin
    {
          private readonly DataContext _context;
          public Admin(DataContext context) {
            _context = context;
            
          }
        public async Task<SetJob> AddJobSet(SetJob Jobset)
        {
              await _context.setJob.AddAsync (Jobset);
            await _context.SaveChangesAsync ();

            return Jobset;
        }

        public async Task<Sets> AddSet(Sets set)
        {
            await _context.sets.AddAsync (set);
            await _context.SaveChangesAsync ();

            return set;
        }

        public async Task<List<SetJob>> GetJobSets(int setId){
         var JobSets= await _context.setJob.Where(x=>x.SetId==setId).Include(x=>x.Job).Include(x=>x.Set).ToListAsync();
          return JobSets;
        }

        public async Task<List<Sets>> GetSets(){
            var sets = await _context.sets.ToListAsync();
            return sets;
        }

        public async Task<bool> IsSetExist(string name){
               if (await _context.sets.AnyAsync (e => e.Name == name))
                return true;

            return false;
        }
    }
}