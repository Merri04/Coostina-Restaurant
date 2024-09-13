using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Injera.Migrations
{
    /// <inheritdoc />
    public partial class AddMoreMenuItems1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 5,
                column: "ImageUrl",
                value: "/images/zilzil.webp");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 8,
                column: "ImageUrl",
                value: "/images/beyaynetu.jpeg");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 5,
                column: "ImageUrl",
                value: "/images/zilzil.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 8,
                column: "ImageUrl",
                value: "/images/beyaynetu.jpg");
        }
    }
}
