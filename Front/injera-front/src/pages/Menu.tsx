import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { MenuItem } from '../models/MenuItem';
import { Category } from '../models/Category';
import { Link } from 'react-router-dom';  // Import Link

// Container for the entire menu
const MenuContainer = styled.div`
  padding: 20px;
  text-align: center;
  background-color: Gainsboro;
  min-height: 100vh;
`;

// Sticky Header for the Category buttons
const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 100;
  padding: 1px 0;
  display: flex;
  justify-content: center;
  gap: 40px;
  border-bottom: 2px solid #ccc;
`;

// Styled category buttons
const CategoryButton = styled.button<{ isActive: boolean }>`
  padding: 10px 30px;
  background-color: ${({ isActive }) => (isActive ? '#ddd' : '#f0f0f0')};
  border: 1px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  font-size: 20px;
  &:hover {
    background-color: #D2691E;
  }
`;

// Grid layout for menu items
const MenuItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  justify-items: center;
  margin-top: 60px;
`;

// Card style for each menu item
const MenuItemCard = styled.div`
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 300px;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const MenuItemDetails = styled.div`
  padding: 15px;
`;

const MenuItemName = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin: 10px 0;
`;

const MenuItemDescription = styled.p`
  margin: 10px 0;
`;

const Price = styled.p`
  font-weight: bold;
  margin-top: 10px;
`;
// Styled Reservation Button
const ReservationButton = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 15px 30px;
  background-color: #D2691E;
  color: #fff;
  text-decoration: none;
  font-size: 20px;
  border-radius: 10px;
  &:hover {
    background-color: #A0522D;
  }
`;

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(1); // Initially null
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  

  const BASE_URL = 'http://localhost:5102';

  // Fetch categories from the API and set the default category
  // Fetch categories from the API and set the default category
useEffect(() => {
  axios.get(`${BASE_URL}/api/Categories`)
    .then(response => {
      console.log('Fetched Categories:', response.data);
      setCategories(response.data);

      // Set the default category to Habesha (assuming its categoryId is 1)
      const habeshaCategory = response.data.find((category: Category) => category.Name === 'Habesha');
      if (habeshaCategory) {
        setActiveCategory(habeshaCategory.categoryId);  // Set activeCategory to Habesha's ID
      }
    })
    .catch(error => {
      console.error('Error fetching categories', error);
    });
}, []);

  
  // Fetch menu items from the API
  useEffect(() => {
    axios.get(`${BASE_URL}/api/MenuItems`)
      .then((response) => {
        console.log('Fetched Menu Items:', response.data); 
        setMenuItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching menu items', error);
      });
  }, []);

  // Filter items based on activeCategory
  useEffect(() => {
    if (menuItems.length > 0 && activeCategory !== null) {
      console.log('Menu Items:', menuItems);  // Check all menu items
      const filtered = menuItems.filter(
        (item: MenuItem) => item.categoryId === activeCategory
      );
      setFilteredItems(filtered);
      console.log('Filtered Items:', filtered);  // Check filtered items
    }
  }, [menuItems, activeCategory]);
  

  // Handle category click and filter
  const handleCategoryClick = (categoryId: number) => {
    setActiveCategory(categoryId);
  };

  return (
    <MenuContainer>
    <h1>Menu</h1>

    {/* Sticky Header with Category Buttons */}
    <StickyHeader>
      <CategoryButton
        isActive={activeCategory === 1}
        onClick={() => handleCategoryClick(1)}
      >
        Habesha
      </CategoryButton>

      <CategoryButton
        isActive={activeCategory === 2}
        onClick={() => handleCategoryClick(2)}
      >
        Italian
      </CategoryButton>

      <CategoryButton
        isActive={activeCategory === 3}
        onClick={() => handleCategoryClick(3)}
      >
        Drinks
      </CategoryButton>
    </StickyHeader>

      {/* Grid layout for menu items */}
      <MenuItemsGrid>
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <MenuItemCard key={item.id}>
              <Image src={`${BASE_URL}${item.imageUrl}`} alt={item.name} />
              <MenuItemDetails>
                <MenuItemName>{item.name}</MenuItemName>
                <MenuItemDescription>{item.description}</MenuItemDescription>
                <Price>Price: {item.price} kr</Price>
              </MenuItemDetails>
            </MenuItemCard>
          ))
        ) : (
          <p>No items available in this category.</p>
        )}
      </MenuItemsGrid>
      {/* Reservation Button */}
      <ReservationButton to="/reservation">Make a Reservation</ReservationButton>
    </MenuContainer>
  );
};

export default Menu;
