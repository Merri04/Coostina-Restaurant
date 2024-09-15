using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Injera.Migrations
{
    /// <inheritdoc />
    public partial class UpdateMenuItemsImageUrl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 31);

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 10,
                column: "ImageUrl",
                value: "/images/carbonara.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 11,
                column: "ImageUrl",
                value: "/images/lasagna.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 12,
                column: "ImageUrl",
                value: "/images/bolognese.jpeg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 13,
                column: "ImageUrl",
                value: "/images/risotto.webp");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 19,
                column: "ImageUrl",
                value: "/images/alfredo.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 20,
                column: "ImageUrl",
                value: "/images/Bruschetta.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 21,
                column: "ImageUrl",
                value: "/images/Tiramisu.webp");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 22,
                column: "ImageUrl",
                value: "/images/Gnocchi.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 23,
                column: "ImageUrl",
                value: "/images/Cappuccino.webp");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 24,
                column: "ImageUrl",
                value: "/images/Espresso.webp");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 25,
                column: "ImageUrl",
                value: "/images/redw.jpeg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 26,
                column: "ImageUrl",
                value: "/images/Lemonade.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 32,
                column: "ImageUrl",
                value: "/images/Mineral.png");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 33,
                column: "ImageUrl",
                value: "/images/Iced.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 34,
                column: "ImageUrl",
                value: "/images/Cocktail.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 35,
                column: "ImageUrl",
                value: "/images/beer.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 36,
                column: "ImageUrl",
                value: "/images/hotchaco.jpg");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 10,
                column: "ImageUrl",
                value: "/images/kitfo.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 11,
                column: "ImageUrl",
                value: "/images/kitfo.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 12,
                column: "ImageUrl",
                value: "/images/kitfo.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 13,
                column: "ImageUrl",
                value: "/images/kitfo.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 19,
                column: "ImageUrl",
                value: "/images/kitfo.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 20,
                column: "ImageUrl",
                value: "/images/kitfo.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 21,
                column: "ImageUrl",
                value: "/images/kitfo.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 22,
                column: "ImageUrl",
                value: "/images/kitfo.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 23,
                column: "ImageUrl",
                value: "/images/kitfo.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 24,
                column: "ImageUrl",
                value: "/images/kitfo.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 25,
                column: "ImageUrl",
                value: "/images/kitfo.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 26,
                column: "ImageUrl",
                value: "/images/kitfo.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 32,
                column: "ImageUrl",
                value: "/images/kitfo.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 33,
                column: "ImageUrl",
                value: "/images/kitfo.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 34,
                column: "ImageUrl",
                value: "/images/kitfo.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 35,
                column: "ImageUrl",
                value: "/images/kitfo.jpg");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 36,
                column: "ImageUrl",
                value: "/images/kitfo.jpg");

            migrationBuilder.InsertData(
                table: "MenuItems",
                columns: new[] { "Id", "CategoryId", "Description", "ImageUrl", "Name", "Price" },
                values: new object[,]
                {
                    { 14, 2, "Classic pizza with tomato, mozzarella, and basil.", "/images/kitfo.jpg", "Margherita Pizza", 120.00m },
                    { 15, 2, "Pasta with eggs, cheese, pancetta, and pepper.", "/images/kitfo.jpg", "Pasta Carbonara", 140.00m },
                    { 16, 2, "Baked layers of pasta with beef ragu and bechamel sauce.", "/images/kitfo.jpg", "Lasagna", 160.00m },
                    { 17, 2, "Spaghetti with slow-cooked meat sauce.", "/images/kitfo.jpg", "Spaghetti Bolognese", 130.00m },
                    { 18, 2, "Creamy rice dish with mushrooms and Parmesan.", "/images/kitfo.jpg", "Risotto", 150.00m },
                    { 27, 3, "Chilled sparkling water.", "/images/kitfo.jpg", "Mineral Water", 30.00m },
                    { 28, 3, "Italian coffee drink with steamed milk foam.", "/images/kitfo.jpg", "Cappuccino", 50.00m },
                    { 29, 3, "Rich and bold Italian coffee.", "/images/kitfo.jpg", "Espresso", 45.00m },
                    { 30, 3, "Full-bodied red wine.", "/images/kitfo.jpg", "Red Wine", 80.00m },
                    { 31, 3, "Freshly squeezed lemonade.", "/images/kitfo.jpg", "Lemonade", 40.00m }
                });
        }
    }
}
