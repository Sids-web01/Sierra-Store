const navLinks = document.querySelectorAll('header nav a')
const logo = document.querySelector('.logo')

const sections = document.querySelectorAll('section')
const menuicon = document.querySelector('#menu-icon')
const navbar = document.querySelector('header nav')

menuicon.addEventListener('click', () => {
    menuicon.classList.toggle('bx-x')
    navbar.classList.toggle('active')
})

const activiepage = () => {
    const header = document.querySelector('header')
    const barsbox = document.querySelector('.bars-box')

    header.classList.remove('active')
    setTimeout(() => {
        header.classList.add('active')
    }, 1100)




    navLinks.forEach(link => {
        link.classList.remove('active')
    })

    barsbox.classList.remove('active')
    setTimeout(() => {
        barsbox.classList.add('active')
    }, 1100)

    sections.forEach(section => {
        section.classList.remove('active')
    })
    menuicon.classList.remove('bx-x')
    navbar.classList.remove('active')
}

navLinks.forEach((link, idx) => {
    link.addEventListener('click', () => {
        if (!link.classList.contains('active')) {
            activiepage()

            link.classList.add('active')

            setTimeout(() => {
                sections[idx].classList.add('active')

            }, 1100)


        }
    })
})

logo.addEventListener('click', () => {
    if (!navLinks[0].classList.contains('active')) {
        activiepage()

        navLinks[0].classList.add('active')
        setTimeout(() => {
            sections[0].classList.add('active')

        }, 1100)
    }
})
const resumebtns = document.querySelectorAll('.resume-btn')

resumebtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        const resumeDetails = document.querySelectorAll('.resume-detail')

        resumebtns.forEach(btn => {
            btn.classList.remove('active')
        })
        btn.classList.add('active')

        resumeDetails.forEach(detail => {
            detail.classList.remove('active')
        })
        resumeDetails[idx].classList.add('active')

    })
})



const goToMenuBtn = document.querySelector('#check-btn');

// New button functionality to go to the Menu section
goToMenuBtn.addEventListener('click', () => {
    activiepage()  // Call the existing function to reset the active states

    // Find the Menu section and add the 'active' class to it
    const targetSection = document.querySelector('#order-section')
    targetSection.classList.add('active')

    // Optionally, make the button active if you want
    goToMenuBtn.classList.add('active')
})


const goToMenuBtn2 = document.querySelector('#homeBtn');

// New button functionality to go to the Menu section
goToMenuBtn2.addEventListener('click', () => {
    activiepage()  // Call the existing function to reset the active states

    // Find the Menu section and add the 'active' class to it
    const targetSection = document.querySelector('#products-section')
    targetSection.classList.add('active')

    // Optionally, make the button active if you want
    goToMenuBtn2.classList.add('active')
})


fetch('https://script.google.com/macros/s/AKfycbxNdIQnMfuQ4WitB5sPgf3rmpO9YTWELicCV8hN62tQ4cU7maW2je11CpeN_rS3tFcsLQ/exec')
  .then(response => response.json())
  .then(data => {
    // Reference to the products container (where products will be displayed)
    const productsContainer = document.querySelector('.product-box');
    
    console.log('Fetched products:', data);  // Log the fetched products data

    // Loop through fetched product data and create product cards
    data.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card', product.category); // Add category class (optional)
      
      // If imageURL is empty, use a fallback image or placeholder
      const imageURL = product.imageURL ? convertGoogleDriveUrlToDirectImageUrl(product.imageURL) : 'path/to/your/placeholder-image.jpg';  // Replace with actual fallback image path
      console.log('Converted image URL:', imageURL);  // Log the converted image URL
      
      
      // Product card HTML structure
      productCard.innerHTML = `
        <img src="${imageURL}" alt="${product.name}">
        <h2>${product.name}</h2>
        <h2>Price: ${product.price} le</h2>
        <p>${product.description}</p>
        <button class="add-to-cart" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
      `;
      
      // Append the card to the container
      productsContainer.appendChild(productCard);
    });

    // Add event listeners for the Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseInt(button.getAttribute('data-price'));
        
        // Add to cart logic
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
          existingItem.quantity += 1;
          existingItem.totalPrice += price;
        } else {
          cart.push({ name, price, quantity: 1, totalPrice: price });
        }

        total += price;
        cartCount++; // ⬅️ Update the count
        cartIndicator.textContent = cartCount; // ⬅️ Show it
        updateCart();
      });
    });

    // Filter and search functionality remains the same...
    // ...

  })
  .catch(error => {
    console.error('Error fetching product data:', error);
  });

// Function to convert Google Drive URL to direct image URL
function convertGoogleDriveUrlToDirectImageUrl(url) {
  console.log('Original image URL:', url);  // Log the original URL

  // Regular expression to extract the file ID from the Google Drive URL
  const regex = /\/d\/(.*)\/view/;
  const match = url.match(regex);

  // If the URL matches the expected pattern, return the thumbnail image URL
  if (match && match[1]) {
    const convertedUrl = `https://drive.google.com/thumbnail?id=${match[1]}`;
    console.log('Converted Google Drive image URL:', convertedUrl);  // Log the converted URL
    return convertedUrl;
  }
  
  // If it's not a valid Google Drive URL, log and return the original URL
  console.log('Invalid Google Drive URL, returning original:', url);
  return url;
}





