using System.Threading.Tasks;
using HoozOn.Entities.Authentication;
using HoozOn.Entities.Users;
using HoozOn.Helpers;
using Microsoft.EntityFrameworkCore;

namespace HoozOn.Data.PhaseRepo1 {
    public class CrudRepo : ICrudRepo {
        private readonly DataContext _context;
        public CrudRepo (DataContext context) {
            _context = context;
        }
        public void Add<T> (T entity) where T : class {
            _context.Add (entity);
        }

        public void Delete<T> (T entity) where T : class {
            _context.Remove (entity);
        }
        public async Task<bool> SaveAll () {
            return await _context.SaveChangesAsync () > 0;
        }

        //User Repo
        public async Task<bool> IsUserExist (string UserName) {
            if (await _context.Users.AnyAsync (e => e.UserName == UserName))
                return true;

            return false;
        }

        public async Task<User> AddUser (User users) {
            await _context.Users.AddAsync (users);
            await _context.SaveChangesAsync ();

            return users;
        }

        public async Task<PagedList<User>> GetUser (UserParams userParam) {
            var user = _context.Users.AsQueryable ();
            return await PagedList<User>.CreateAsync (user, userParam.PageNumber, userParam.PageSize);
        }

        public async Task<User> getUserById (int Id) {
            var user = await _context.Users.FirstOrDefaultAsync (u => u.Id == Id);
            return user;
        }

        public async Task<User> getUserByAuthId (int id) {
            var user = await _context.Users.FirstOrDefaultAsync (u => u.SocialAuthenticationId == id);
            return user;
        }

        public async Task<SocialAuthentication> getAuthUserById (int id) {
            var user = await _context.SocialAuthentication.FirstOrDefaultAsync (u => u.Id == id);
            return user;
        }
    }
}