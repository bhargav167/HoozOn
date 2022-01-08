using System.Threading.Tasks;
using HoozOn.Data;
using HoozOn.Entities.Authentication;
using HoozOn.Entities.Report;
using Microsoft.EntityFrameworkCore;

namespace HoozOn.Services.Report {
    public class Report : IReport {
        private readonly DataContext _context;
        public Report (DataContext context) {
            _context = context;
        }

        public async Task<ContactUs> AddContactUs (ContactUs contact) {
            await _context.ContactUs.AddAsync (contact);
            await _context.SaveChangesAsync ();

            return contact;
        }

        public async Task<SocialAuthentication> getAuthById (int id) {
            var AuthUser = await _context.SocialAuthentication.FirstOrDefaultAsync (u => u.Id == id);
            return AuthUser;
        }

        public async Task<Reporting> Reporting (Reporting reporting) {
            await _context.Reporting.AddAsync (reporting);
            await _context.SaveChangesAsync ();

            return reporting;
        }

        public async Task<UserReport> ReportingUser (UserReport reporting) {
            await _context.UserReport.AddAsync (reporting);
            await _context.SaveChangesAsync ();

            return reporting;
        }
    }
}