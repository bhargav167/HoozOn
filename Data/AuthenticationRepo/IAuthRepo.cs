using System.Threading.Tasks;
using HoozOn.Entities.Authentication;
using HoozOn.Helpers;
namespace HoozOn.Data.AuthenticationRepo
{
    public interface IAuthRepo
    {
        Task<bool> IsAuthExist (string email);
        Task<SocialAuthentication> AddAuth (SocialAuthentication socialAuthentication);
        Task<SocialAuthentication> getAuthById (int id);
        Task<SocialAuthentication> getAuthByEmail (string email);
        Task<bool> IsUserNameExist (string UserName);

        // Login
        Task<SocialAuthentication> Login (string email,string password);
    }
}