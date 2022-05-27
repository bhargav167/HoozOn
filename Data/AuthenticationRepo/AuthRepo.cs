using System.Linq;
using System.Threading.Tasks;
using HoozOn.Data;
using System;
using HoozOn.Entities.Authentication;
using HoozOn.Helpers;
using Microsoft.EntityFrameworkCore;
namespace HoozOn.Data.AuthenticationRepo {
    public class AuthRepo : IAuthRepo {
        private readonly DataContext _context;
        private static TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById ("India Standard Time");
        public AuthRepo (DataContext context) {
            _context = context;
        }
        public async Task<SocialAuthentication> AddAuth (SocialAuthentication socialAuthentication) {
            socialAuthentication.LastActive=TimeZoneInfo.ConvertTimeFromUtc (DateTime.UtcNow, INDIAN_ZONE);
            socialAuthentication.IsOnline=true;
            await _context.SocialAuthentication.AddAsync (socialAuthentication);
            await _context.SaveChangesAsync ();

            return socialAuthentication;
        }
        public async Task<SocialAuthentication> LogOut(int loginId)
        {
            var socialAuthentication=await _context.SocialAuthentication.Where(x=>x.Id==loginId).FirstOrDefaultAsync();
             socialAuthentication.LastActive=TimeZoneInfo.ConvertTimeFromUtc (DateTime.UtcNow, INDIAN_ZONE);
            socialAuthentication.IsOnline=false;
             _context.SocialAuthentication.Update (socialAuthentication);
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

        public async Task<bool> IsUserNameExist (string UserName) {
            if (await _context.SocialAuthentication.AnyAsync (e => e.UserName.Substring (0, 3) == UserName.Substring (0, 3)))
                return true;

            return false;
        }

        public async Task<SocialAuthentication> Login (string email, string password) {
            var loginUser = await _context.SocialAuthentication.FirstOrDefaultAsync (x => x.Email == email && x.Password == password);
            return loginUser;
        }
    }
}