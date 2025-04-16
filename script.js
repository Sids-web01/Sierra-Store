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
    const targetSection = document.querySelector('#contactsection')
    targetSection.classList.add('active')

    // Optionally, make the button active if you want
    goToMenuBtn2.classList.add('active')
})

// Select your 'Go to Order' button

// Fetch product data from Google Sheets
fetch('https://script.google.com/macros/s/AKfycbykA3wd911bDzp_3RWAdM7CCg3ewFHtkhKEWhJIrtnpDGey1Uhjok31sYSFEZd-lz0TkA/exec')
  .then(response => response.json())
  .then(data => {
    // Reference to the products container (where products will be displayed)
    const productsContainer = document.querySelector('.product-box');
    
    // Loop through fetched product data and create product cards
    data.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card', product.category); // Add category class (optional)
      
      // Product card HTML structure
      productCard.innerHTML = `
        <img src="${product.imageURL}" alt="${product.name}">
        <h2>${product.name}</h2>
        <h2>Price: ${product.price} le</h2>
        <p>${product.description}</p>
        <button class="add-to-cart" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
      `;
      
      // Append the card to the container
      productsContainer.appendChild(productCard);
    });
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

    
    

    // Add event listeners to new Add to Cart buttons dynamically created
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
  .catch(error => {
    console.error('Error fetching product data:', error);
  });





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
        orderDetails += `🍔 *${itemName}* - ${itemQuantity} x ${itemPrice}\n`;
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






