import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MenuItem } from '../../components/models/MenuItem';
import { Category } from '../../components/models/Category';
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
const Textarea = styled.textarea`
  padding: 10px;
  width: 300px;
  height: 100px; /* Increase height for better visibility */
  border-radius: 5px;
  border: 1px solid #ccc;
  resize: vertical; /* Allow the user to resize vertically */
  overflow-y: auto; /* Enable scrolling if text overflows */

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
  gap: 10px;
  flex-wrap: nowrap; /* Prevent wrapping to a new line */
`;
// Styled Update Dish button
const UpdateButton = styled.button`
  padding: 8px 20px;
  border: none;
  background-color: #008000;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  width: auto; /* Make sure it does not stretch */
  display: inline-block;

  &:hover {
    background-color: #006400; /* Darker green for hover effect */
  }
`;

// Styled Cancel Edit button
const CancelButton = styled.button`
  padding: 8px 20px;
  border: none;
  background-color: grey;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  width: auto; /* Make sure it does not stretch */
  display: inline-block;

  &:hover {
    background-color: #cc0000; /* Darker red for hover effect */
  }
`;


const AdminDashboard = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    imageFile: null as File | null // Correctly type the imageFile state
  });
  const [editItemId, setEditItemId] = useState<number | null>(null); // Track the item being edited
  // add ref for the form
  const formRef = useRef<HTMLFormElement>(null);

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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      const files = e.target.files;
      if (files && files.length > 0) {
        setNewItem({
          ...newItem,
          [name]: files[0], // Handle file input
        });
      }
    } else {
      setNewItem({
        ...newItem,
        [name]: value, // Handle text, select, and textarea inputs
      });
    }
  };


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
      // Clear the file input field
      if (formRef.current) {
        const fileInput = formRef.current.querySelector('input[name="imageFile"]') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = ''; // Clear the file input
        }
      }
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };


  // Handle updating an existing item
  const handleUpdateDish = async (e: React.FormEvent) => {
    e.preventDefault();
    // Check if an item is being edited
    if (!editItemId) return;
    //console.log('Updating dish:', newItem); // Debug log
    // Find the original item to compare with the current inputs
    const originalItem = menuItems.find(item => item.id === editItemId);
    if (!originalItem) return;
    // Create a FormData object to send the updated item
    const formData = new FormData();
    // Check if each field has been modified, and add it to the formData if it has
    if (newItem.name && newItem.name !== originalItem.name) {
      formData.append("name", newItem.name);
    }
    if (newItem.description && newItem.description !== originalItem.description) {
      formData.append("description", newItem.description);
    }
    if (newItem.price && newItem.price !== originalItem.price.toString()) {
      formData.append("price", newItem.price);
    }
    if (newItem.categoryId && newItem.categoryId !== originalItem.categoryId.toString()) {
      formData.append("categoryId", newItem.categoryId);
    }
    if (newItem.imageFile) {
      formData.append("imageFile", newItem.imageFile);
    }

    try {
      // If no fields were updated, return early
      if (!formData.has("name") && !formData.has("description") &&
        !formData.has("price") && !formData.has("categoryId") &&
        !formData.has("imageFile")) {
        console.log('No changes detected, nothing to update.');
        return;
      }



      const response = await axios({
        method: 'put',
        url: `http://localhost:5102/api/MenuItems/${editItemId}`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      

       // If successful, update the menu items state
    setMenuItems(
      menuItems.map(item =>
        item.id === editItemId ? { ...item, ...response.data } : item
      )
    );

      // Clear the form and reset the edit state
      setNewItem({ name: '', description: '', price: '', categoryId: '', imageFile: null });
      setEditItemId(null); // Reset edit mode
      setCurrentImageUrl(null); // Clear the current image URL
      if (formRef.current) {
        // Reset file input field
        const fileInput = formRef.current.querySelector('input[name="imageFile"]') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = ''; // Clear the file input
        }
      }
    } catch (error) {
      // Log detailed error info
      const err = error as any;
      if (err.response) {
        console.error('Error response from the server:', err.response.data);
      } else {
        console.error('Error making the request:', err.message);
      }
    }
  };
  // Handle editing an item (populate the form with item data)
  const handleEdit = (item: MenuItem) => {
    // Populate the form with the item data
    setNewItem({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      categoryId: item.categoryId.toString(),
      imageFile: null
    });
    setEditItemId(item.id);

    // Set the current image URL (to show the existing image)
    setCurrentImageUrl(`http://localhost:5102${item.imageUrl}`);
    // Focus on the dish name input field after scrolling
    const nameInput = formRef.current?.querySelector('input[name="name"]') as HTMLInputElement;
    if (nameInput) {
      nameInput.focus();
    }
  };

  // Handle deleting an item
  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this dish?");
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:5102/api/MenuItems/${id}`);
        setMenuItems(menuItems.filter(item => item.id !== id));
      } catch (err) {
        console.error('Error deleting item:', err);
      }
    }
  }

  return (
    <DashboardContainer>
      <h2>Admin Dashboard</h2>

      <FormContainer ref={formRef} onSubmit={editItemId === null ? handleAddDish : handleUpdateDish}>
        <Input
          type="text"
          name="name"
          value={newItem.name}
          onChange={handleChange}
          placeholder="Dish Name"
          required
        />
        <Textarea
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
        {currentImageUrl && (
          <div>
            <p>Current Image:</p>
            <img
              src={currentImageUrl}
              alt="Current Dish Image"
              style={{
                maxWidth: '300px', // Set the max width
                maxHeight: '200px', // Set the max height
                width: 'auto', // Let the width scale based on height
                height: 'auto' // Let the height scale based on width
              }}
            />
          </div>
        )}
        <Input
          type="file"
          name="imageFile"
          onChange={handleChange}
          accept="image/*"
        /> {/* Image file input */}
        <ButtonContainer>
  <UpdateButton type="submit">
    {editItemId === null ? 'Add Dish' : 'Update Dish'}
  </UpdateButton>
  {editItemId !== null && (
    <CancelButton
      type="button"
      onClick={() => {
        // Reset form and clear the editing state
        setNewItem({ name: '', description: '', price: '', categoryId: '', imageFile: null });
        setEditItemId(null);
        setCurrentImageUrl(null);
      }}
    >
      Cancel Edit
    </CancelButton>
  )}
</ButtonContainer>

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