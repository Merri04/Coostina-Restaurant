using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Injera.Migrations
{
    /// <inheritdoc />
    public partial class AddBanansplitSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 4,
                column: "ImageUrl",
                value: "/images/kitfo.jpg");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 4,
                column: "ImageUrl",
                value: "/images/kibsi.jpg");
        }
    }
}
