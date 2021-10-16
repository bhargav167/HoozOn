using Microsoft.EntityFrameworkCore.Migrations;

namespace HoozOn.Migrations
{
    public partial class JobTags : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "dummy");

            migrationBuilder.DropColumn(
                name: "Tags",
                table: "Jobs");

            migrationBuilder.AlterColumn<string>(
                name: "Descriptions",
                table: "Jobs",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "jobTag",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TagName = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: false),
                    TagMasterId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_jobTag", x => x.Id);
                    table.ForeignKey(
                        name: "FK_jobTag_TagMaster_TagMasterId",
                        column: x => x.TagMasterId,
                        principalTable: "TagMaster",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_jobTag_SocialAuthentication_UserId",
                        column: x => x.UserId,
                        principalTable: "SocialAuthentication",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_jobTag_TagMasterId",
                table: "jobTag",
                column: "TagMasterId");

            migrationBuilder.CreateIndex(
                name: "IX_jobTag_UserId",
                table: "jobTag",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "jobTag");

            migrationBuilder.AlterColumn<string>(
                name: "Descriptions",
                table: "Jobs",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Tags",
                table: "Jobs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "dummy",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_dummy", x => x.Id);
                });
        }
    }
}
