// src/pages/Home.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Home() {
  const {addToCart } = useAuth();
  const [location, setLocation] = useState("Home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [selectedDish, setSelectedDish] = useState(null);


  // 🏪 Mock Restaurants (within 15 km)
  const restaurants = [
    { id: 1, name: "Spice Garden", cuisine: "South Indian", image: "https://sukhis.com/app/uploads/2022/09/image3-5-900x601-1.jpg", distance: 2.3 },
    { id: 2, name: "Punjabi Dhaba", cuisine: "North Indian", image: "https://static.vecteezy.com/system/resources/thumbnails/049/544/526/small_2x/traditional-indian-thali-platter-presenting-various-curries-and-naan-bread-photo.jpg", distance: 4.1 },
    { id: 3, name: "Mama's Italiano", cuisine: "Italian", image: "https://c.ndtvimg.com/2021-04/umk8i7ko_pasta_625x300_01_April_21.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=886", distance: 6.7 },
    { id: 4, name: "Golden Wok", cuisine: "Chinese", image: "https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/wlqenuza/a1ccb6d0-30e6-43eb-a599-d8e6e7d840d1.jpg", distance: 9.2 },
    { id: 5, name: "Tokyo Bites", cuisine: "Japanese", image: "https://japanesetaste.com/cdn/shop/articles/chuka-ryori-chinese-food-in-japan-japanese-taste.jpg?v=1707913570&width=5760", distance: 11.5 },
    { id: 6, name: "El Sol Taqueria", cuisine: "Mexican", image: "https://hips.hearstapps.com/hmg-prod/images/pozole-index-655b86b9eeb3f.jpg?crop=0.8891532031585555xw:1xh;center,top&resize=1200:*", distance: 13.8 }
  ];

  // Map restaurantId → data
  const restaurantMap = {};
  restaurants.forEach(r => {
    restaurantMap[r.id] = r;
  });

  // 🔢 Full Cuisines with Dishes, Ingredients & Images
  const cuisines = [
    // 🌿 South Indian
    {
      id: 1,
      title: "🍛 South Indian",
      desc: "Healthy, light, and full of flavor",
      image: "https://sukhis.com/app/uploads/2022/09/image3-5-900x601-1.jpg",
      dishes: [
        {
          name: "Masala Dosa",
          price: "$6.99",
          img: "https://vismaifood.com/storage/app/uploads/public/8b4/19e/427/thumb__700_0_0_0_auto.jpg",
          ingredients: ["Rice batter", "Urad dal", "Potatoes", "Onion", "Mustard seeds", "Curry leaves", "Oil", "Turmeric"],
          desc: "Crispy rice crepe filled with spiced potatoes and onions.",
          restaurantId: 1
        },
        {
          name: "Idli Sambar",
          price: "$4.99",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPM3bEVgmErY6bprabE2YvFEhihABpwjLpnQ&s",
          ingredients: ["Rice", "Urad dal", "Sambar powder", "Tamarind", "Carrots", "Drumsticks", "Lentils", "Coconut chutney"],
          desc: "Steamed rice-lentil cakes served with tangy sambar.",
          restaurantId: 1
        },
        {
          name: "Medu Vada",
          price: "$5.49",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbaqeRbG_S1cgllKzjLsTTYIklzBXMJbBeSA&s",
          ingredients: ["Urad dal", "Black pepper", "Cumin", "Curry leaves", "Onion", "Ginger", "Salt", "Oil"],
          desc: "Savory lentil donuts, crispy outside, soft inside.",
          restaurantId: 1
        },
        {
          name: "Upma",
          price: "$4.79",
          img: "https://yennadosa.com/wp-content/uploads/2024/07/yenna-blog.png",
          ingredients: ["Semolina (rava)", "Mustard seeds", "Urad dal", "Chana dal", "Cashews", "Curry leaves", "Green chilies", "Vegetables"],
          desc: "Semolina porridge cooked with veggies and spices.",
          restaurantId: 1
        },
        {
          name: "Pongal",
          price: "$5.29",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAJNBPZ4kIBMV5WM01B893w5SQV9DZPUlzvQ&s",
          ingredients: ["Rice", "Moong dal", "Pepper", "Cumin", "Ghee", "Cashews", "Curry leaves", "Salt"],
          desc: "Rice and lentil dish seasoned with cumin and ghee.",
          restaurantId: 1
        },
        {
          name: "Coconut Chutney",
          price: "$2.99",
          img: "https://shwetainthekitchen.com/wp-content/uploads/2022/04/Coconut-Chutney.jpg",
          ingredients: ["Fresh coconut", "Roasted chana dal", "Green chilies", "Ginger", "Curry leaves", "Mustard seeds", "Tamarind", "Salt"],
          desc: "Fresh coconut chutney with roasted chana dal and curry leaves.",
          restaurantId: 1
        }
      ]
    },

    // 🔥 North Indian
    {
      id: 2,
      title: "🥟 North Indian",
      desc: "Rich, creamy, and deeply flavorful",
      image: "https://static.vecteezy.com/system/resources/thumbnails/049/544/526/small_2x/traditional-indian-thali-platter-presenting-various-curries-and-naan-bread-photo.jpg",
      dishes: [
        {
          name: "Butter Chicken",
          price: "$12.99",
          img: "https://images.immediate.co.uk/production/volatile/sites/30/2021/02/butter-chicken-ac2ff98.jpg?quality=90&resize=440,400",
          ingredients: ["Chicken", "Tomato puree", "Cream", "Butter", "Garlic", "Ginger", "Garam masala", "Kasuri methi"],
          desc: "Tandoori chicken in rich tomato-butter gravy.",
          restaurantId: 2
        },
        {
          name: "Paneer Tikka",
          price: "$10.99",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_QIk_sZjhIAEdfPDoqoV-OJufvhYwJdCHuw&s",
          ingredients: ["Paneer", "Bell peppers", "Onion", "Yogurt", "Lemon juice", "Ginger-garlic paste", "Spices"],
          desc: "Grilled cottage cheese cubes marinated in spices.",
          restaurantId: 2
        },
        {
          name: "Chole Bhature",
          price: "$9.49",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBfxC3_gPgiXyRF4CEoAtrF6Kp0DHra65GTQ&s",
          ingredients: ["Chickpeas", "Onion", "Tomato", "Spices", "Oil", "Flour", "Yogurt", "Baking soda"],
          desc: "Spicy chickpeas with deep-fried leavened bread.",
          restaurantId: 2
        },
        {
          name: "Dal Makhani",
          price: "$9.99",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwQkc3fi__JqhlWtpLAJqmBOKPA5k1G27BIg&s",
          ingredients: ["Whole black lentils", "Kidney beans", "Butter", "Cream", "Garlic", "Ginger", "Tomato", "Spices"],
          desc: "Slow-cooked black lentils with cream and butter.",
          restaurantId: 2
        },
        {
          name: "Garlic Naan",
          price: "$3.49",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLv-Dclr8ZMc36DOJD9cNgQ_6wotA3rXX-3A&s",
          ingredients: ["Wheat flour", "Yeast", "Milk", "Garlic", "Butter", "Salt", "Sugar"],
          desc: "Leavened flatbread with garlic, butter, and herbs.",
          restaurantId: 2
        },
        {
          name: "Aloo Paratha",
          price: "$5.99",
          img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/06/aloo-paratha.jpg",
          ingredients: ["Whole wheat flour", "Potatoes", "Onion", "Cumin", "Coriander", "Green chilies", "Ghee", "Salt"],
          desc: "Whole wheat flatbread stuffed with spiced potatoes.",
          restaurantId: 2
        }
      ]
    },

    // 🍝 Italian
    {
      id: 3,
      title: "🍝 Italian",
      desc: "Classic comfort with fresh ingredients",
      image: "https://c.ndtvimg.com/2021-04/umk8i7ko_pasta_625x300_01_April_21.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=886",
      dishes: [
        {
          name: "Margherita Pizza",
          price: "$11.99",
          img: "https://uk.ooni.com/cdn/shop/articles/20220211142645-margherita-9920_e41233d5-dcec-461c-b07e-03245f031dfe.jpg?v=1737105431&width=1080",
          ingredients: ["Wheat dough", "Tomato sauce", "Mozzarella", "Basil", "Olive oil", "Salt", "Oregano"],
          desc: "Tomato, mozzarella, and fresh basil on wood-fired crust.",
          restaurantId: 3
        },
        {
          name: "Pepperoni Pizza",
          price: "$13.99",
          img: "https://www.moulinex-me.com/medias/?context=bWFzdGVyfHJvb3R8MTQzNTExfGltYWdlL2pwZWd8YUdObEwyaG1aQzh4TlRrMk9EWXlOVGM0TmpreE1DNXFjR2N8MmYwYzQ4YTg0MTgzNmVjYTZkMWZkZWZmMDdlMWFlMjRhOGIxMTQ2MTZkNDk4ZDU3ZjlkNDk2MzMzNDA5OWY3OA",
          ingredients: ["Wheat dough", "Tomato sauce", "Mozzarella", "Pepperoni slices", "Oregano", "Olive oil", "Garlic powder"],
          desc: "Classic pizza with spicy pepperoni and extra cheese.",
          restaurantId: 3
        },
        {
          name: "Fettuccine Alfredo",
          price: "$10.99",
          img: "https://www.thespruceeats.com/thmb/gTjo1gnOuBEVJsttgDW2JljvKY0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/shrimp-fettuccine-alfredo-recipe-5205738-hero-01-1a40571b0e3e4a17ab768b4d700c7836.jpg",
          ingredients: ["Fettuccine pasta", "Heavy cream", "Parmesan cheese", "Butter", "Black pepper", "Salt", "Parsley"],
          desc: "Flat noodles tossed in creamy parmesan sauce.",
          restaurantId: 3
        },
        {
          name: "Lasagna",
          price: "$12.49",
          img: "https://www.tasteofhome.com/wp-content/uploads/2025/07/Best-Lasagna_EXPS_ATBBZ25_36333_DR_07_01_2b.jpg",
          ingredients: ["Lasagna sheets", "Ground beef", "Tomato sauce", "Ricotta", "Mozzarella", "Parmesan", "Egg", "Herbs"],
          desc: "Layered pasta with meat, cheese, and marinara sauce.",
          restaurantId: 3
        },
        {
          name: "Risotto ai Funghi",
          price: "$13.99",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPurK1N5SWzwRjiLOQUl1Z2kZuk1dZpY7NGw&s",
          ingredients: ["Arborio rice", "Mushrooms", "White wine", "Onion", "Butter", "Parmesan", "Chicken stock", "Thyme"],
          desc: "Creamy arborio rice with wild mushrooms and white wine.",
          restaurantId: 3
        },
        {
          name: "Tiramisu",
          price: "$7.99",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAiXYrVVskpU9gwukqhF5k1vEhU0O7fx8TQA&s",
          ingredients: ["Ladyfingers", "Espresso", "Mascarpone", "Eggs", "Sugar", "Cocoa powder", "Marsala wine (optional)"],
          desc: "Coffee-soaked ladyfingers layered with mascarpone cream.",
          restaurantId: 3
        }
      ]
    },

    // 🥢 Chinese
    {
      id: 4,
      title: "🥢 Chinese",
      desc: "Bold flavors, fast and delicious",
      image: "https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/wlqenuza/a1ccb6d0-30e6-43eb-a599-d8e6e7d840d1.jpg",
      dishes: [
        {
          name: "Chilli Chicken",
          price: "$11.49",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYRAU0chNSkbAonV6exxfdoO8L0nJxQGU9fw&s",
          ingredients: ["Chicken", "Soy sauce", "Vinegar", "Green chilies", "Ginger", "Garlic", "Cornstarch", "Bell peppers"],
          desc: "Stir-fried chicken in sweet-spicy red sauce.",
          restaurantId: 4
        },
        {
          name: "Gobi Manchurian",
          price: "$9.99",
          img: "https://www.robinage.com/wp-content/uploads/2022/01/GOBI-MANCHURIAN.jpg",
          ingredients: ["Cauliflower", "Flour", "Cornstarch", "Soy sauce", "Chili sauce", "Ginger", "Garlic", "Spring onions"],
          desc: "Crispy cauliflower in savory Indo-Chinese sauce.",
          restaurantId: 4
        },
        {
          name: "Hakka Noodles",
          price: "$8.99",
          img: "https://www.ohmyveg.co.uk/wp-content/uploads/2024/08/hakka-noodles.jpg",
          ingredients: ["Noodles", "Soy sauce", "Vinegar", "Bell peppers", "Carrots", "Cabbage", "Garlic", "Chili sauce"],
          desc: "Stir-fried noodles with vegetables and soy sauce.",
          restaurantId: 4
        },
        {
          name: "Chicken Manchow Soup",
          price: "$5.99",
          img: "https://i0.wp.com/www.shanazrafiq.com/wp-content/uploads/2021/01/1-Chicken-Manchow-Soup-8.jpg?fit=1200%2C798&ssl=1",
          ingredients: ["Chicken", "Noodles", "Carrots", "Beans", "Cabbage", "Garlic", "Ginger", "Soy sauce", "Egg (optional)"],
          desc: "Spicy noodle soup with chicken and veggies.",
          restaurantId: 4
        },
        {
          name: "Spring Rolls",
          price: "$6.49",
          img: "https://i.ytimg.com/vi/hEQQGxS-ynY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDS9USsKg3YdT-6jJ3WNFNhl4-mWw",
          ingredients: ["Wrapper", "Cabbage", "Carrot", "Bean sprouts", "Onion", "Soy sauce", "Sesame oil", "Salt"],
          desc: "Crispy rolls filled with vegetables or chicken.",
          restaurantId: 4
        },
        {
          name: "Sweet & Sour Pork",
          price: "$11.99",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYD3wLT-s08bjLHhV8ihIldH-Jey_SETNXUQ&s",
          ingredients: ["Pork", "Bell peppers", "Pineapple", "Onion", "Vinegar", "Sugar", "Ketchup", "Cornstarch"],
          desc: "Tangy pork in glossy sweet and sour sauce.",
          restaurantId: 4
        }
      ]
    },

    // 🍱 Japanese
    {
      id: 5,
      title: "🍱 Japanese",
      desc: "Fresh, elegant, and balanced",
      image: "https://japanesetaste.com/cdn/shop/articles/chuka-ryori-chinese-food-in-japan-japanese-taste.jpg?v=1707913570&width=5760",
      dishes: [
        {
          name: "Salmon Sushi Roll",
          price: "$12.99",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9_iyijNgB1aanJc2byZ4txQ_hwI9RzSuqnA&s",
          ingredients: ["Sushi rice", "Raw salmon", "Nori", "Avocado", "Cucumber", "Rice vinegar", "Wasabi", "Soy sauce"],
          desc: "Fresh salmon, avocado, and cucumber roll.",
          restaurantId: 5
        },
        {
          name: "Beef Ramen",
          price: "$13.99",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa8tj_jsZx-z7l9PuzeESc7dLBpmvSvn8ymQ&s",
          ingredients: ["Ramen noodles", "Beef broth", "Chashu pork", "Boiled egg", "Nori", "Green onion", "Menma", "Sesame oil"],
          desc: "Noodles in rich broth with chashu pork and egg.",
          restaurantId: 5
        },
        {
          name: "Tempura Shrimp",
          price: "$10.99",
          img: "https://sudachirecipes.com/wp-content/uploads/2020/11/ebi-fry-sq.png",
          ingredients: ["Shrimp", "Flour", "Egg", "Ice water", "Baking powder", "Vegetable oil", "Tentsuyu dipping sauce"],
          desc: "Lightly battered shrimp with dipping sauce.",
          restaurantId: 5
        },
        {
          name: "Miso Soup",
          price: "$3.99",
          img: "https://www.allrecipes.com/thmb/jUDQQWFnYQIndbrSBMUQqVEngkA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-RM-13107-miso-soup-ddmfs-3x4-66171fe67e0546f6abf488075339fb13.jpg",
          ingredients: ["Dashi stock", "Miso paste", "Tofu", "Wakame seaweed", "Green onion", "Soy sauce", "Mirin"],
          desc: "Traditional fermented soybean soup with seaweed.",
          restaurantId: 5
        },
        {
          name: "Teriyaki Chicken",
          price: "$14.99",
          img: "https://img.taste.com.au/ZoXh6_qy/taste/2010/01/chicken-teriyaki-hero-199548-1.jpg",
          ingredients: ["Chicken", "Soy sauce", "Mirin", "Sugar", "Sake", "Garlic", "Ginger", "Sesame seeds"],
          desc: "Grilled chicken glazed with sweet teriyaki sauce.",
          restaurantId: 5
        },
        {
          name: "Edamame",
          price: "$4.49",
          img: "https://www.joyousapron.com/wp-content/uploads/2018/07/IMG_6495-v1-scaled.jpg",
          ingredients: ["Young soybeans", "Sea salt", "Water", "Optional: garlic"],
          desc: "Steamed soybeans sprinkled with sea salt.",
          restaurantId: 5
        }
      ]
    },

    // 🌮 Mexican
    {
      id: 6,
      title: "🌮 Mexican",
      desc: "Zesty, spicy, and full of life",
      image: "https://hips.hearstapps.com/hmg-prod/images/pozole-index-655b86b9eeb3f.jpg?crop=0.8891532031585555xw:1xh;center,top&resize=1200:*",
      dishes: [
        {
          name: "Chicken Tacos",
          price: "$9.99",
          img: "https://www.allrecipes.com/thmb/UuPQ632-v8TVuGv3kH7buxuO_mw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/242342-fiesta-slow-cooker-shredded-chicken-tacos-ddmfs-3X2-0902-775cf5010b5b46cdbdf2ca50993628a9.jpg",
          ingredients: ["Corn tortillas", "Grilled chicken", "Onion", "Cilantro", "Lime", "Salsa", "Guacamole", "Cheese"],
          desc: "Soft tortillas with grilled chicken and salsa.",
          restaurantId: 6
        },
        {
          name: "Cheese Quesadilla",
          price: "$7.99",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd7X6q1kD70tyYb4G-6yLUS4m5F9S96JUFTA&s",
          ingredients: ["Flour tortilla", "Mozzarella", "Cheddar", "Butter", "Optional: mushrooms, spinach"],
          desc: "Melted cheese between crispy tortillas.",
          restaurantId: 6
        },
        {
          name: "Nachos Grande",
          price: "$10.49",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOaqF1H3L0_cDDFqbPhN-Tm1IfAl7-BshZEg&s",
          ingredients: ["Tortilla chips", "Cheese", "Jalapeños", "Sour cream", "Guacamole", "Refried beans", "Lettuce"],
          desc: "Tortilla chips with cheese, jalapeños, sour cream.",
          restaurantId: 6
        },
        {
          name: "Guacamole",
          price: "$6.99",
          img: "https://www.garnishwithlemon.com/wp-content/uploads/2017/08/Pico-Guacamole-featured-image-2.jpg",
          ingredients: ["Avocado", "Lime juice", "Onion", "Tomato", "Cilantro", "Jalapeño", "Salt", "Garlic"],
          desc: "Fresh avocado dip with lime and cilantro.",
          restaurantId: 6
        },
        {
          name: "Burrito Bowl",
          price: "$11.99",
          img: "https://www.spendwithpennies.com/wp-content/uploads/2019/10/Chicken-Burrito-Bowl-SpendWithPennies-102.jpg",
          ingredients: ["Rice", "Black beans", "Grilled chicken", "Salsa", "Cheese", "Sour cream", "Guacamole", "Lettuce"],
          desc: "Rice, beans, chicken, salsa, and guac in a bowl.",
          restaurantId: 6
        },
        {
          name: "Elote (Mexican Corn)",
          price: "$5.49",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiGyJhvZf-FGofz2ONUE-6GY6PMn0fb9jGaQ&s",
          ingredients: ["Grilled corn", "Mayonnaise", "Chili powder", "Lime juice", "Cotija cheese", "Cilantro", "Salt"],
          desc: "Grilled corn with mayo, chili, lime, and cheese.",
          restaurantId: 6
        }
      ]
    }
  ];

  // Filter cuisines based on search
  const filteredCuisines = cuisines.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.dishes.some(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <Navbar />

      {/* Location & Search */}
      <section style={{
        padding: '2rem',
        background: '#fff8f8',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#e63946' }}>📍 {location}</h1>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{
            padding: '0.8rem',
            borderRadius: '10px',
            border: '1px solid #ddd',
            marginBottom: '1rem',
            width: '90%',
            maxWidth: '400px'
          }}
        >
          <option>Home</option>
          <option>Office</option>
          <option>Other</option>
        </select>

        <input
          type="text"
          placeholder="Search for cuisine or dish..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '90%',
            maxWidth: '500px',
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid #ddd',
            fontSize: '1rem',
            outline: 'none'
          }}
        />
      </section>

      {/* Cuisine Menu */}
      <section style={{
        padding: '3rem 2rem',
        background: 'white'
      }}>
        <h2 style={{
          fontSize: '2rem',
          color: '#e63946',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          🌍 Choose by Cuisine
        </h2>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center'
        }}>
          {filteredCuisines.map(cuisine => (
            <div
              key={cuisine.id}
              onClick={() => setSelectedCuisine(cuisine)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: '#fdf4f4',
                borderRadius: '12px',
                cursor: 'pointer',
                width: '90%',
                maxWidth: '600px',
                transition: 'transform 0.2s'
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img
                src={cuisine.image}
                alt={cuisine.title}
                style={{
                  width: '60px',
                  height: '60px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
              <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>{cuisine.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Dish List Modal */}
      {selectedCuisine && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '80vh',
            overflowY: 'auto',
            borderRadius: '15px',
            padding: '2rem'
          }}>
            <button
              onClick={() => setSelectedCuisine(null)}
              style={{
                background: '#e63946',
                color: 'white',
                border: 'none',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                float: 'right',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
            <h2>{selectedCuisine.title}</h2>
            <p>{selectedCuisine.desc}</p>

            <div style={{ marginTop: '2rem' }}>
              {selectedCuisine.dishes.map(dish => {
                const restaurant = restaurantMap[dish.restaurantId];
                return (
                  <div
                    key={dish.name}
                    onClick={() => setSelectedDish({ ...dish, restaurant })}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      padding: '1rem',
                      borderBottom: '1px solid #eee',
                      cursor: 'pointer'
                    }}
                  >
                    <img
                      src={dish.img}
                      alt={dish.name}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4>{dish.name}</h4>
                      <p style={{ color: '#e63946', fontWeight: 'bold' }}>{dish.price}</p>
                      <p style={{ fontSize: '0.9rem', color: '#555' }}>
                        🏪 {restaurant.name} · 📍 {restaurant.distance.toFixed(1)} km away
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Dish Details Modal */}
      {selectedDish && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '85vh',
            overflowY: 'auto',
            borderRadius: '15px',
            padding: '2rem'
          }}>
            <button
              onClick={() => setSelectedDish(null)}
              style={{
                background: '#e63946',
                color: 'white',
                border: 'none',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                float: 'right',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>

            <img
              src={selectedDish.img}
              alt={selectedDish.name}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '12px',
                marginBottom: '1rem'
              }}
            />

            <h2>{selectedDish.name}</h2>
            <p><strong>Price:</strong> {selectedDish.price}</p>
            <p><strong>From:</strong> {selectedDish.restaurant.name}</p>
            <p><strong>Distance:</strong> {selectedDish.restaurant.distance.toFixed(1)} km</p>

            <h3 style={{ color: '#e63946', marginTop: '1rem' }}>🧾 Ingredients:</h3>
            <ul style={{ textAlign: 'left', marginLeft: '1rem' }}>
              {selectedDish.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
<button
  onClick={() => {
    const message = prompt(
      `Write about the issue with "${selectedDish.name}":\n(e.g., missing ingredients, wrong item, damaged packaging)`,
      ""
    );
    if (message && message.trim()) {
      alert(`✅ Your report has been sent!\n\n"${message}"`);
      console.log("Issue reported:", {
        dish: selectedDish.name,
        restaurant: selectedDish.restaurant.name,
        message,
        timestamp: new Date().toLocaleString()
      });
    }
  }}
  style={{
    marginTop: '1rem',
    padding: '0.8rem',
    background: '#ff6b6b',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%'
  }}
>
  📢 Report an Issue
</button>

            {/* Add to Cart */}
            <button
              onClick={() => {
                addToCart(selectedDish);
                alert(`${selectedDish.name} added to cart!`);
              }}
              style={{
                marginTop: '1rem',
                padding: '0.8rem',
                background: '#e63946',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              ➕ Add to Cart
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Home;