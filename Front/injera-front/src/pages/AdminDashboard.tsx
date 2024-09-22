import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MenuItem } from '../models/MenuItem';
import { Category } from '../models/Category';
import { styled } from 'styled-components';


// Styled container for the entire dashboard
const DashboardContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

// Styled form to add/update dishes
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
`;

// Styled input for the form
const Input = styled.input`
  padding: 10px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;
// styled add and update button
const Button = styled.button`
  padding: 8px 20px;
  border: none;
  background-color: #008000;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  
  &:hover {
    background-color: #A0522D;
  }
`;
// Styled select element for categories
const Select = styled.select`
  padding: 10px;
  width: 320px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

// Styled button for form submission
const EditButton = styled.button`
  padding: 8px 20px;
  border: none;
  background-color: #D2691E;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  //margin-bottom: 20px;
  
  &:hover {
    background-color: #A0522D;
  }
`;
// style delete button
const DeleteButton = styled.button`
  padding: 8px 20px;
  border: none;
  background-color: #ff0000;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #A0522D;
  }
`;
const Price = styled.p`
  font-weight: bold;
  margin-top: 25px;
`;

// Container for the list of menu items
const MenuItemsContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  list-style: none;
  padding: 0;
  justify-items: center;
`;

// Styled card for each menu item
const MenuItemCard = styled.li`
  display: flex;
  flex-direction: column; /* Align content vertically */
  justify-content: space-between; /* Push buttons to the bottom */
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 290px; /* Default max width for larger screens */
  width: 100%;
  height: 100%; /* Ensure all cards have the same height */

  @media (max-width: 768px) {
    max-width: 100%; /* Make the card take up the full width on small screens */
    width: 90%; /* You can adjust this to control the size on smaller screens */
  }
`;


// Styled image for the dish
const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 150px; /* Optional max height */
  object-fit: cover;
`;
// Adjust the details padding and margins to bring items closer
const MenuItemDetails = styled.div`
  padding: 5px; /* Reduce padding inside the card */
  flex-grow: 1; /* Allow the details to grow to fill the space */
`;

const MenuItemName = styled.h2`
  font-size: 1rem; /* Reduce font size */
  font-weight: bold;
  margin: 5px 0; /* Adjust margins */
`;

const MenuItemDescription = styled.p`
  margin: 5px 0; /* Reduce space between lines */
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// Container for buttons in each menu item card
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  gap: 20px;
  padding-bottom: 10px;
`;

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
      const categoriesRes = await axios.get('http://localhost:5102/api/Categories');
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

  /*// Handle adding or updating a new item
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
      console.log('Submitting form data:', formData);  // Add this line
      const res = await axios.post('http://localhost:5102/api/MenuItems', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMenuItems([...menuItems, res.data]); // Add the new item to the list
      setNewItem({ name: '', description: '', price: '', categoryId: '', imageFile: null }); // Reset form
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };*/
  // Handle adding a new item
  const handleAddDish = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newItem.name);
    formData.append("description", newItem.description);
    formData.append("price", newItem.price);
    formData.append("categoryId", newItem.categoryId);

    if (newItem.imageFile) {
      formData.append("imageFile", newItem.imageFile);
    }

    try {
      const res = await axios.post('http://localhost:5102/api/MenuItems', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMenuItems([...menuItems, res.data]);
      setNewItem({ name: '', description: '', price: '', categoryId: '', imageFile: null });
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  // Handle updating an existing item
  const handleUpdateDish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItemId) return;
    const formData = new FormData();
    formData.append("name", newItem.name);
    formData.append("description", newItem.description);
    formData.append("price", newItem.price);
    formData.append("categoryId", newItem.categoryId);

    if (newItem.imageFile) {
      formData.append("imageFile", newItem.imageFile);
    }

    try {
      const res = await axios.put(`http://localhost:5102/api/MenuItems/${editItemId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMenuItems(menuItems.map(item => item.id === editItemId ? res.data : item)); // Update the item in the list
      setNewItem({ name: '', description: '', price: '', categoryId: '', imageFile: null }); // Reset form
      setEditItemId(null); // Reset edit mode
    } catch (err) {
      console.error('Error updating dish:', err);
    }
  };

  // Handle editing an item (populate the form with item data)
  const handleEdit = (item: MenuItem) => {
    setNewItem({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      categoryId: item.categoryId.toString(),
      imageFile: null
    });
    setEditItemId(item.id);
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
    <DashboardContainer>
      <h2>Admin Dashboard</h2>

      <FormContainer onSubmit={editItemId === null ? handleAddDish : handleUpdateDish}>
        <Input
          type="text"
          name="name"
          value={newItem.name}
          onChange={handleChange}
          placeholder="Dish Name"
          required
        />
        <Input
          type="text"
          name="description"
          value={newItem.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <Input
          type="number"
          name="price"
          value={newItem.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <Select
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
        </Select>
        <Input
          type="file"
          name="imageFile"
          onChange={handleChange}
          accept="image/*"
        /> {/* Image file input */}
        <Button type="submit">{editItemId === null ? 'Add Dish' : 'Update Dish'}</Button>
      </FormContainer>

      <MenuItemsContainer>
        {menuItems.map(item => (
          <MenuItemCard key={item.id}>
            <Image src={`http://localhost:5102${item.imageUrl}`} alt={item.name} />
            <MenuItemDetails>
              <MenuItemName>{item.name}</MenuItemName>
              <MenuItemDescription>{item.description}</MenuItemDescription>
              <Price>Price: {item.price} kr</Price>
            </MenuItemDetails>
            <ButtonContainer>
              <EditButton onClick={() => handleEdit(item)}>Edit</EditButton>
              <DeleteButton onClick={() => handleDelete(item.id)}>Delete</DeleteButton>
            </ButtonContainer>
          </MenuItemCard>
        ))}
      </MenuItemsContainer>
    </DashboardContainer>
  );
};

export default AdminDashboard;