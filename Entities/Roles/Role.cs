using System.ComponentModel.DataAnnotations;

namespace HoozOn.Entities.Roles {
    public class Role {
        public int Id { get; set; }
        [Required]
        public string RoleName { get; set; }
    }
}