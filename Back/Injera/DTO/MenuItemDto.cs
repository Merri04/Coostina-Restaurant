using System.ComponentModel.DataAnnotations;

public class MenuItemDto
{
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public int CategoryId { get; set; }
    public string ImageUrl { get; set; }
    
    [Required]
    public IFormFile ImageFile { get; set; } // For image upload
}
