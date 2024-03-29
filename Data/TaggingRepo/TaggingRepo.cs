using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet;
using HoozOn.Data;
using HoozOn.Entities.Authentication;
using HoozOn.Entities.Tag;
using HoozOn.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace HoozOn.Data.TaggingRepo {
    public class TaggingRepo : ITaggingRepo {
        private readonly DataContext _context;
          private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        public TaggingRepo (DataContext context,IOptions<CloudinarySettings> cloudinarysetting) {
            _context = context;
              _cloudinaryConfig = cloudinarysetting;
            Account acc = new Account (
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );
            _cloudinary = new Cloudinary (acc);
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

        public async Task<Tags> AddTag (Tags tag) {
            await _context.Tags.AddAsync (tag);
            await _context.SaveChangesAsync ();

            return tag;
        }

        public async Task<bool> IsTagExist (int userId, string tagName) {
            if (await _context.Tags.AnyAsync (e => e.UserId == userId && e.TagName.ToLower() == tagName.ToLower()))
                return true;

            return false;
        }
        public async Task<List<TagMaster>> SuggestTag (string searchTerm) {
            var suggestionTerm = await _context.TagMaster.Where (c => c.TagName.ToLower ()
                    .Contains (searchTerm.ToLower ()))
                .ToListAsync ();

            return suggestionTerm;
        }

        public async Task<SocialAuthentication> getUserWithTagById (int id) {
            var user = await _context.SocialAuthentication.Include (c => c.tags).FirstOrDefaultAsync (c => c.Id == id);
              user.UserImage = _cloudinary.Api.UrlImgUp.Transform (new Transformation ()
                                .Quality ("auto").FetchFormat ("auto").Width (128).Height (128).Gravity ("faces").Crop ("fill"))
                            .BuildUrl (user.ProfileImageName).Replace("http","https");
            return user;
        }

        public async Task<List<Tags>> getTagsByAuthId (int authId) {
            var tags = await _context.Tags.Where (c => c.UserId == authId).ToListAsync ();
            return tags;
        }

        public async Task<Tags> getTagsByAuthIdAndTagId (int authId, int tagMasterId) {
            var tags = await _context.Tags.FirstOrDefaultAsync (c => c.UserId == authId && c.TagMasterId == tagMasterId);
            return tags;
        }

        public async Task<TagMaster> AddTagMaster (TagMaster tag) {
            await _context.TagMaster.AddAsync (tag);
            await _context.SaveChangesAsync ();

            return tag;
        }

        public async Task<bool> IsTagMasterExist (string tagName) {
            if (await _context.TagMaster.AnyAsync (e => e.TagName.ToLower () == tagName.ToLower ()))
                return true;

            return false;
        }
    }
}