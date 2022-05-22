using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using HoozOn.Data;
using HoozOn.Data.JobRepo;
using HoozOn.Helpers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace HoozOn.Controllers.Web.Post {
    [ApiController]
    [Route ("api/[controller]")]
    public class WebPostController : ControllerBase {
        private readonly IJobRepo _jobrepo;
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        private readonly IWebHostEnvironment _environment;
        public WebPostController (IJobRepo jobrepo, IMapper mapper,
            IWebHostEnvironment environment,
            DataContext context,
            IOptions<CloudinarySettings> cloudinarysetting) {
            _jobrepo = jobrepo;
            _mapper = mapper;
            _context = context;
            this._environment = environment;
            _cloudinaryConfig = cloudinarysetting;
            Account acc = new Account (
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );
            _cloudinary = new Cloudinary (acc);
        }
          [HttpGet ("ResponceCount/{JobId}/{senderId}")]
        public async Task<IActionResult> JobById (int JobId,int senderId) {
            var job = await _jobrepo.GetResponcesCount (JobId,senderId);
            return Ok (job);
        }

    }
}