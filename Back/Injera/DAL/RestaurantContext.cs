using Microsoft.EntityFrameworkCore;
namespace Injera.Models;

public class RestaurantContext : DbContext
    {
        public RestaurantContext(DbContextOptions<RestaurantContext> options) : base(options) {}
        public DbSet<MenuItem> MenuItems { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Admin> Admins { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

                    // Ensure email is unique
            modelBuilder.Entity<Admin>()
                .HasIndex(a => a.Email)
                .IsUnique();

            // Defining the relationship between MenuItem and Category
            modelBuilder.Entity<MenuItem>()
                .HasOne(mi => mi.Category)
                .WithMany(c => c.MenuItems)
                .HasForeignKey(mi => mi.CategoryId)
                .IsRequired();

            // Seed data for menu items
            modelBuilder.Entity<Category>().HasData(
                new Category { CategoryId = 1, Name = "Habesha" },
                new Category { CategoryId = 2, Name = "Italian" },
                new Category { CategoryId = 3, Name = "Drinks"}
                );

            modelBuilder.Entity<MenuItem>().HasData( 
                new MenuItem
                {
                    Id = 1,
                    Name = "Kitfo",
                    Description = "Beef with black cardamom & spiced butter Mitmita served with injera.",
                    Price = 325.00M,
                    ImageUrl = "/images/kitfo.jpg",
                    CategoryId = 1,  // Link to Main Mesob Dishes
                    
                },
                new MenuItem
                {
                    Id = 2,
                    Name = "Gored Gored",
                    Description = "Lean & tender cubes of beef spiced with butter 'Mitmita Spice' served with injera.",
                    Price = 325.00M,
                    ImageUrl = "/images/gored.jpg",
                    CategoryId = 1,  // Link to Main Mesob Dishes
                    
                },
                new MenuItem
                {
                    Id = 3,
                    Name = "Tibsi Firfir",
                    Description = "Grilled biff prepared with onion, garlic, oil and green papper served with injera.",
                    Price = 349.00M,
                    ImageUrl = "/images/firfir.webp",
                    CategoryId = 1,  // Link to Vegan and Vegetarian Dishes
                    
                },
                new MenuItem
                {
                    Id = 4,
                    Name = "White Tibsi",
                    Description = "Lean & tender cubes of beef spiced with butter 'Mitmita Spice' served with injera.",
                    Price = 249.00M,
                    ImageUrl = "/images/xaida.jpg",
                    CategoryId = 1
                },
                new MenuItem
                {
                    Id = 5,
                    Name = "Zilzil Tibsi",
                    Description = "Strips of beef steked with butter, traditional herbs, spices ans served with injera.",
                    Price = 349.00M,
                    ImageUrl = "/images/zilzil.webp",
                    CategoryId = 1  // Desserts
                },
                new MenuItem
                {
                    Id = 6,
                    Name = "Keyh Wet",
                    Description = "Beef meat prepared with onion berbere pepper and butter served with injera.",
                    Price = 249.00M,
                    ImageUrl = "/images/qeyhTibsi.jpg",
                    CategoryId = 1  // Desserts
                },
                new MenuItem
                {
                    Id = 7,
                    Name = "Red Tibsi",
                    Description = "Beef meat prepared with onion berbere pepper and butter served with injera.",
                    Price = 249.00M,
                    ImageUrl = "/images/qeyh.jpg",
                    CategoryId = 1  // Desserts
                },
                new MenuItem
                {
                    Id = 8,
                    Name = "Huset's Special",
                    Description = "a combination of exotic national dishes Mosob style served with injera. .",
                    Price = 299.00M,
                    ImageUrl = "/images/beyaynetu.jpeg",
                    CategoryId = 1  // Desserts
                },
                // Seed data for Italian dishes
                new MenuItem
                {
                    Id = 9,
                    Name = "Margherita Pizza",
                    Description = "Classic pizza with tomato, mozzarella, and basil.",
                    Price = 120.00M,
                    ImageUrl = "/images/margarita.jpg",
                    CategoryId = 2
                },
                new MenuItem
                {
                    Id = 10,
                    Name = "Pasta Carbonara",
                    Description = "Pasta with eggs, cheese, pancetta, and pepper.",
                    Price = 140.00M,
                    ImageUrl = "/images/carbonara.jpg",
                    CategoryId = 2
                },
                new MenuItem
                {
                    Id = 11,
                    Name = "Lasagna",
                    Description = "Baked layers of pasta with beef ragu and bechamel sauce.",
                    Price = 160.00M,
                    ImageUrl = "/images/lasagna.jpg",
                    CategoryId = 2
                },
                new MenuItem
                {
                    Id = 12,
                    Name = "Spaghetti Bolognese",
                    Description = "Spaghetti with slow-cooked meat sauce.",
                    Price = 130.00M,
                    ImageUrl = "/images/bolognese.jpeg",
                    CategoryId = 2
                },
                new MenuItem
                {
                    Id = 13,
                    Name = "Risotto",
                    Description = "Creamy rice dish with mushrooms and Parmesan.",
                    Price = 150.00M,
                    ImageUrl = "/images/risotto.webp",
                    CategoryId = 2
                },
                
                new MenuItem
                {
                    Id = 14,
                    Name = "Fettuccine Alfredo",
                    Description = "Pasta tossed with butter, Parmesan, and cream.",
                    Price = 145.00M,
                    ImageUrl = "/images/alfredo.jpg",
                    CategoryId = 2
                },
                new MenuItem
                {
                    Id = 15,
                    Name = "Bruschetta",
                    Description = "Grilled bread topped with tomatoes, basil, and olive oil.",
                    Price = 90.00M,
                    ImageUrl = "/images/Bruschetta.jpg",
                    CategoryId = 2
                },
                new MenuItem
                {
                    Id = 16,
                    Name = "Tiramisu",
                    Description = "Traditional Italian coffee-flavored dessert.",
                    Price = 80.00M,
                    ImageUrl = "/images/Tiramisu.webp",
                    CategoryId = 2
                },
                new MenuItem
                {
                    Id = 17,
                    Name = "Gnocchi",
                    Description = "Soft dough dumplings served with a tomato sauce.",
                    Price = 135.00M,
                    ImageUrl = "/images/Gnocchi.jpg",
                    CategoryId = 2
                },
        

            // Seed data for drinks
                new MenuItem
                {
                    Id = 18,
                    Name = "Cappuccino",
                    Description = "Italian coffee drink with steamed milk foam.",
                    Price = 50.00M,
                    ImageUrl = "/images/Cappuccino.webp",
                    CategoryId = 3
                },
                new MenuItem
                {
                    Id = 19,
                    Name = "Espresso",
                    Description = "Rich and bold Italian coffee.",
                    Price = 45.00M,
                    ImageUrl = "/images/Espresso.webp",
                    CategoryId = 3
                },
                
                new MenuItem
                {
                    Id = 26,
                    Name = "Hot Chocolate",
                    Description = "Warm and comforting chocolate drink.",
                    Price = 40.00M,
                    ImageUrl = "/images/hotchaco.jpg",
                    CategoryId = 3
                },
                new MenuItem
                {
                    Id = 21,
                    Name = "Lemonade",
                    Description = "Freshly squeezed lemonade.",
                    Price = 40.00M,
                    ImageUrl = "/images/Lemonade.jpg",
                    CategoryId = 3
                },
                new MenuItem
                {
                    Id = 23,
                    Name = "Iced Tea",
                    Description = "Chilled iced tea with lemon.",
                    Price = 35.00M,
                    ImageUrl = "/images/Iced.jpg",
                    CategoryId = 3
                },
                new MenuItem
                {
                    Id = 22,
                    Name = "Mineral Water",
                    Description = "Chilled sparkling water.",
                    Price = 30.00M,
                    ImageUrl = "/images/Mineral.png",
                    CategoryId = 3
                },
                new MenuItem
                {
                    Id = 20,
                    Name = "Red Wine",
                    Description = "Full-bodied red wine.",
                    Price = 80.00M,
                    ImageUrl = "/images/redw.jpeg",
                    CategoryId = 3
                },
                new MenuItem
                {
                    Id = 24,
                    Name = "Cocktail",
                    Description = "Fruity alcoholic beverage.",
                    Price = 95.00M,
                    ImageUrl = "/images/Cocktail.jpg",
                    CategoryId = 3
                },
                new MenuItem
                {
                    Id = 25,
                    Name = "Beer",
                    Description = "Refreshing cold beer.",
                    Price = 50.00M,
                    ImageUrl = "/images/beer.jpg",
                    CategoryId = 3
                }
            ); 
            
            }
    }


 
