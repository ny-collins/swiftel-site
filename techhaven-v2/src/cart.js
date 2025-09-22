// src/cart.js

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() { localStorage.setItem("cart", JSON.stringify(cart)); }

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast bg-secondary text-white font-semibold py-3 px-5 rounded-lg shadow-lg dark:bg-light dark:text-secondary';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => { toast.remove(); }, 3000);
}

export function updateCartCountDisplay() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll(".cart-count").forEach((el) => { el.textContent = count; });
}

export function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  updateCartCountDisplay();
  showToast(`${product.name} added to cart!`);
}

function adjustQuantity(index, amount) {
    if (cart[index]) {
        cart[index].quantity += amount;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        saveCart();
        renderCartPage();
        updateCartCountDisplay();
    }
}

export function renderCartPage() {
  const cartContent = document.getElementById("cart-content");
  const cartEmptyMsg = document.getElementById("cart-empty");
  if (!cartContent || !cartEmptyMsg) return;

  if (cart.length === 0) {
    cartContent.classList.add("hidden");
    cartEmptyMsg.classList.remove("hidden");
    return;
  }

  cartContent.classList.remove("hidden");
  cartEmptyMsg.classList.add("hidden");

  const cartItemsContainer = document.getElementById("cart-items");
  const summarySubtotal = document.getElementById("summary-subtotal");
  const summaryTotal = document.getElementById("summary-total");
  
  let subtotal = 0;
  cartItemsContainer.innerHTML = ""; 

  cart.forEach((item, index) => {
    const priceNumber = parseInt(item.price.replace(/[^\d]/g, ""));
    const itemTotal = priceNumber * item.quantity;
    subtotal += itemTotal;

    const itemEl = document.createElement("div");
    itemEl.className = "flex items-center bg-white dark:bg-gray-900 p-4 rounded-lg border border-indigo-100 dark:border-gray-800 text-sm";
    itemEl.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md mr-4">
      <div class="flex-grow">
        <h3 class="font-bold text-base text-secondary dark:text-white">${item.name}</h3>
        <p class="text-gray-500 dark:text-gray-400">${item.price}</p>
      </div>
      <div class="flex flex-col items-end space-y-2">
          <p class="font-bold dark:text-white text-base">KES ${itemTotal.toLocaleString()}</p>
          <div class="flex items-center space-x-3">
              <button class="quantity-btn decrease-btn" data-index="${index}" aria-label="Decrease quantity">-</button>
              <span class="font-semibold w-8 text-center dark:text-white">${item.quantity}</span>
              <button class="quantity-btn increase-btn" data-index="${index}" aria-label="Increase quantity">+</button>
          </div>
          <button class="remove-btn text-xs text-red-500 hover:text-red-700" data-index="${index}">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(itemEl);
  });

  summarySubtotal.textContent = `KES ${subtotal.toLocaleString()}`;
  summaryTotal.textContent = `KES ${subtotal.toLocaleString()}`;

  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.dataset.index);
      cart.splice(index, 1);
      saveCart();
      renderCartPage();
      updateCartCountDisplay();
    });
  });

  document.querySelectorAll('.decrease-btn').forEach(btn => {
      btn.addEventListener('click', () => adjustQuantity(parseInt(btn.dataset.index), -1));
  });
  document.querySelectorAll('.increase-btn').forEach(btn => {
      btn.addEventListener('click', () => adjustQuantity(parseInt(btn.dataset.index), 1));
  });
}
