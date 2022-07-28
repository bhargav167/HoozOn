using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities.Control;

namespace API.Data.AdminRepo
{
    public interface IAdmin{
         Task<bool> IsSetExist (string name);
        Task<Sets> AddSet(Sets set);
        Task<SetJob> AddJobSet(SetJob Jobset);
        Task<List<Sets>> GetSets();
         Task<List<SetJob>> GetJobSets(int setId);
    }
}