using API.Entities.Control;
using HoozOn.Entities.Authentication;
using HoozOn.Entities.Job;
using HoozOn.Entities.Message;
using HoozOn.Entities.Message.JobMessage;
using HoozOn.Entities.Report;
using HoozOn.Entities.Roles;
using HoozOn.Entities.Tag;
using HoozOn.Entities.UserReview;
using HoozOn.Entities.Users;
using Microsoft.EntityFrameworkCore;

namespace HoozOn.Data {
    public class DataContext : DbContext {
        public DataContext (DbContextOptions<DataContext> options) : base (options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<UserJobs> UserJobs { get; set; }
        public DbSet<Tags> Tags { get; set; }
        public DbSet<JobModel> Jobs { get; set; } 
        public DbSet<UserJobListModel> UserJobListModels { get; set; }
        //Authentication
        public DbSet<Role> RolesIdentity { get; set; }
        public DbSet<SocialAuthentication> SocialAuthentication { get; set; }

        //Tagging
        public DbSet<TagMaster> TagMaster { get; set; }
        public DbSet<JobTags> JobTag { get; set; } 

        //MESSAGE-----------------------------------------------------
        public DbSet<MessageModal> Message { get; set; }
        public DbSet<MessagedUsers> MessagedUser { get; set; }
        public DbSet<JobMessages> JobMessages{get; set;}
        public DbSet<JobUserChat> JobUserChat{get; set;}

        //Review------------------------------------------------------
        public DbSet<Review> UserReview{get;set;}

        //Reporting---------------------------------------------------
        public DbSet<Reporting> Reporting{get; set;}
        public DbSet<ContactUs> ContactUs{get; set;} 
        public DbSet<UserReport> UserReport{get; set;} 

        //Admin---------------------------------------------------
        public DbSet<SetJob> setJob{get; set;}
        public DbSet<Sets> sets{get; set;} 
        protected override void OnModelCreating (ModelBuilder builder) {
            base.OnModelCreating (builder);
        }
    }
}