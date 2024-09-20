using System.ComponentModel.DataAnnotations;

public class MenuItemDto
{
    [Required]
    public string Name { get; set; }

    [Required]
    public string Description { get; set; }

    [Range(0, double.MaxValue, ErrorMessage = "Price must be greater than or equal to 0")]
    public decimal Price { get; set; }

    [Required(ErrorMessage = "CategoryId is required")]
    public int CategoryId { get; set; }  // CategoryId should be required.
}
