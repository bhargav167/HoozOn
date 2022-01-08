using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HoozOn.Migrations
{
    public partial class Initials : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ContactUs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    userId = table.Column<int>(nullable: false),
                    ContactMessage = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactUs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RolesIdentity",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RolesIdentity", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SocialAuthentication",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: true),
                    ImageUrl = table.Column<string>(nullable: true),
                    CoverImageUrl = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    MobileNumber = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    WebSiteUrl = table.Column<string>(nullable: true),
                    Latitude = table.Column<string>(nullable: true),
                    Longitude = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    UserAddress = table.Column<string>(nullable: true),
                    AboutUs = table.Column<string>(nullable: true),
                    Status = table.Column<int>(nullable: false),
                    Success = table.Column<bool>(nullable: false),
                    Status_Message = table.Column<string>(nullable: true),
                    LoginTime = table.Column<DateTime>(nullable: false),
                    IsProfileCreated = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SocialAuthentication", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TagMaster",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TagName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TagMaster", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Jobs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(nullable: false),
                    Descriptions = table.Column<string>(maxLength: 360, nullable: true),
                    ImagesUrl = table.Column<string>(nullable: true),
                    ImageName = table.Column<string>(nullable: true),
                    Latitude = table.Column<string>(nullable: true),
                    Longitude = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    Status = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    AnonmousUserPic = table.Column<string>(nullable: true),
                    ColorCode = table.Column<string>(nullable: true),
                    IsAnonymous = table.Column<bool>(nullable: false),
                    IsPublic = table.Column<bool>(nullable: false),
                    IsLocal = table.Column<bool>(nullable: false),
                    IsGlobal = table.Column<bool>(nullable: false),
                    CreatedBy = table.Column<DateTime>(nullable: false),
                    JobStatus = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Jobs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Jobs_SocialAuthentication_UserId",
                        column: x => x.UserId,
                        principalTable: "SocialAuthentication",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Message",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SenderId = table.Column<int>(nullable: false),
                    SenderUsername = table.Column<string>(nullable: true),
                    RecipientId = table.Column<int>(nullable: false),
                    RecipientUsername = table.Column<string>(nullable: true),
                    Content = table.Column<string>(nullable: true),
                    IsRead = table.Column<bool>(nullable: false),
                    DateRead = table.Column<DateTime>(nullable: true),
                    MessageSent = table.Column<DateTime>(nullable: false),
                    SenderDeleted = table.Column<bool>(nullable: false),
                    RecipientDeleted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Message", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Message_SocialAuthentication_RecipientId",
                        column: x => x.RecipientId,
                        principalTable: "SocialAuthentication",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Message_SocialAuthentication_SenderId",
                        column: x => x.SenderId,
                        principalTable: "SocialAuthentication",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "MessagedUser",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SenderId = table.Column<int>(nullable: false),
                    RecipientId = table.Column<int>(nullable: false),
                    MessageSent = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MessagedUser", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MessagedUser_SocialAuthentication_RecipientId",
                        column: x => x.RecipientId,
                        principalTable: "SocialAuthentication",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MessagedUser_SocialAuthentication_SenderId",
                        column: x => x.SenderId,
                        principalTable: "SocialAuthentication",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserReview",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SenderId = table.Column<int>(nullable: false),
                    RecipientId = table.Column<int>(nullable: false),
                    ReviewValue = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserReview", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserReview_SocialAuthentication_RecipientId",
                        column: x => x.RecipientId,
                        principalTable: "SocialAuthentication",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserReview_SocialAuthentication_SenderId",
                        column: x => x.SenderId,
                        principalTable: "SocialAuthentication",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(maxLength: 30, nullable: false),
                    Name = table.Column<string>(nullable: true),
                    MobileNumber = table.Column<string>(nullable: true),
                    WebSiteUrl = table.Column<string>(nullable: true),
                    Latitude = table.Column<string>(nullable: true),
                    Longitude = table.Column<string>(nullable: true),
                    UserAddress = table.Column<string>(nullable: true),
                    AboutUs = table.Column<string>(nullable: true),
                    ImageUrl = table.Column<string>(nullable: true),
                    CoverImageUrl = table.Column<string>(nullable: true),
                    IsUserOnline = table.Column<bool>(nullable: false),
                    IsActive = table.Column<bool>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    SocialAuthenticationId = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: true),
                    Success = table.Column<bool>(nullable: false),
                    Status_Message = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_SocialAuthentication_SocialAuthenticationId",
                        column: x => x.SocialAuthenticationId,
                        principalTable: "SocialAuthentication",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TagName = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: false),
                    TagMasterId = table.Column<int>(nullable: false),
                    IsApproved = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tags_TagMaster_TagMasterId",
                        column: x => x.TagMasterId,
                        principalTable: "TagMaster",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tags_SocialAuthentication_UserId",
                        column: x => x.UserId,
                        principalTable: "SocialAuthentication",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JobMessages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    JobId = table.Column<int>(nullable: false),
                    SenderId = table.Column<int>(nullable: false),
                    RecipientId = table.Column<int>(nullable: false),
                    Content = table.Column<string>(nullable: true),
                    MessageSent = table.Column<DateTime>(nullable: false),
                    IsRead = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobMessages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobMessages_Jobs_JobId",
                        column: x => x.JobId,
                        principalTable: "Jobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JobMessages_SocialAuthentication_RecipientId",
                        column: x => x.RecipientId,
                        principalTable: "SocialAuthentication",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_JobMessages_SocialAuthentication_SenderId",
                        column: x => x.SenderId,
                        principalTable: "SocialAuthentication",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "JobTag",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TagName = table.Column<string>(nullable: true),
                    JobId = table.Column<int>(nullable: false),
                    TagMasterId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobTag", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobTag_Jobs_JobId",
                        column: x => x.JobId,
                        principalTable: "Jobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JobTag_TagMaster_TagMasterId",
                        column: x => x.TagMasterId,
                        principalTable: "TagMaster",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "JobUserChat",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    JobId = table.Column<int>(nullable: false),
                    SenderId = table.Column<int>(nullable: false),
                    RecipientId = table.Column<int>(nullable: false),
                    IsRead = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobUserChat", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobUserChat_Jobs_JobId",
                        column: x => x.JobId,
                        principalTable: "Jobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JobUserChat_SocialAuthentication_RecipientId",
                        column: x => x.RecipientId,
                        principalTable: "SocialAuthentication",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_JobUserChat_SocialAuthentication_SenderId",
                        column: x => x.SenderId,
                        principalTable: "SocialAuthentication",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Reporting",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    socialAuthenticationId = table.Column<int>(nullable: false),
                    jobModelId = table.Column<int>(nullable: false),
                    Isusue = table.Column<string>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reporting", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reporting_Jobs_jobModelId",
                        column: x => x.jobModelId,
                        principalTable: "Jobs",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Reporting_SocialAuthentication_socialAuthenticationId",
                        column: x => x.socialAuthenticationId,
                        principalTable: "SocialAuthentication",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserJobs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    socialAuthenticationId = table.Column<int>(nullable: false),
                    jobModelId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserJobs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserJobs_Jobs_jobModelId",
                        column: x => x.jobModelId,
                        principalTable: "Jobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserJobs_SocialAuthentication_socialAuthenticationId",
                        column: x => x.socialAuthenticationId,
                        principalTable: "SocialAuthentication",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_JobMessages_JobId",
                table: "JobMessages",
                column: "JobId");

            migrationBuilder.CreateIndex(
                name: "IX_JobMessages_RecipientId",
                table: "JobMessages",
                column: "RecipientId");

            migrationBuilder.CreateIndex(
                name: "IX_JobMessages_SenderId",
                table: "JobMessages",
                column: "SenderId");

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_UserId",
                table: "Jobs",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_JobTag_JobId",
                table: "JobTag",
                column: "JobId");

            migrationBuilder.CreateIndex(
                name: "IX_JobTag_TagMasterId",
                table: "JobTag",
                column: "TagMasterId");

            migrationBuilder.CreateIndex(
                name: "IX_JobUserChat_JobId",
                table: "JobUserChat",
                column: "JobId");

            migrationBuilder.CreateIndex(
                name: "IX_JobUserChat_RecipientId",
                table: "JobUserChat",
                column: "RecipientId");

            migrationBuilder.CreateIndex(
                name: "IX_JobUserChat_SenderId",
                table: "JobUserChat",
                column: "SenderId");

            migrationBuilder.CreateIndex(
                name: "IX_Message_RecipientId",
                table: "Message",
                column: "RecipientId");

            migrationBuilder.CreateIndex(
                name: "IX_Message_SenderId",
                table: "Message",
                column: "SenderId");

            migrationBuilder.CreateIndex(
                name: "IX_MessagedUser_RecipientId",
                table: "MessagedUser",
                column: "RecipientId");

            migrationBuilder.CreateIndex(
                name: "IX_MessagedUser_SenderId",
                table: "MessagedUser",
                column: "SenderId");

            migrationBuilder.CreateIndex(
                name: "IX_Reporting_jobModelId",
                table: "Reporting",
                column: "jobModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Reporting_socialAuthenticationId",
                table: "Reporting",
                column: "socialAuthenticationId");

            migrationBuilder.CreateIndex(
                name: "IX_Tags_TagMasterId",
                table: "Tags",
                column: "TagMasterId");

            migrationBuilder.CreateIndex(
                name: "IX_Tags_UserId",
                table: "Tags",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserJobs_jobModelId",
                table: "UserJobs",
                column: "jobModelId");

            migrationBuilder.CreateIndex(
                name: "IX_UserJobs_socialAuthenticationId",
                table: "UserJobs",
                column: "socialAuthenticationId");

            migrationBuilder.CreateIndex(
                name: "IX_UserReview_RecipientId",
                table: "UserReview",
                column: "RecipientId");

            migrationBuilder.CreateIndex(
                name: "IX_UserReview_SenderId",
                table: "UserReview",
                column: "SenderId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_SocialAuthenticationId",
                table: "Users",
                column: "SocialAuthenticationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContactUs");

            migrationBuilder.DropTable(
                name: "JobMessages");

            migrationBuilder.DropTable(
                name: "JobTag");

            migrationBuilder.DropTable(
                name: "JobUserChat");

            migrationBuilder.DropTable(
                name: "Message");

            migrationBuilder.DropTable(
                name: "MessagedUser");

            migrationBuilder.DropTable(
                name: "Reporting");

            migrationBuilder.DropTable(
                name: "RolesIdentity");

            migrationBuilder.DropTable(
                name: "Tags");

            migrationBuilder.DropTable(
                name: "UserJobs");

            migrationBuilder.DropTable(
                name: "UserReview");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "TagMaster");

            migrationBuilder.DropTable(
                name: "Jobs");

            migrationBuilder.DropTable(
                name: "SocialAuthentication");
        }
    }
}
