using Microsoft.EntityFrameworkCore.Migrations;

namespace HoozOn.Migrations
{
    public partial class JobTags5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_jobTag_Jobs_JobModelId",
                table: "jobTag");

            migrationBuilder.DropForeignKey(
                name: "FK_jobTag_SocialAuthentication_UserId",
                table: "jobTag");

            migrationBuilder.DropIndex(
                name: "IX_jobTag_JobModelId",
                table: "jobTag");

            migrationBuilder.DropIndex(
                name: "IX_jobTag_UserId",
                table: "jobTag");

            migrationBuilder.DropColumn(
                name: "JobModelId",
                table: "jobTag");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "jobTag");

            migrationBuilder.AddColumn<int>(
                name: "JobId",
                table: "jobTag",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_jobTag_JobId",
                table: "jobTag",
                column: "JobId");

            migrationBuilder.AddForeignKey(
                name: "FK_jobTag_Jobs_JobId",
                table: "jobTag",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_jobTag_Jobs_JobId",
                table: "jobTag");

            migrationBuilder.DropIndex(
                name: "IX_jobTag_JobId",
                table: "jobTag");

            migrationBuilder.DropColumn(
                name: "JobId",
                table: "jobTag");

            migrationBuilder.AddColumn<int>(
                name: "JobModelId",
                table: "jobTag",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "jobTag",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_jobTag_JobModelId",
                table: "jobTag",
                column: "JobModelId");

            migrationBuilder.CreateIndex(
                name: "IX_jobTag_UserId",
                table: "jobTag",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_jobTag_Jobs_JobModelId",
                table: "jobTag",
                column: "JobModelId",
                principalTable: "Jobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_jobTag_SocialAuthentication_UserId",
                table: "jobTag",
                column: "UserId",
                principalTable: "SocialAuthentication",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
