using System.Collections.Generic;
using System.Threading.Tasks;
using HoozOn.Entities.Authentication;
using HoozOn.Entities.Tag; 

namespace HoozOn.Data.TaggingRepo
{
    public interface ITaggingRepo
    {
        void Add<T> (T entity) where T : class;
        void Delete<T> (T entity) where T : class;
        Task<bool> SaveAll ();

        //Tag Repo 
        Task<Tags> AddTag (Tags tag); 
         Task<List<TagMaster>> SuggestTag (string searchTerm); 
        Task<bool> IsTagExist (int userId,string tagName);
        Task<SocialAuthentication> getUserWithTagById (int id);
        Task<List<Tags>> getTagsByAuthId (int authId);
         Task<Tags> getTagsByAuthIdAndTagId (int authId,int tagMasterId);
    }
}