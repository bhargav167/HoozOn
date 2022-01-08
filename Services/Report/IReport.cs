using System.Threading.Tasks;
using HoozOn.Entities.Authentication;
using HoozOn.Entities.Report;

namespace HoozOn.Services.Report {
    public interface IReport {

        Task<Reporting> Reporting (Reporting reporting);
        Task<UserReport> ReportingUser (UserReport reporting);
        Task<ContactUs> AddContactUs (ContactUs contact);

        //Get User To Check avalibility
         Task<SocialAuthentication> getAuthById (int id);
    }
}