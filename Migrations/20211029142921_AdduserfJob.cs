using Microsoft.EntityFrameworkCore.Migrations;

namespace HoozOn.Migrations
{
    public partial class AdduserfJob : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserJobs_jobModelId",
                table: "UserJobs",
                column: "jobModelId");

            migrationBuilder.CreateIndex(
                name: "IX_UserJobs_socialAuthenticationId",
                table: "UserJobs",
                column: "socialAuthenticationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserJobs");
        }
    }
}
