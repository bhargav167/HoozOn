using System;
using System.Threading.Tasks;
using AutoMapper;
using HoozOn.Data.PhaseRepo1;
using HoozOn.Data.TaggingRepo;
using HoozOn.Entities.Responces;
using HoozOn.Entities.Tag;
using Microsoft.AspNetCore.Mvc;

namespace hoozonlinedatabase.Controllers.Tag {
    [ApiController]
    [Route ("api/[controller]")]
    public class TagController : ControllerBase {
        private readonly ICrudRepo _crudrepo;
        private readonly ITaggingRepo _itaggingrepo;
        private readonly IMapper _mapper;

        public TagController (ICrudRepo crudrepo, ITaggingRepo itaggingrepo, IMapper mapper) {
            _crudrepo = crudrepo;
            _mapper = mapper;
            _itaggingrepo = itaggingrepo;
        }

        //Tags With AuthID
        [HttpGet ("UserTags/{userId}")]
        public async Task<IActionResult> UserTags (int userId) {
            var tags = await _itaggingrepo.getTagsByAuthId (userId);
            return Ok (tags);
        }

        //Add Tagging
        [HttpPost ("AddTagging/{userId}")]
        public async Task<IActionResult> AddTagging (int userId, [FromBody] Tags[] tags) {
            try {
                var user = await _crudrepo.getUserByAuthId (userId);
                if (user == null)
                    return NoContent ();

                //Initilise UserId in tags body
                foreach (var item in tags) {
                    item.UserId = userId;

                    if (item.TagMasterId == 0)
                        item.TagMasterId = 5;

                    if (!await _itaggingrepo.IsTagExist (userId, item.TagName)) {
                        //Add Tagging To User
                        await _itaggingrepo.AddTag (item);
                        await _itaggingrepo.SaveAll ();
                    }
                }
            } catch (Exception ex) {
                throw new Exception ($"Encouter error during saving tags {ex}");
            }
            ResponceData responceData = new ResponceData ();
            responceData.Status = 200;
            responceData.Success = true;
            responceData.Status_Message = $"Tag Added to user with id :{userId} successfully";
            return Ok (responceData);
        }

        [HttpGet ("TagSuggestion/{searchTerm}")]
        public async Task<IActionResult> TagSuggetion (string searchTerm) {
            var serchItemShowing = await _itaggingrepo.SuggestTag (searchTerm);
            TagMasterResponces tmr = new TagMasterResponces ();
            if (serchItemShowing != null) { 
                tmr.data = serchItemShowing;
                tmr.Success = true;
                tmr.Status = 200;
                tmr.status_message = "Fetch All value";
                return Ok (tmr);
            }else{
                tmr.data = null;
                tmr.Success = true;
                tmr.Status = 200;
                tmr.status_message = "No data avalable.";
                return Ok (tmr);
            }

        }

        [HttpGet ("UserWithTags/{userId}")]
        public async Task<IActionResult> UserWithTags (int userId) {
            var serchItemShowing = await _itaggingrepo.getUserWithTagById (userId);
            return Ok (serchItemShowing);
        }

        //Delete Tagging By AuthId 
        [HttpPost ("Delete/{userId}/{tagMasterId}")]
        public async Task<IActionResult> Delete (int userId, int tagMasterId) {
            try {
                // Create Instances Of Responces
                ResponceData responceData = new ResponceData ();
                var tags = await _itaggingrepo.getTagsByAuthIdAndTagId (userId, tagMasterId);
                if (tags == null) {
                    responceData.Status = 204;
                    responceData.Success = true;
                    responceData.Status_Message = $"There is no tagging avalable for user with id {userId}";
                    return Ok (responceData);
                }

                //Delete Query
                _itaggingrepo.Delete (tags);
                await _itaggingrepo.SaveAll ();

                // Initilized Responces With Status 
                responceData.Status = 200;
                responceData.Success = true;
                responceData.Status_Message = $"Tag Deleted for user with id :{userId} successfully";
                return Ok (responceData);

            } catch (Exception ex) {
                throw new Exception ($"Encouter error during saving tags {ex}");
            }
        }


// Add Tag To Master
        [HttpPost ("AddTagMaster")]
        public async Task<IActionResult> AddTagMaster ([FromBody] TagMaster tag) {
            try { 
                await _itaggingrepo.AddTagMaster(tag);
                await _itaggingrepo.SaveAll();
                return Ok(200);
            } catch (Exception ex) {
                throw new Exception ($"Encouter error during saving tags {ex}");
            } 
        }

    }
}