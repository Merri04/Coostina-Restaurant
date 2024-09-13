using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Injera.Migrations
{
    /// <inheritdoc />
    public partial class AddMoreMenuItems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: 1,
                column: "Name",
                value: "Habesha Dishes");

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: 2,
                column: "Name",
                value: "Italian");

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "CategoryId", "Name" },
                values: new object[] { 3, "Drikke" });

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 1,
                column: "Price",
                value: 325.00m);

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 2,
                column: "Price",
                value: 325.00m);

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CategoryId", "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { 1, "Grilled biff prepared with onion, garlic, oil and green papper served with injera.", "/images/firfir.webp", "Tibsi Firfir", 349.00m });

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { "Lean & tender cubes of beef spiced with butter 'Mitmita Spice' served with injera.", "/images/xaida.jpg", "White Tibsi", 249.00m });

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "CategoryId", "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { 1, "Strips of beef steked with butter, traditional herbs, spices ans served with injera.", "/images/zilzil.jpg", "Zilzil Tibsi", 349.00m });

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "CategoryId", "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { 1, "Beef meat prepared with onion berbere pepper and butter served with injera.", "/images/qeyhTibsi.jpg", "Keyh Wet", 249.00m });

            migrationBuilder.InsertData(
                table: "MenuItems",
                columns: new[] { "Id", "CategoryId", "Description", "ImageUrl", "Name", "Price" },
                values: new object[,]
                {
                    { 7, 1, "Beef meat prepared with onion berbere pepper and butter served with injera.", "/images/qeyh.jpg", "Red Tibsi", 249.00m },
                    { 8, 1, "a combination of exotic national dishes Mosob style served with injera. .", "/images/beyaynetu.jpg", "Huset's Special", 299.00m },
                    { 9, 2, "Classic pizza with tomato, mozzarella, and basil.", "/images/kitfo.jpg", "Margherita Pizza", 120.00m },
                    { 10, 2, "Pasta with eggs, cheese, pancetta, and pepper.", "/images/kitfo.jpg", "Pasta Carbonara", 140.00m },
                    { 11, 2, "Baked layers of pasta with beef ragu and bechamel sauce.", "/images/kitfo.jpg", "Lasagna", 160.00m },
                    { 12, 2, "Spaghetti with slow-cooked meat sauce.", "/images/kitfo.jpg", "Spaghetti Bolognese", 130.00m },
                    { 13, 2, "Creamy rice dish with mushrooms and Parmesan.", "/images/kitfo.jpg", "Risotto", 150.00m },
                    { 14, 2, "Classic pizza with tomato, mozzarella, and basil.", "/images/kitfo.jpg", "Margherita Pizza", 120.00m },
                    { 15, 2, "Pasta with eggs, cheese, pancetta, and pepper.", "/images/kitfo.jpg", "Pasta Carbonara", 140.00m },
                    { 16, 2, "Baked layers of pasta with beef ragu and bechamel sauce.", "/images/kitfo.jpg", "Lasagna", 160.00m },
                    { 17, 2, "Spaghetti with slow-cooked meat sauce.", "/images/kitfo.jpg", "Spaghetti Bolognese", 130.00m },
                    { 18, 2, "Creamy rice dish with mushrooms and Parmesan.", "/images/kitfo.jpg", "Risotto", 150.00m },
                    { 19, 2, "Pasta tossed with butter, Parmesan, and cream.", "/images/kitfo.jpg", "Fettuccine Alfredo", 145.00m },
                    { 20, 2, "Grilled bread topped with tomatoes, basil, and olive oil.", "/images/kitfo.jpg", "Bruschetta", 90.00m },
                    { 21, 2, "Traditional Italian coffee-flavored dessert.", "/images/kitfo.jpg", "Tiramisu", 80.00m },
                    { 22, 2, "Soft dough dumplings served with a tomato sauce.", "/images/kitfo.jpg", "Gnocchi", 135.00m },
                    { 23, 3, "Italian coffee drink with steamed milk foam.", "/images/kitfo.jpg", "Cappuccino", 50.00m },
                    { 24, 3, "Rich and bold Italian coffee.", "/images/kitfo.jpg", "Espresso", 45.00m },
                    { 25, 3, "Full-bodied red wine.", "/images/kitfo.jpg", "Red Wine", 80.00m },
                    { 26, 3, "Freshly squeezed lemonade.", "/images/kitfo.jpg", "Lemonade", 40.00m },
                    { 27, 3, "Chilled sparkling water.", "/images/kitfo.jpg", "Mineral Water", 30.00m },
                    { 28, 3, "Italian coffee drink with steamed milk foam.", "/images/kitfo.jpg", "Cappuccino", 50.00m },
                    { 29, 3, "Rich and bold Italian coffee.", "/images/kitfo.jpg", "Espresso", 45.00m },
                    { 30, 3, "Full-bodied red wine.", "/images/kitfo.jpg", "Red Wine", 80.00m },
                    { 31, 3, "Freshly squeezed lemonade.", "/images/kitfo.jpg", "Lemonade", 40.00m },
                    { 32, 3, "Chilled sparkling water.", "/images/kitfo.jpg", "Mineral Water", 30.00m },
                    { 33, 3, "Chilled iced tea with lemon.", "/images/kitfo.jpg", "Iced Tea", 35.00m },
                    { 34, 3, "Fruity alcoholic beverage.", "/images/kitfo.jpg", "Cocktail", 95.00m },
                    { 35, 3, "Refreshing cold beer.", "/images/kitfo.jpg", "Beer", 50.00m },
                    { 36, 3, "Warm and comforting chocolate drink.", "/images/kitfo.jpg", "Hot Chocolate", 40.00m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 13);

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
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 26);

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

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: 3);

            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Price = table.Column<decimal>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: 1,
                column: "Name",
                value: "Main Mesob Dishes");

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: 2,
                column: "Name",
                value: "Vegan and Vegetarian Dishes");

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 1,
                column: "Price",
                value: 319.00m);

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 2,
                column: "Price",
                value: 319.00m);

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CategoryId", "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { 2, "Ground chickpeas simmered in berbere sauce served with injera.", "/images/gored.jpg", "Shiro", 319.00m });

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { "Fried meat with spices served with injera.", "/images/kitfo.jpg", "Tibs", 299.00m });

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "CategoryId", "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { 2, "Chocolate fondant served with vanilla ice cream.", "/images/kitfo.jpg", "Sjokoladefondant", 135.00m });

            migrationBuilder.UpdateData(
                table: "MenuItems",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "CategoryId", "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { 2, "Banana, ice cream, chocolate sauce, and raspberry coulis.", "/images/gored.jpg", "Banansplit", 160.00m });
        }
    }
}
