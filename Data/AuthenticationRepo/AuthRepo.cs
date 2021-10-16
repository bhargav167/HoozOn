using System.Threading.Tasks;
using HoozOn.Entities.Authentication;
using HoozOn.Helpers;
using HoozOn.Data;
using Microsoft.EntityFrameworkCore;
namespace HoozOn.Data.AuthenticationRepo {
    public class AuthRepo : IAuthRepo {
        private readonly DataContext _context;
        public AuthRepo (DataContext context) {
            _context = context;
        }
        public async Task<SocialAuthentication> AddAuth (SocialAuthentication socialAuthentication) {
            await _context.SocialAuthentication.AddAsync (socialAuthentication);
            await _context.SaveChangesAsync ();

            return socialAuthentication;
        }

        public async Task<SocialAuthentication> getAuthByEmail (string email) {
            var AuthUserExist = await _context.SocialAuthentication.FirstOrDefaultAsync (u => u.Email == email);
            return AuthUserExist;
        }

        public async Task<SocialAuthentication> getAuthById (int id) {
            var AuthUser = await _context.SocialAuthentication.FirstOrDefaultAsync (u => u.Id == id);
            return AuthUser;
        }

        public async Task<bool> IsAuthExist (string email) {
            if (await _context.SocialAuthentication.AnyAsync (e => e.Email == email))
                return true;

            return false;
        }

        public async Task<bool> IsUserNameExist(string UserName)
        {
            if (await _context.SocialAuthentication.AnyAsync (e => e.UserName.Substring(0,3) == UserName.Substring(0,3)  ))
                return true;

            return false;
        }
    }
}