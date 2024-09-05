
public class MenuItem
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public string ImageUrl { get; set; }

    // Foreign Key
    public int CategoryId { get; set; }

    // Navigation property
    public Category Category { get; set; }
}
