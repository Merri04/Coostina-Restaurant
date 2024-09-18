using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class MenuItem
{
    public int Id { get; set; } // Primary Key for the MenuItem table in the database (auto-generated)
    [Required]
    public string Name { get; set; }
    [Required]
    public string Description { get; set; }
    [Range(0, double.MaxValue, ErrorMessage = "Price must be greater than or equal to 0")]
    public decimal Price { get; set; }

    public string ImageUrl { get; set; }

    // Add this property for the uploaded file
    [NotMapped]
    public IFormFile ImageFile { get; set; }

    // Foreign Key
    [Required]
    public int CategoryId { get; set; }

    // Navigation property
    public Category Category { get; set; }
}
