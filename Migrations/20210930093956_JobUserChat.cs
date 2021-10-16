using Microsoft.EntityFrameworkCore.Migrations;

namespace HoozOn.Migrations
{
    public partial class JobUserChat : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "JobUserChat",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    JobId = table.Column<int>(nullable: false),
                    SenderId = table.Column<int>(nullable: false),
                    RecipientId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobUserChat", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobUserChat_Jobs_JobId",
                        column: x => x.JobId,
                        principalTable: "Jobs",
                        principalColumn: "Id");
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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JobUserChat");
        }
    }
}
