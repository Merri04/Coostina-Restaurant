import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Container for the entire menu
const MenuContainer = styled.div`
  padding: 20px;
  text-align: center;
  background-color: Gainsboro;
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* Makes the background fixed while scrolling */
  min-height: 100vh;
`;

// Sticky Header for the Category buttons
const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 100;
  padding: 1px 0; /*here is the line
  display: flex;
  justify-content: center;
  gap: 20px;
  border-bottom: 2px solid #ccc;
`;

// Styled category buttons
const CategoryButton = styled.button`
  padding: 10px 20px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #ddd;
  }
`;

// Grid layout for menu items
const MenuItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  justify-items: center;
  margin-top: 70px;
`;

// Card style for each menu item
const MenuItemCard = styled.div`
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 300px;
`;

// Image of the menu item
const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

// Styling for the menu item details
const MenuItemDetails = styled.div`
  padding: 15px;
`;

// Styling for the name of the menu item
const MenuItemName = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin: 10px 0;
`;
//new line
// Styling for the description of the menu item
const MenuItemDescription = styled.p`
  margin: 10px 0;
`;

const Price = styled.p`
  font-weight: bold;
  margin-top: 10px;
`;

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  // Fetch menu items from the API
  useEffect(() => {
    axios.get('http://localhost:5102/api/MenuItems')
      .then(response => {
        setMenuItems(response.data);
        setFilteredItems(response.data); // Initially show all items
      })
      .catch(error => {
        console.error('Error fetching menu items', error);
      });
  }, []);

  // Fetch categories from the API
  useEffect(() => {
    axios.get('http://localhost:5102/api/Categories')
      .then(response => {
        setCategories(response.data);  // Store categories in state
      })
      .catch(error => {
        console.error('Error fetching categories', error);
      });
  }, []);

  // Filter items based on category
  const filterByCategory = (categoryId) => {
    setActiveCategory(categoryId);
    const filtered = menuItems.filter(item => item.categoryId === categoryId);
    setFilteredItems(filtered);
  };

  return (
    <MenuContainer>
      <h1>Menu</h1>

      {/* Sticky Header with Category Buttons */}
      <StickyHeader>
        {categories.slice(0, 3).map(category => (
          <CategoryButton
            key={category.id}
            onClick={() => filterByCategory(category.id)}
          >
            {category.name}
          </CategoryButton>
        ))}
      </StickyHeader>

      {/* Grid layout for menu items */}
      <MenuItemsGrid>
        {filteredItems.map(item => (
          <MenuItemCard key={item.id}>
            <Image src={item.imageUrl} alt={item.name} />
            <MenuItemDetails>
              <MenuItemName>{item.name}</MenuItemName>
              <MenuItemDescription>{item.description}</MenuItemDescription>
              <Price>Price: {item.price} kr</Price>
            </MenuItemDetails>
          </MenuItemCard>
        ))}
      </MenuItemsGrid>
    </MenuContainer>
  );
};

export default Menu;
