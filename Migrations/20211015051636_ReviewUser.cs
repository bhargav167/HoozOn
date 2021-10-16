using Microsoft.EntityFrameworkCore.Migrations;

namespace HoozOn.Migrations
{
    public partial class ReviewUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserReview_SocialAuthentication_SenderId",
                        column: x => x.SenderId,
                        principalTable: "SocialAuthentication",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserReview_RecipientId",
                table: "UserReview",
                column: "RecipientId");

            migrationBuilder.CreateIndex(
                name: "IX_UserReview_SenderId",
                table: "UserReview",
                column: "SenderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserReview");
        }
    }
}
