using System.ComponentModel.DataAnnotations;

namespace HoozOn.Entities.Responces {
    public class ResponceData {
        public int? Status { get; set; }
        public bool Success { get; set; }

        [Display (Name = "Status_Message")]
        public string Status_Message { get; set; }
    }
}