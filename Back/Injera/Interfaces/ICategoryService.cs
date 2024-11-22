public interface ICategoryService
{
    Task<IEnumerable<Category>> GetCategoriesAsync();
}
