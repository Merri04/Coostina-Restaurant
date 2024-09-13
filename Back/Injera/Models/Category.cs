public class Category
{
    public int CategoryId { get; set; }
    public string Name { get; set; }
    
    // Initialize the collection to avoid null references
    public ICollection<MenuItem> MenuItems { get; set; } = new List<MenuItem>();
}
