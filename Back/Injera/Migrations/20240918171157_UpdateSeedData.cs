using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Injera.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "ImageUrl", "Name" },
                values: new object[] { "Lean & tender cubes of beef spiced with butter 'Mitmita Spice' served with injera.", "/images/gored.jpg", "Gored Gored" });

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "ImageUrl", "Name" },
                values: new object[] { "Beef with black cardamom & spiced butter Mitmita served with injera.", "/images/kitfo.jpg", "Kitfo" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "ImageUrl", "Name" },
                values: new object[] { "Beef with black cardamom & spiced butter Mitmita served with injera.", "/images/kitfo.jpg", "Kitfo" });

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "ImageUrl", "Name" },
                values: new object[] { "Lean & tender cubes of beef spiced with butter 'Mitmita Spice' served with injera.", "/images/gored.jpg", "Gored Gored" });
        }
    }
}
