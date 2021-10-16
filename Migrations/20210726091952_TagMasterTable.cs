using Microsoft.EntityFrameworkCore.Migrations;

namespace HoozOn.Migrations
{
    public partial class TagMasterTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ParentId",
                table: "Tags");

            migrationBuilder.AddColumn<int>(
                name: "TagMasterId",
                table: "Tags",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "TagMaster",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TagName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TagMaster", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tags_TagMasterId",
                table: "Tags",
                column: "TagMasterId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tags_TagMaster_TagMasterId",
                table: "Tags",
                column: "TagMasterId",
                principalTable: "TagMaster",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tags_TagMaster_TagMasterId",
                table: "Tags");

            migrationBuilder.DropTable(
                name: "TagMaster");

            migrationBuilder.DropIndex(
                name: "IX_Tags_TagMasterId",
                table: "Tags");

            migrationBuilder.DropColumn(
                name: "TagMasterId",
                table: "Tags");

            migrationBuilder.AddColumn<int>(
                name: "ParentId",
                table: "Tags",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
