// src/ui.js

const testimonials = [ { name: 'Mercy K.', role: 'Entrepreneur, Nairobi', text: 'I honestly didn’t expect the experience to be this smooth. The next-day delivery was shockingly fast!', avatar: '/assets/images/avatar1.jpg' }, { name: 'Brian O.', role: 'Software Engineer, Kisumu', text: 'The smartwatch I got is now glued to my wrist. The process was seamless and the product came with a thoughtful thank-you card.', avatar: '/assets/images/avatar2.jpg' }, { name: 'Fatuma A.', role: 'Student, Eldoret', text: 'My second time buying from TechHaven and I just had to drop a review. They included a YouTube tutorial link for the drone I bought!', avatar: '/assets/images/avatar3.jpg' } ];
const faqs = [ { q: 'How long does shipping take?', a: 'We deliver most orders within 1–3 business days, depending on your location. You’ll receive a tracking link immediately after dispatch.' }, { q: 'Do you offer warranty on gadgets?', a: 'Yes! All our gadgets come with a 12-month manufacturer warranty and an optional extended TechHaven warranty add-on.' }, { q: 'Can I return or exchange a product?', a: 'Absolutely. We have a 7-day return window and offer free returns for damaged or defective gadgets. Exchanges are processed instantly.' }, { q: 'What payment methods do you support?', a: 'We accept M-Pesa, Airtel Money, debit/credit cards, and bank transfers. You can also pay on delivery in select regions.' } ];

function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    if (!themeToggle || !htmlEl) return;
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlEl.classList.add('dark');
    } else {
        htmlEl.classList.remove('dark');
    }
    themeToggle.addEventListener('click', () => {
        htmlEl.classList.toggle('dark');
        localStorage.setItem('theme', htmlEl.classList.contains('dark') ? 'dark' : 'light');
    });
}

function initializeMobileMenu() {
    const menuButton = document.getElementById('hamburger-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const backdrop = document.getElementById('mobile-menu-backdrop');
    if (!menuButton || !mobileMenu || !backdrop) return;
    const menuLinks = mobileMenu.querySelectorAll('a');
    const toggleMenu = () => {
        menuButton.classList.toggle('active');
        mobileMenu.classList.toggle('translate-x-full');
        backdrop.classList.toggle('hidden');
        document.body.classList.toggle('overflow-hidden');
    };
    menuButton.addEventListener('click', toggleMenu);
    backdrop.addEventListener('click', toggleMenu);
    menuLinks.forEach(link => link.addEventListener('click', toggleMenu));
}

function handleImageLoading(container) {
    const images = container.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.onload = () => {
            img.parentElement.classList.remove('skeleton');
            img.classList.remove('opacity-0');
        };
        img.src = img.dataset.src; // Start loading the image
    });
}

function renderTestimonials() {
    const container = document.getElementById('testimonial-container');
    if (!container) return;
    container.innerHTML = testimonials.map(t => `
        <div class="border border-indigo-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-secondary">
            <p class="text-gray-600 dark:text-gray-300 mb-6">"${t.text}"</p>
            <div class="flex items-center">
                <div class="w-12 h-12 rounded-full mr-4 skeleton">
                    <img data-src="${t.avatar}" alt="${t.name}" class="w-12 h-12 rounded-full object-cover opacity-0 transition-opacity duration-500">
                </div>
                <div><p class="font-bold text-secondary dark:text-white">${t.name}</p><p class="text-sm text-gray-500 dark:text-gray-400">${t.role}</p></div>
            </div>
        </div>
    `).join('');
    handleImageLoading(container);
}

function renderFaqs() {
    const container = document.querySelector('.faq-items');
    if (!container) return;
    container.innerHTML = faqs.map(f => `
        <div class="faq-item border-b border-indigo-200 dark:border-gray-800 py-4">
            <button class="faq-question w-full flex justify-between items-center text-left text-secondary dark:text-white">
                <span class="font-semibold text-lg">${f.q}</span>
                <span class="transform transition-transform duration-300 text-primary"><i data-lucide="chevron-down" class="w-5 h-5"></i></span>
            </button>
            <div class="faq-answer max-h-0 overflow-hidden transition-all duration-500 ease-in-out"><p class="pt-4 text-gray-600 dark:text-gray-400">${f.a}</p></div>
        </div>
    `).join('');
    lucide.createIcons();
    container.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const answer = btn.nextElementSibling;
            const icon = btn.querySelector('span.transform');
            const isOpening = !answer.style.maxHeight;
            container.querySelectorAll('.faq-answer').forEach(otherAnswer => {
                otherAnswer.style.maxHeight = null;
                otherAnswer.previousElementSibling.querySelector('span.transform').classList.remove('rotate-180');
            });
            if (isOpening) {
                answer.style.maxHeight = answer.scrollHeight + "px";
                icon.classList.add('rotate-180');
}
        });
    });
}

export function initializeUI() {
    lucide.createIcons();
    initializeTheme();
    initializeMobileMenu();
    const yearEl = document.getElementById('year');
    if(yearEl) { yearEl.textContent = new Date().getFullYear(); }
    renderTestimonials();
    renderFaqs();
}
