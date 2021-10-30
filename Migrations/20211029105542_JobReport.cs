using Microsoft.EntityFrameworkCore.Migrations;

namespace HoozOn.Migrations
{
    public partial class JobReport : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TestJobs");

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
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reporting_SocialAuthentication_socialAuthenticationId",
                        column: x => x.socialAuthenticationId,
                        principalTable: "SocialAuthentication",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reporting_jobModelId",
                table: "Reporting",
                column: "jobModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Reporting_socialAuthenticationId",
                table: "Reporting",
                column: "socialAuthenticationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Reporting");

            migrationBuilder.CreateTable(
                name: "TestJobs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Latitude = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Longitude = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestJobs", x => x.Id);
                });
        }
    }
}
