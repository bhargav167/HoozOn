using Microsoft.EntityFrameworkCore.Migrations;

namespace HoozOn.Migrations
{
    public partial class JobTags12 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_jobTag_Jobs_JobId",
                table: "jobTag");

            migrationBuilder.DropForeignKey(
                name: "FK_jobTag_TagMaster_TagMasterId",
                table: "jobTag");

            migrationBuilder.DropPrimaryKey(
                name: "PK_jobTag",
                table: "jobTag");

            migrationBuilder.RenameTable(
                name: "jobTag",
                newName: "JobTags");

            migrationBuilder.RenameIndex(
                name: "IX_jobTag_TagMasterId",
                table: "JobTags",
                newName: "IX_JobTags_TagMasterId");

            migrationBuilder.RenameIndex(
                name: "IX_jobTag_JobId",
                table: "JobTags",
                newName: "IX_JobTags_JobId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_JobTags",
                table: "JobTags",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_JobTags_Jobs_JobId",
                table: "JobTags",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JobTags_TagMaster_TagMasterId",
                table: "JobTags",
                column: "TagMasterId",
                principalTable: "TagMaster",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobTags_Jobs_JobId",
                table: "JobTags");

            migrationBuilder.DropForeignKey(
                name: "FK_JobTags_TagMaster_TagMasterId",
                table: "JobTags");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JobTags",
                table: "JobTags");

            migrationBuilder.RenameTable(
                name: "JobTags",
                newName: "jobTag");

            migrationBuilder.RenameIndex(
                name: "IX_JobTags_TagMasterId",
                table: "jobTag",
                newName: "IX_jobTag_TagMasterId");

            migrationBuilder.RenameIndex(
                name: "IX_JobTags_JobId",
                table: "jobTag",
                newName: "IX_jobTag_JobId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_jobTag",
                table: "jobTag",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_jobTag_Jobs_JobId",
                table: "jobTag",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_jobTag_TagMaster_TagMasterId",
                table: "jobTag",
                column: "TagMasterId",
                principalTable: "TagMaster",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
