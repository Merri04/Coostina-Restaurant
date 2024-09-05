using Microsoft.EntityFrameworkCore;
namespace Injera.Models;

public class RestaurantContext : DbContext
    {
        public RestaurantContext(DbContextOptions<RestaurantContext> options) : base(options) {}
        public DbSet<MenuItem> MenuItems { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Defining the relationship between MenuItem and Category
            modelBuilder.Entity<MenuItem>()
                .HasOne(mi => mi.Category)
                .WithMany(c => c.MenuItems)
                .HasForeignKey(mi => mi.CategoryId)
                .IsRequired();

            // Seed data for menu items
            modelBuilder.Entity<Category>().HasData(
                new Category { CategoryId = 1, Name = "Main Mesob Dishes" },
                new Category { CategoryId = 2, Name = "Vegan and Vegetarian Dishes" });
                new Category {CategoryId = 3, Name = "Drikke"};


            modelBuilder.Entity<MenuItem>().HasData(
                new MenuItem
                {
                    Id = 1,
                    Name = "Kitfo",
                    Description = "Beef with black cardamom & spiced butter Mitmita served with injera.",
                    Price = 319.00M,
                    ImageUrl = "/images/kitfo.jpg",
                    CategoryId = 1,  // Link to Main Mesob Dishes
                    
                },
                new MenuItem
                {
                    Id = 2,
                    Name = "Gored Gored",
                    Description = "Lean & tender cubes of beef spiced with butter 'Mitmita Spice' served with injera.",
                    Price = 319.00M,
                    ImageUrl = "/images/gored.jpg",
                    CategoryId = 1,  // Link to Main Mesob Dishes
                    
                },
                new MenuItem
                {
                    Id = 3,
                    Name = "Shiro",
                    Description = "Ground chickpeas simmered in berbere sauce served with injera.",
                    Price = 319.00M,
                    ImageUrl = "/images/gored.jpg",
                    CategoryId = 2,  // Link to Vegan and Vegetarian Dishes
                    
                },
                new MenuItem
                {
                    Id = 4,
                    Name = "Tibs",
                    Description = "Fried meat with spices served with injera.",
                    Price = 299.00M,
                    ImageUrl = "/images/kitfo.jpg",
                    CategoryId = 1
                },
                new MenuItem
                {
                    Id = 5,
                    Name = "Sjokoladefondant",
                    Description = "Chocolate fondant served with vanilla ice cream.",
                    Price = 135.00M,
                    ImageUrl = "/images/kitfo.jpg",
                    CategoryId = 2  // Desserts
                },
                new MenuItem
                {
                    Id = 6,
                    Name = "Banansplit",
                    Description = "Banana, ice cream, chocolate sauce, and raspberry coulis.",
                    Price = 160.00M,
                    ImageUrl = "/images/gored.jpg",
                    CategoryId = 2  // Desserts
                }

             );
        }
    }

 
