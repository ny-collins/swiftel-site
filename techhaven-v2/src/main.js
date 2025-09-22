// src/main.js
import './index.css';
import { products } from './products.js';
import { addToCart, updateCartCountDisplay, renderCartPage } from './cart.js';
import { initializeUI } from './ui.js';

function handleImageLoading(container) {
    const images = container.querySelectorAll('img[data-src]');
    images.forEach(img => {
        // If image is already loaded in cache, it might not fire 'onload'
        if (img.complete) {
            img.parentElement.classList.remove('skeleton');
            img.classList.remove('opacity-0');
        } else {
            img.onload = () => {
                img.parentElement.classList.remove('skeleton');
                img.classList.remove('opacity-0');
            };
        }
        img.src = img.dataset.src; // Start loading the image
    });
}

function renderProducts(productsToRender, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (productsToRender.length === 0) {
      container.innerHTML = `<p class="text-gray-500 dark:text-gray-400 col-span-full text-center">No products found matching your criteria.</p>`;
      return;
  }
  container.innerHTML = productsToRender.map(product => `
    <div class="product-card w-3/4 sm:w-1/2 md:w-full flex-shrink-0 snap-center md:flex-shrink-1 border border-indigo-200 dark:border-gray-800 rounded-lg overflow-hidden group transition-shadow duration-300 hover:shadow-xl bg-white dark:bg-gray-900" data-id="${product.id}">
      <div class="w-full h-56 skeleton">
        <img data-src="${product.image}" alt="${product.name}" class="w-full h-full object-cover opacity-0 transition-opacity duration-500">
      </div>
      <div class="p-5 text-center flex flex-col items-center flex-grow">
        <h3 class="text-lg font-bold text-secondary dark:text-white group-hover:text-primary transition-colors flex-grow">${product.name}</h3>
        <p class="text-gray-500 dark:text-gray-400 mt-1">${product.price}</p>
        <button class="add-to-cart-btn w-full mt-4 bg-white dark:bg-gray-900 text-primary border-2 border-primary font-semibold py-2 rounded-lg hover:bg-primary hover:text-white dark:hover:text-white transition-colors duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  `).join('');
  
  handleImageLoading(container);
  lucide.createIcons();
}

function attachAddToCartListeners() {
    document.body.addEventListener('click', (e) => {
        if (e.target.closest('.add-to-cart-btn')) {
            const btn = e.target.closest('.add-to-cart-btn');
            const card = btn.closest('.product-card');
            if (!card || btn.disabled) return;
            const productId = parseInt(card.dataset.id);
            const product = products.find(p => p.id === productId);

            if (product) {
                addToCart(product);
                const originalText = 'Add to Cart';
                btn.innerHTML = `<i data-lucide="check" class="w-5 h-5 mx-auto"></i>`;
                btn.classList.add('bg-accent', 'text-white', 'border-accent');
                btn.disabled = true;
                lucide.createIcons();
                setTimeout(() => {
                  btn.innerHTML = originalText;
                  btn.classList.remove('bg-accent', 'text-white', 'border-accent');
                  btn.disabled = false;
                }, 2000);
            }
        }
    });
}

function initializeHomepage() {
    const container = document.getElementById('product-categories-container');
    if (!container) return;
    const categories = [...new Set(products.map(p => p.category))];
    container.innerHTML = categories.map(category => {
        const productsInCategory = products.filter(p => p.category === category);
        return `
            <div>
                <h3 class="text-2xl font-bold text-secondary dark:text-white mb-6">${category}</h3>
                <div id="carousel-${category.replace(/\s+/g, '-')}" class="products-grid custom-scrollbar flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 -mx-6 px-6 md:mx-0 md:px-0">
                    ${productsInCategory.map(product => `
                        <div class="product-card w-3/4 sm:w-1/2 md:w-full flex-shrink-0 snap-center md:flex-shrink-1 border border-indigo-200 dark:border-gray-800 rounded-lg overflow-hidden group transition-shadow duration-300 hover:shadow-xl bg-white dark:bg-gray-900" data-id="${product.id}">
                            <div class="w-full h-56 skeleton"><img data-src="${product.image}" alt="${product.name}" class="w-full h-full object-cover opacity-0 transition-opacity duration-500"></div>
                            <div class="p-5 text-center flex flex-col items-center flex-grow"><h3 class="text-lg font-bold text-secondary dark:text-white group-hover:text-primary transition-colors flex-grow">${product.name}</h3><p class="text-gray-500 dark:text-gray-400 mt-1">${product.price}</p>
                                <button class="add-to-cart-btn w-full mt-4 bg-white dark:bg-gray-900 text-primary border-2 border-primary font-semibold py-2 rounded-lg hover:bg-primary hover:text-white dark:hover:text-white transition-colors duration-300">
                                Add to Cart
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
    handleImageLoading(container);
}

function initializeProductsPage() {
    const gridContainer = document.getElementById('all-products-grid');
    const filtersContainer = document.getElementById('category-filters');
    if (!gridContainer || !filtersContainer) return;

    const categories = ['All', ...new Set(products.map(p => p.category))];
    
    filtersContainer.innerHTML = categories.map(category => `
        <label class="flex items-center space-x-3 cursor-pointer">
            <input type="checkbox" name="category" value="${category}" class="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary" ${category === 'All' ? 'checked' : ''}>
            <span class="dark:text-gray-300">${category}</span>
        </label>
    `).join('');

    const checkboxes = filtersContainer.querySelectorAll('input[name="category"]');
    const allCheckbox = filtersContainer.querySelector('input[value="All"]');

    const renderFilteredProducts = () => {
        const checkedCategories = [...checkboxes].filter(cb => cb.checked && cb.value !== 'All').map(cb => cb.value);
        let filteredProducts = products;
        if (checkedCategories.length > 0) {
            filteredProducts = products.filter(p => checkedCategories.includes(p.category));
        }
        renderProducts(filteredProducts, 'all-products-grid');
    };

    filtersContainer.addEventListener('change', (e) => {
        const clickedCheckbox = e.target;
        if (clickedCheckbox.name !== 'category') return;

        const isChecking = clickedCheckbox.checked;
        const isAllBox = clickedCheckbox.value === 'All';

        if (isAllBox && isChecking) {
            checkboxes.forEach(cb => cb.checked = true);
        } else if (!isAllBox && !isChecking) {
            const anyOtherChecked = [...checkboxes].some(cb => cb.value !== 'All' && cb.checked);
            if (!anyOtherChecked) {
                allCheckbox.checked = true;
            }
        } else if (!isAllBox && isChecking) {
            allCheckbox.checked = false;
        }
        
        renderFilteredProducts();
    });

    renderFilteredProducts();
}

document.addEventListener('DOMContentLoaded', () => {
  initializeUI();
  updateCartCountDisplay();
  attachAddToCartListeners();
  
  if (document.getElementById('product-categories-container')) { initializeHomepage(); }
  if (document.getElementById('cart-page-container')) { renderCartPage(); }
  if (document.getElementById('all-products-grid')) { initializeProductsPage(); }
});
