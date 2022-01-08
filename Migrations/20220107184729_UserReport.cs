using Microsoft.EntityFrameworkCore.Migrations;

namespace HoozOn.Migrations
{
    public partial class UserReport : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserReport",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    repoterID = table.Column<int>(nullable: false),
                    repotedID = table.Column<int>(nullable: false),
                    Issues = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserReport", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserReport_SocialAuthentication_repotedID",
                        column: x => x.repotedID,
                        principalTable: "SocialAuthentication",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserReport_SocialAuthentication_repoterID",
                        column: x => x.repoterID,
                        principalTable: "SocialAuthentication",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserReport_repotedID",
                table: "UserReport",
                column: "repotedID");

            migrationBuilder.CreateIndex(
                name: "IX_UserReport_repoterID",
                table: "UserReport",
                column: "repoterID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserReport");
        }
    }
}
