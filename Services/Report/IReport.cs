using System.Threading.Tasks;
using HoozOn.Entities.Report;

namespace HoozOn.Services.Report
{
    public interface IReport
    {
        
         Task<Reporting> Reporting (Reporting reporting);
         Task<ContactUs> AddContactUs (ContactUs contact);
    }
}