using Microsoft.EntityFrameworkCore.Migrations;

namespace HoozOn.Migrations
{
    public partial class JobTags1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "JobModelId",
                table: "jobTag",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_jobTag_JobModelId",
                table: "jobTag",
                column: "JobModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_jobTag_Jobs_JobModelId",
                table: "jobTag",
                column: "JobModelId",
                principalTable: "Jobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_jobTag_Jobs_JobModelId",
                table: "jobTag");

            migrationBuilder.DropIndex(
                name: "IX_jobTag_JobModelId",
                table: "jobTag");

            migrationBuilder.DropColumn(
                name: "JobModelId",
                table: "jobTag");
        }
    }
}
