import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MenuItem } from '../models/MenuItem';
import { Category } from '../models/Category';

const AdminDashboard = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    imageFile: null as File | null // Correctly type the imageFile state
  });
  const [editItemId, setEditItemId] = useState<number | null>(null); // Track the item being edited

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesRes = await axios.get('http://localhost:5102/api/Categories/Categories');
      const mappedCategories = categoriesRes.data.map((category: any) => ({
        CategoryId: category.categoryId,
        Name: category.name
      }));
      setCategories(mappedCategories);
    };

    const fetchMenuItems = async () => {
      const menuItemsRes = await axios.get('http://localhost:5102/api/MenuItems');
      setMenuItems(menuItemsRes.data);
    };

    fetchCategories();
    fetchMenuItems();
  }, []);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.name === "imageFile") {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        setNewItem({
          ...newItem,
          [e.target.name]: files[0] // Make sure file is not null
        });
      }
    } else {
      setNewItem({
        ...newItem,
        [e.target.name]: e.target.value
      });
    }
  };

  // Handle adding or updating a new item
  const handleAddOrUpdateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newItem.name);
    formData.append("description", newItem.description);
    formData.append("price", newItem.price);
    formData.append("categoryId", newItem.categoryId);

    if (newItem.imageFile) {
      formData.append("imageFile", newItem.imageFile); // Add image file if exists
    }

    try {
      if (editItemId !== null) {
        // Update existing item if in edit mode
        const res = await axios.put(`http://localhost:5102/api/MenuItems/${editItemId}`, formData);
        
        setMenuItems(menuItems.map(item => (item.id === editItemId ? res.data : item)));
        setEditItemId(null); // Exit edit mode
      } else {
        // Add new item
        const res = await axios.post('http://localhost:5102/api/MenuItems', formData); 

        setMenuItems([...menuItems, res.data]);
      }
      
      // Reset the form
      setNewItem({ name: '', description: '', price: '', categoryId: '', imageFile: null });
    } catch (err) {
      console.error('Error adding or updating item:', err);
    }
  };

  // Handle editing an item (populate the form with item data)
  const handleEdit = (item: MenuItem) => {
    setNewItem({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      categoryId: item.categoryId.toString(),
      imageFile: null // Reset the imageFile for editing
    });
    setEditItemId(item.id); // Set the item id to edit mode
  };

  // Handle deleting an item
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5102/api/MenuItems/${id}`);
      setMenuItems(menuItems.filter(item => item.id !== id)); // Remove the deleted item from the list
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      
      <form onSubmit={handleAddOrUpdateItem}>
        <input 
          type="text" 
          name="name" 
          value={newItem.name} 
          onChange={handleChange} 
          placeholder="Dish Name" 
          required 
        />
        <input 
          type="text" 
          name="description" 
          value={newItem.description} 
          onChange={handleChange} 
          placeholder="Description" 
          required 
        />
        <input 
          type="number" 
          name="price" 
          value={newItem.price} 
          onChange={handleChange} 
          placeholder="Price" 
          required 
        />
        <select 
          name="categoryId" 
          value={newItem.categoryId} 
          onChange={handleChange} 
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.CategoryId} value={category.CategoryId}>
              {category.Name}
            </option>
          ))}
        </select>
        <input 
          type="file" 
          name="imageFile" 
          onChange={handleChange} 
          accept="image/*" 
        /> {/* Image file input */}
        <button type="submit">{editItemId === null ? 'Add Dish' : 'Update Dish'}</button>
      </form>

      <ul>
        {menuItems.map(item => (
          <li key={item.id}>
            <img src={item.imageUrl} alt={item.name} style={{ width: '100px', height: '100px' }} /> {/* Display the image */}
            {item.name} - {item.price} kr ({categories.find(c => c.CategoryId === item.categoryId)?.Name})
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;