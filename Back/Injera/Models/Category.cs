public class Category
{
    public int CategoryId { get; set; }
    public string Name { get; set; }
    // collection of related menu items
    public ICollection<MenuItem> MenuItems { get; set; }
}
