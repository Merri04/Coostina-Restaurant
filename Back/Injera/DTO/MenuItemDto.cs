using System.ComponentModel.DataAnnotations;

public class MenuItemDto
{
    public string? Name { get; set; } // Make Name nullable to allow partial updates

    public string? Description { get; set; } // Make Description nullable

    [Range(0, double.MaxValue, ErrorMessage = "Price must be greater than or equal to 0")]
    public decimal? Price { get; set; } // Make Price nullable

    public int? CategoryId { get; set; } // Make CategoryId nullable to allow optional updates
}
