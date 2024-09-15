using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Injera.Migrations
{
    /// <inheritdoc />
    public partial class SeedAdditionalMenuItems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 9,
                column: "ImageUrl",
                value: "/images/margarita.jpg");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 9,
                column: "ImageUrl",
                value: "/images/kitfo.jpg");
        }
    }
}
