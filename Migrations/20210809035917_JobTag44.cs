using Microsoft.EntityFrameworkCore.Migrations;

namespace HoozOn.Migrations
{
    public partial class JobTag44 : Migration
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
                newName: "JobTag");

            migrationBuilder.RenameIndex(
                name: "IX_jobTag_TagMasterId",
                table: "JobTag",
                newName: "IX_JobTag_TagMasterId");

            migrationBuilder.RenameIndex(
                name: "IX_jobTag_JobId",
                table: "JobTag",
                newName: "IX_JobTag_JobId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_JobTag",
                table: "JobTag",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_JobTag_Jobs_JobId",
                table: "JobTag",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JobTag_TagMaster_TagMasterId",
                table: "JobTag",
                column: "TagMasterId",
                principalTable: "TagMaster",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobTag_Jobs_JobId",
                table: "JobTag");

            migrationBuilder.DropForeignKey(
                name: "FK_JobTag_TagMaster_TagMasterId",
                table: "JobTag");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JobTag",
                table: "JobTag");

            migrationBuilder.RenameTable(
                name: "JobTag",
                newName: "jobTag");

            migrationBuilder.RenameIndex(
                name: "IX_JobTag_TagMasterId",
                table: "jobTag",
                newName: "IX_jobTag_TagMasterId");

            migrationBuilder.RenameIndex(
                name: "IX_JobTag_JobId",
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
