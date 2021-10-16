using Microsoft.EntityFrameworkCore.Migrations;

namespace HoozOn.Migrations
{
    public partial class MessageAGAINTjOBS1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "JobMessages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    JobId = table.Column<int>(nullable: false),
                    SenderId = table.Column<int>(nullable: false),
                    RecipientId = table.Column<int>(nullable: false),
                    Content = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobMessages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobMessages_Jobs_JobId",
                        column: x => x.JobId,
                        principalTable: "Jobs",
                        principalColumn: "Id");
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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JobMessages");
        }
    }
}
