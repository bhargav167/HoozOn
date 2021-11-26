using System.ComponentModel.DataAnnotations;

namespace HoozOn.Entities.Report
{
    public class ContactUs
    {
        [Key]
        public int Id { get; set; }
        public int userId { get; set; }
        public string ContactMessage { get; set; }
    }
}