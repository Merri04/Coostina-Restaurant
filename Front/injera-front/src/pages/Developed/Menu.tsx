import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { MenuItem } from '../../components/models/MenuItem';
import { Category } from '../../components/models/Category';
import { Link } from 'react-router-dom';  // Import Link
// Container for the entire menu
const MenuContainer = styled.div`
  padding: 45px 0;
  font-family: 'Times New Roman', sans-serif;
  text-align: center;
  background-color: #fff;
  min-height: 100vh; 
  width: 100%;
  overflow-x: visible; 
  max-width: 100%;
  position: relative;
  padding-bottom: 100px; 
  padding-top: 2px;
`;

// Sticky Header for the Category buttons
const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  background-color: #fafafa;
  z-index: 1000; 
  padding: 15px 0;
  display: flex;
  justify-content: center;
  gap: 20px; 
  border-bottom: 1px solid #eee;
  flex-wrap: wrap;
  box-shadow: 0 3px 4px rgba(0,0,0,0.1);
  width: 100%;
`;
// Styled category buttons
const CategoryButton = styled.button<{ isActive: boolean }>`
  padding: 10px 30px;
  background-color: ${({ isActive }) => (isActive ? '#D2691E' : '#f0f0f0')};
  border: 1px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  font-size: 20px;
  white-space: nowrap; /* Prevent buttons from breaking onto multiple lines */
  color: ${({ isActive }) => (isActive ? 'white' : 'black')}; /* Changed text color for better readability */
  transition: background-color 0.3s; /* Added transition for smoother hover effect */


  &:hover {
    background-color: #D2691E;
    color: white; /* Change text color on hover */
  }

  @media (max-width: 768px) {
    padding: 8px 20px; /* Reduce padding for smaller screens */
    font-size: 16px; /* Adjust font size */
    width: auto; /* Ensure buttons don't stretch across the screen */
    flex-shrink: 0; /* Prevent shrinking */
  }
`;
// Grid layout for menu items
const MenuItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Default layout for larger screens */
  justify-items: center;
  column-gap: 15px; /* Space between columns */
  row-gap: 40px;
  margin-top: 30px;
  padding: 35px 125px; /* Add padding to the sides */

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); /* 2 columns for medium screens */
    padding: 35px 50px; /* Adjust padding for smaller screens */
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 2 columns for small screens */
    row-gap: 20px;
    padding: 20px 15px; /* Further reduce padding on small screens */
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* 1 column for very small screens (mobile) */
  }
`;

// Adjust MenuItemCard styling for smaller screens
const MenuItemCard = styled.div`
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 290px; /* Default max width for larger screens */
  width: 100%;
  transition: transform 0.3s, box-shadow 0.3s;

  @media (max-width: 1024px) { // Adjust card size for medium screens 
    max-width: 250px; /* Adjust card size for medium screens */
    
  }

  @media (max-width: 768px) {
    max-width: 100%; /* Make the card take up the full width on small screens */
    width: 90%; /* Ensure consistent width on smaller screens */
  }
`;


const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 150px; /* Optional max height */
  object-fit: cover;
`;

// Adjust the details padding and margins to bring items closer
const MenuItemDetails = styled.div`
  padding: 12px; /* Reduce padding inside the card */
`;

const MenuItemName = styled.h2`
  font-size: 1.1rem; /* Reduce font size */
  font-weight: bold;
  margin: 5px 0; /* Adjust margins */
`;

const MenuItemDescription = styled.p`
  margin: 10px 0; /* Reduce space between lines */
  font-size: 0.9rem; /* Slightly smaller font for description */
`;

const Price = styled.p`
  font-weight: bold;
  color: #D2691E;
  font-family: 'Times New Roman', sans-serif;
`;
// Styled Reservation Button
const ReservationButton = styled(Link)`
  display: inline-block;
  position: fixed; /* Keep it fixed */
  bottom: 20px;
  right: -77px;  /* Move the button halfway across the screen */
  transform: translateX(-60%);  /* Offset it by 50% of its own width to center */
  padding: 13px 20px; 
  background-color: #E0C879;
  color: black;
  text-decoration: none; 
  font-size: 15px;
  border-radius: 10px;
  z-index: 1000; /* Ensure it's above other content */
  max-width: 200px;
  font-family: 'Times New Roman', sans-serif;
  overflow: hidden;
  &:hover {
    background-color: #E69824;
  }

  @media (max-width: 768px) {
    padding: 12px 25px;
    font-size: 18px;
    width: 90%;  /* Ensure the button is wider on small screens */
    left: 50%;  /* Center the button on small screens */
    transform: translateX(-50%);  /* Offset to center on small screens */
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
