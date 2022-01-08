using Microsoft.EntityFrameworkCore.Migrations;

namespace HoozOn.Migrations
{
    public partial class Initials1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobTag_TagMaster_TagMasterId",
                table: "JobTag");

            migrationBuilder.DropForeignKey(
                name: "FK_Tags_TagMaster_TagMasterId",
                table: "Tags");

            migrationBuilder.DropIndex(
                name: "IX_Tags_TagMasterId",
                table: "Tags");

            migrationBuilder.DropIndex(
                name: "IX_JobTag_TagMasterId",
                table: "JobTag");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Tags_TagMasterId",
                table: "Tags",
                column: "TagMasterId");

            migrationBuilder.CreateIndex(
                name: "IX_JobTag_TagMasterId",
                table: "JobTag",
                column: "TagMasterId");

            migrationBuilder.AddForeignKey(
                name: "FK_JobTag_TagMaster_TagMasterId",
                table: "JobTag",
                column: "TagMasterId",
                principalTable: "TagMaster",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tags_TagMaster_TagMasterId",
                table: "Tags",
                column: "TagMasterId",
                principalTable: "TagMaster",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
