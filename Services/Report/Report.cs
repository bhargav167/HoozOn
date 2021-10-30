using System.Threading.Tasks;
using HoozOn.Data;
using HoozOn.Entities.Report;

namespace HoozOn.Services.Report {
    public class Report : IReport {
        private readonly DataContext _context;
        public Report (DataContext context) {
            _context = context;
        }

        public async Task<Reporting> Reporting (Reporting reporting) {
            await _context.Reporting.AddAsync (reporting);
            await _context.SaveChangesAsync ();

            return reporting;
        }
    }
}