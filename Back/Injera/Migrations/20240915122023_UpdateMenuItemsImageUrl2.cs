using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Injera.Migrations
{
    /// <inheritdoc />
    public partial class UpdateMenuItemsImageUrl2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 33);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 34);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 35);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 36);

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 19,
                columns: new[] { "CategoryId", "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { 3, "Rich and bold Italian coffee.", "/images/Espresso.webp", "Espresso", 45.00m });

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 20,
                columns: new[] { "CategoryId", "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { 3, "Full-bodied red wine.", "/images/redw.jpeg", "Red Wine", 80.00m });

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 21,
                columns: new[] { "CategoryId", "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { 3, "Freshly squeezed lemonade.", "/images/Lemonade.jpg", "Lemonade", 40.00m });

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 22,
                columns: new[] { "CategoryId", "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { 3, "Chilled sparkling water.", "/images/Mineral.png", "Mineral Water", 30.00m });

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 23,
                columns: new[] { "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { "Chilled iced tea with lemon.", "/images/Iced.jpg", "Iced Tea", 35.00m });

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 24,
                columns: new[] { "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { "Fruity alcoholic beverage.", "/images/Cocktail.jpg", "Cocktail", 95.00m });

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 25,
                columns: new[] { "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { "Refreshing cold beer.", "/images/beer.jpg", "Beer", 50.00m });

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 26,
                columns: new[] { "Description", "ImageUrl", "Name" },
                values: new object[] { "Warm and comforting chocolate drink.", "/images/hotchaco.jpg", "Hot Chocolate" });

            migrationBuilder.InsertData(
                table: "MenuItems",
                columns: new[] { "Id", "CategoryId", "Description", "ImageUrl", "Name", "Price" },
                values: new object[,]
                {
                    { 14, 2, "Pasta tossed with butter, Parmesan, and cream.", "/images/alfredo.jpg", "Fettuccine Alfredo", 145.00m },
                    { 15, 2, "Grilled bread topped with tomatoes, basil, and olive oil.", "/images/Bruschetta.jpg", "Bruschetta", 90.00m },
                    { 16, 2, "Traditional Italian coffee-flavored dessert.", "/images/Tiramisu.webp", "Tiramisu", 80.00m },
                    { 17, 2, "Soft dough dumplings served with a tomato sauce.", "/images/Gnocchi.jpg", "Gnocchi", 135.00m },
                    { 18, 3, "Italian coffee drink with steamed milk foam.", "/images/Cappuccino.webp", "Cappuccino", 50.00m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 19,
                columns: new[] { "CategoryId", "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { 2, "Pasta tossed with butter, Parmesan, and cream.", "/images/alfredo.jpg", "Fettuccine Alfredo", 145.00m });

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 20,
                columns: new[] { "CategoryId", "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { 2, "Grilled bread topped with tomatoes, basil, and olive oil.", "/images/Bruschetta.jpg", "Bruschetta", 90.00m });

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 21,
                columns: new[] { "CategoryId", "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { 2, "Traditional Italian coffee-flavored dessert.", "/images/Tiramisu.webp", "Tiramisu", 80.00m });

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 22,
                columns: new[] { "CategoryId", "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { 2, "Soft dough dumplings served with a tomato sauce.", "/images/Gnocchi.jpg", "Gnocchi", 135.00m });

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 23,
                columns: new[] { "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { "Italian coffee drink with steamed milk foam.", "/images/Cappuccino.webp", "Cappuccino", 50.00m });

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 24,
                columns: new[] { "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { "Rich and bold Italian coffee.", "/images/Espresso.webp", "Espresso", 45.00m });

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 25,
                columns: new[] { "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { "Full-bodied red wine.", "/images/redw.jpeg", "Red Wine", 80.00m });

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 26,
                columns: new[] { "Description", "ImageUrl", "Name" },
                values: new object[] { "Freshly squeezed lemonade.", "/images/Lemonade.jpg", "Lemonade" });

            migrationBuilder.InsertData(
                table: "MenuItems",
                columns: new[] { "Id", "CategoryId", "Description", "ImageUrl", "Name", "Price" },
                values: new object[,]
                {
                    { 32, 3, "Chilled sparkling water.", "/images/Mineral.png", "Mineral Water", 30.00m },
                    { 33, 3, "Chilled iced tea with lemon.", "/images/Iced.jpg", "Iced Tea", 35.00m },
                    { 34, 3, "Fruity alcoholic beverage.", "/images/Cocktail.jpg", "Cocktail", 95.00m },
                    { 35, 3, "Refreshing cold beer.", "/images/beer.jpg", "Beer", 50.00m },
                    { 36, 3, "Warm and comforting chocolate drink.", "/images/hotchaco.jpg", "Hot Chocolate", 40.00m }
                });
        }
    }
}
