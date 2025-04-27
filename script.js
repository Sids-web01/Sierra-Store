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


     // Search functionality
const searchInput = document.getElementById('search'); // Reference to the search input
// Reference to the container where products are displayed

// Function to filter products based on the search query
function filterProducts(query) {
 const productCards = document.querySelectorAll('.product-card'); // Get all product cards

 productCards.forEach(card => {
   const productName = card.querySelector('h2').innerText.toLowerCase(); // Get the product name
   if (productName.includes(query.toLowerCase())) {
     card.style.display = 'flex'; // Show product if it matches the query
   } else {
     card.style.display = 'none'; // Hide product if it doesn't match
   }
 });
}

// Add event listener to search input to trigger filtering
searchInput.addEventListener('input', function() {
 const query = searchInput.value; // Get the current input value
 filterProducts(query); // Call the filter function with the query
});

   

   



   // Filter functionality
   const filterButtons = document.querySelectorAll('.filter-btn');
   const productCards = document.querySelectorAll('.product-card');

   filterButtons.forEach(button => {
     button.addEventListener('click', () => {
       // Remove active class from all buttons
       filterButtons.forEach(btn => btn.classList.remove('active'));
       button.classList.add('active');

       const filter = button.getAttribute('data-filter');

       productCards.forEach(card => {
         if (filter === 'all') {
           card.classList.remove('hidden');
         } else {
           card.classList.toggle('hidden', !card.classList.contains(filter));
         }
       });
     });
   });
 })


    

    

    

    // Filter and search functionality remains the same...
    // ...

  
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



 
  // === PRODUCTS FOR SLIDER ===
  const sliderProducts = [
    {
      name: "T Shirt",
      description: "This is product 1 description.",
      price: 100,
      image: "t shirt.jpeg"
    },
    {
      name: "Sneakers",
      description: "This is product 2 description.",
      price: 200,
      image: "sneakers.jpg"
    },
    {
      name: "Wireless Headphones",
      description: "This is product 3 description.",
      price: 300,
      image: "wireless headphones.jpeg"
    }
  ];
  
  let currentSlide = 0;
  
  // === UPDATE SLIDER DISPLAY ===
  function showSlide(index) {
    const product = sliderProducts[index];
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-price').textContent = `Le ${product.price}`;
    document.getElementById('product-image').src = product.image;
  
    // Set data attributes on the button (important for your cart system)
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    addToCartBtn.setAttribute('data-name', product.name);
    addToCartBtn.setAttribute('data-price', product.price);
  }
  
  // === SLIDE CONTROLS ===
  function nextSlide() {
    currentSlide = (currentSlide + 1) % sliderProducts.length;
    showSlide(currentSlide);
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + sliderProducts.length) % sliderProducts.length;
    showSlide(currentSlide);
  }
  
  // === AUTO SLIDE EVERY 5 SECONDS ===
  setInterval(nextSlide, 5000);
  
  // === INITIAL LOAD ===
  showSlide(currentSlide);
  
  // === RECONNECT TO YOUR EXISTING CART SYSTEM ===
  document.getElementById('add-to-cart-btn').addEventListener('click', function() {
    const name = this.getAttribute('data-name');
    const price = parseInt(this.getAttribute('data-price'));
   
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.totalPrice += price;
    } else {
      cart.push({ name, price, quantity: 1, totalPrice: price });
    }
   
    updateCart();
  });