// order to whatapps js
// Function to collect order details from the table
function collectOrderDetails() {
    const tableRows = document.querySelectorAll('#cart-items tr');
    let orderDetails = '🛒 *Order Summary:*\n\n';
  
    if (tableRows.length === 0) {
        alert("Your cart is empty! Please add items before ordering.");
        return null; // Stop execution if no items in cart
    }
  
    tableRows.forEach(row => {
        const itemName = row.cells[0]?.innerText || "Unknown Item";
        const itemQuantity = row.cells[1]?.innerText || "1";
        const itemPrice = row.cells[2]?.innerText || "0";
        orderDetails += `*${itemName}* - ${itemQuantity} x ${itemPrice}\n`;
    });
  
    // Get user details
    const userName = document.querySelector('#user-name').value.trim();
    const userPhone = document.querySelector('#user-number').value.trim();
    const userAddress = document.querySelector('#user-address').value.trim();
  
    if (!userName || !userPhone || !userAddress) {
        alert("Please fill in all required fields (Name, Phone, Address).");
        return null; // Stop execution if user details are missing
    }
  
    // Add user details
    orderDetails += `\n👤 *Customer Name:* ${userName}\n📞 *Phone:* ${userPhone}\n🏠 *Address:* ${userAddress}`;
  
    // Add pricing details
    const totalPrice = document.querySelector('#total-price')?.innerText || "Total: Le 0";
    const deliveryFee = document.querySelector('#delivery-fee')?.innerText || "Delivery Fee: Le 0";
    const finalTotal = document.querySelector('#final-total')?.innerText || "Final Total: Le 0";
  
    orderDetails += `\n\n💰 ${totalPrice}\n🚚 ${deliveryFee}\n💵 ${finalTotal}`;
  
    return orderDetails;
  }
  
  // Function to send the order via WhatsApp
  function handleOrderNow() {
    const orderMessage = collectOrderDetails();
    if (!orderMessage) return; // Stop if order details are null
  
    const phoneNumber = '23279728028'; // Change to your restaurant's WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(orderMessage)}`;
  
    window.open(whatsappUrl, '_blank');
  }
  
  // Attach function to the "Order Now" button
  document.querySelector('#order-now-btn').addEventListener('click', handleOrderNow);


  
    // menu cart system
 let cart = [];
 let total = 0;
 const deliveryFee = 5;
 
 document.querySelectorAll('.add-to-cart').forEach(button => {
   button.addEventListener('click', () => {
     const name = button.getAttribute('data-name');
     const price = parseInt(button.getAttribute('data-price'));
     
     // Check if item already exists in cart
     const existingItem = cart.find(item => item.name === name);
     if (existingItem) {
       existingItem.quantity += 1;
       existingItem.totalPrice += price;
     } else {
       cart.push({ name, price, quantity: 1, totalPrice: price });
     }
 
     total += price;
     updateCart();
   });
 });
 
 function updateCart() {
   const cartItems = document.getElementById('cart-items');
   cartItems.innerHTML = ''; // Clear current cart
 
   cart.forEach(item => {
     const tr = document.createElement('tr');
     tr.innerHTML = `
       <td>${item.name}</td>
       <td>${item.quantity}</td>
       <td>Le ${item.totalPrice}</td>
     `;
     cartItems.appendChild(tr);
   });
 
   // Update total and final total (with delivery fee)
   const finalTotal = total + deliveryFee;
   document.getElementById('total-price').textContent = `Total: Le ${total}`;
   document.getElementById('final-total').textContent = `Final Total: Le ${finalTotal}`;
 }


 


 
 //other menu js
 const cartIndicator = document.querySelector('.cart-indicator');
 const addToCartButtons = document.querySelectorAll('.add-to-cart');
 const searchInput = document.getElementById('search');
 const ElectronicsFilterBtn = document.getElementById('btn1');
 const FashionFilterBtn = document.getElementById('btn2');
 const menuResults = document.getElementById('menu-results');
 
 let cartCount = 0;
 
 // Add to cart functionality
 addToCartButtons.forEach(button => {
   button.addEventListener('click', function() {
     cartCount++;
     cartIndicator.textContent = cartCount;
     
   });
 });



// Products data for the slider
const products = [
  { name: "Smartphone X1", desc: "Latest 5G phone with stunning display.", price: "Le 3,200", img: "red headset.png" },
  { name: "Laptop Pro", desc: "High performance for work and play.", price: "Le 6,500", img: "black headset.jpeg" },
  { name: "Running Shoes", desc: "Comfortable and durable for athletes.", price: "Le 850", img: "blue headset.jpeg" },
  { name: "Blender Max", desc: "Perfect for smoothies and more.", price: "Le 420", img: "blue headset.jpeg" },
  { name: "LED TV", desc: "Crystal-clear viewing experience.", price: "Le 4,300", img: "IMG-20250122-WA0007.jpg" },
  { name: "Men's Watch", desc: "Ironing Clothes have never been better.", price: "Le 1,100", img: "iron.jpeg" },
  { name: "Headphones", desc: "Clear sound and long battery.", price: "Le 600", img: "headphone.jpg" }
];

let current = 0;

// Function to update product content dynamically
function showProduct(index) {
  const product = products[index];
  
  // Update product info
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-desc").textContent = product.desc;
  document.getElementById("product-price").textContent = product.price;

  // Update product image
  document.getElementById("product-img").src = product.img;
  document.getElementById("product-img").alt = product.name;
}

// Function to move to the next slide
function nextSlide() {
  current = (current + 1) % products.length;
  showProduct(current);
}

// Function to move to the previous slide
function prevSlide() {
  current = (current - 1 + products.length) % products.length;
  showProduct(current);
}

// Auto-slide every 5 seconds
setInterval(nextSlide, 5000);
showProduct(current); // Initialize the first product