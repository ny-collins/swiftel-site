document.addEventListener("DOMContentLoaded", () => {
    // Add a body class if the page has a hero section, for navbar styling
    if (document.querySelector(".hero")) {
        document.body.classList.add("hero-page");
    }

    // Initialize AOS (Animate on Scroll)
    AOS.init({
        easing: 'ease-in-out',
        once: true,
        duration: 800
    });

    // Handle Navbar scroll behavior
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check on load
    }

    // --- Hamburger Menu & Sidebar Logic ---
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const sidebarOverlay = document.querySelector(".sidebar-overlay");
    if (hamburger && navMenu && sidebarOverlay) {
        const toggleMenu = () => {
            const isActive = hamburger.classList.toggle("active");
            navMenu.classList.toggle("active", isActive);
            sidebarOverlay.classList.toggle("active", isActive);
            document.body.classList.toggle("sidebar-active", isActive);
        };

        hamburger.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        sidebarOverlay.addEventListener('click', toggleMenu);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    // --- Coverage Checker Logic ---
    const coverageForm = document.getElementById("coverage-form");
    if (coverageForm) {
        coverageForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const select = document.getElementById("subcounty-select");
            const resultDiv = document.getElementById("coverage-result");
            const selectedValue = select.value;

            resultDiv.textContent = "";
            resultDiv.classList.remove("success", "error");

            if (selectedValue === "kasarani" || selectedValue === "njiru") {
                resultDiv.textContent = `Great news! Swiftel Fibre is available in ${select.options[select.selectedIndex].text}.`;
                resultDiv.classList.add("success");
            } else if (selectedValue === "other") {
                resultDiv.textContent = "Sorry, we're not in your area yet, but we're expanding soon!";
                resultDiv.classList.add("error");
            }
        });
    }
    
    // --- Plan Toggler Logic ---
    const planToggleButtons = document.querySelectorAll(".toggle-btn");
    if (planToggleButtons.length > 0) {
        const residentialPlans = document.querySelector(".plans-grid.residential");
        const businessPlans = document.querySelector(".plans-grid.business");

        planToggleButtons.forEach(button => {
            button.addEventListener("click", () => {
                const planType = button.getAttribute("data-plan");

                planToggleButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                if (planType === 'residential') {
                    if(businessPlans) businessPlans.classList.remove('active');
                    if(residentialPlans) residentialPlans.classList.add('active');
                } else {
                    if(residentialPlans) residentialPlans.classList.remove('active');
                    if(businessPlans) businessPlans.classList.add('active');
                }
            });
        });
    }

    // --- New Theme Toggler Logic ---
    const themeToggleButton = document.getElementById("theme-toggle-button");
    if (themeToggleButton) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        const applyTheme = (theme) => {
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('swiftel-theme', theme);
            updateToggleButton(theme);
        };

        const updateToggleButton = (theme) => {
            if (theme === 'dark') {
                themeToggleButton.innerHTML = `<i class="fas fa-sun"></i>`;
            } else {
                themeToggleButton.innerHTML = `<i class="fas fa-moon"></i>`;
            }
        };

        const toggleTheme = () => {
            const currentTheme = localStorage.getItem('swiftel-theme') || (prefersDark.matches ? 'dark' : 'light');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        };

        const storedTheme = localStorage.getItem('swiftel-theme');
        if (storedTheme) {
            applyTheme(storedTheme);
        } else {
            applyTheme(prefersDark.matches ? 'dark' : 'light');
        }

        prefersDark.addEventListener('change', (e) => {
            if (!localStorage.getItem('swiftel-theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });

        themeToggleButton.addEventListener("click", toggleTheme);
    }
    
    // --- Knowledge Base Logic (UPGRADED) ---
    if (document.querySelector('.kb-tabs')) {
        const articles = [
            { id: 'fibre-vs-wireless', category: 'General Information', title: 'Fibre vs. Wireless Internet', lastUpdated: 'Sep 21, 2025', content: `<h2>Fibre vs. Wireless Internet: Which is Right for You?</h2><p>Choosing an internet service can be confusing. The two most common types of high-speed connections are Fibre and Wireless. Here’s a breakdown of their pros and cons.</p><h3>Fibre Internet</h3><p>Fibre optic internet transmits data as pulses of light through thin strands of glass. This physical connection from our network directly to your home is the gold standard for internet technology.</p><ul><li><strong>Pros:</strong><br><strong>Speed:</strong> Unmatched download and upload speeds (symmetrical).<br><strong>Reliability:</strong> Extremely stable and immune to weather or electrical interference.<br><strong>Low Latency (Ping):</strong> Ideal for gaming, live streaming, and video calls.<br><strong>Security:</strong> A direct, physical line is very difficult to intercept.</li><li><strong>Cons:</strong><br><strong>Availability:</strong> Requires physical cable infrastructure to be laid, so it's not available everywhere.<br><strong>Installation:</strong> May require a technician to run a cable to your premises.</li></ul><h3>Wireless Internet</h3><p>Wireless internet transmits data via radio waves from a central tower to a receiver at your location. It’s an excellent solution for areas where laying fibre is difficult.</p><ul><li><strong>Pros:</strong><br><strong>Wide Availability:</strong> Can be deployed in areas without cable access, including rural locations.<br><strong>Quick Setup:</strong> Installation is often faster as no underground cables are needed.</li><li><strong>Cons:</strong><br><strong>Inconsistent Speeds:</strong> Speed can be affected by distance from the tower, physical obstructions (hills, buildings), and the number of users connected.<br><strong>Higher Latency (Ping):</strong> The wireless link adds a small delay, which can be noticeable in online gaming.<br><strong>Weather Susceptibility:</strong> Heavy rain or storms can sometimes interfere with the signal.</li></ul><h3>Conclusion</h3><p><strong>Choose Fibre if it's available in your area.</strong> It offers a superior experience in every metric: speed, reliability, and latency. <strong>Choose Wireless if you live outside a fibre coverage zone.</strong> It provides a vital high-speed connection where other options may not exist.</p>` },
            { id: 'change-wifi-password', category: 'Getting Started', title: 'How to Change Your Wi-Fi Password', lastUpdated: 'Sep 20, 2025', content: `<h2>Changing Your Router's Wi-Fi Password</h2><p>Regularly changing your Wi-Fi password is a crucial security step. It prevents unauthorized access to your network.</p><h3>Step-by-Step Guide:</h3><ol><li><strong>Find Your Router's IP Address:</strong> This is usually on a sticker on the router itself (e.g., <code>192.168.1.1</code>).</li><li><strong>Log In to the Router:</strong> Open a web browser and type the IP address into the address bar. Use the username and password from the sticker.</li><li><strong>Navigate to Wireless Settings:</strong> Look for a section named "Wireless," "WLAN," or "Wi-Fi Settings."</li><li><strong>Change the Password (PSK):</strong> Find the field labeled "Password" or "Pre-Shared Key (PSK)" and enter your new, strong password.</li><li><strong>Save and Reboot:</strong> Click "Save" or "Apply." After the router restarts, reconnect all your devices using the new password.</li></ol><p>If you have any trouble, don't hesitate to contact our support team.</p>` },
            { id: 'understand-equipment', category: 'Getting Started', title: 'What are GPON, ONU, and Routers?', lastUpdated: 'Sep 19, 2025', content: `<h2>Understanding Your Fibre Equipment</h2><p>When you get a fibre connection, you'll see a few new devices. Here's what they are and what they do.</p><h3>GPON (Gigabit Passive Optical Network)</h3><p>GPON is the technology that allows us to deliver high-speed internet over a single fibre optic cable to multiple users.</p><h3>ONU (Optical Network Unit)</h3><p>The ONU is the small box our technicians install in your home. It converts light signals from the fibre optic cable into electrical signals your devices can understand.</p><h3>Wi-Fi Router</h3><p>This familiar device connects to the ONU and creates your wireless (Wi-Fi) network, allowing your devices to connect to the internet.</p>` },
            { id: 'reboot-router', category: 'Getting Started', title: 'How to Reboot Your Router (The Right Way)', lastUpdated: 'Sep 20, 2025', content: `<h2>Rebooting Your Router Correctly</h2><p>"Have you tried turning it off and on again?" It's a cliché for a reason! Rebooting your router and ONU can solve many common internet problems. Here is the correct procedure:</p><ol><li><strong>Unplug both the Wi-Fi Router and the ONU</strong> from the power outlet.</li><li><strong>Wait for 60 seconds.</strong> This allows the internal components to fully discharge and clear out glitches.</li><li><strong>Plug in the ONU first.</strong> Wait for its lights to stabilize (this can take a minute or two).</li><li><strong>Plug in your Wi-Fi Router.</strong> Wait for its lights to stabilize.</li><li><strong>Test your connection.</strong></li></ol><p>This process, known as a power cycle, is the first thing you should try when your internet acts up.</p>` },
            { id: 'slow-wifi', category: 'Troubleshooting', title: 'Why Is My Wi-Fi Slow?', lastUpdated: 'Sep 20, 2025', content: `<h2>Common Causes of Slow Wi-Fi</h2><p>Sometimes your internet plan is fast, but your Wi-Fi feels slow. Here are some common culprits:</p><h3>1. Router Placement</h3><p>Your router's location is critical. Wi-Fi signals have trouble passing through thick materials. Avoid placing it in cabinets or behind large appliances. The best place is a central, elevated location in your home.</p><h3>2. Wireless Interference</h3><p>Many household devices (microwaves, cordless phones) use the same 2.4 GHz frequency as your Wi-Fi, causing congestion. Switching to a 5 GHz network can often solve this.</p><h3>3. Too Many Devices</h3><p>Every device connected to your Wi-Fi shares the total available bandwidth. If you have a basic plan but many active devices, your connection will feel slow. Consider upgrading your plan if your usage has increased.</p>` },
            { id: '2ghz-vs-5ghz', category: 'Troubleshooting', title: '2.4 GHz vs. 5 GHz Wi-Fi', lastUpdated: 'Sep 20, 2025', content: `<h2>2.4 GHz vs. 5 GHz: Which Should You Use?</h2><p>Modern routers often broadcast two Wi-Fi networks. Here’s how to choose the right one for your device.</p><h3>2.4 GHz Band</h3><ul><li><strong>Longer Range:</strong> Its signals travel further and are better at penetrating walls.</li><li><strong>More Interference:</strong> Many devices use this frequency, so it can be crowded and slower.</li><li><strong>Best For:</strong> Devices that are far from the router or don't need maximum speed.</li></ul><h3>5 GHz Band</h3><ul><li><strong>Faster Speeds:</strong> Offers significantly higher potential speeds.</li><li><strong>Shorter Range:</strong> Its signals don't travel as far and are more easily blocked by walls.</li><li><strong>Best For:</strong> Devices that need high speed and are relatively close to the router, like your smart TV or gaming console.</li></ul><p><strong>Conclusion:</strong> If you are close to the router, connect to 5 GHz for the best performance. If you're far away, use 2.4 GHz for a more stable connection.</p>` },
            { id: 'weather-outages', category: 'Troubleshooting', title: 'Is Fibre Affected by Weather or Power?', lastUpdated: 'Sep 21, 2025', content: `<h2>Fibre Optic Internet: Resilience to Weather & Power</h2><h3>Immunity to Weather</h3><p>Fibre optic cables transmit data using light, so they are not susceptible to electromagnetic interference from rain, storms, or other atmospheric conditions. Your signal quality remains consistent regardless of the weather.</p><h3>Dependence on Power</h3><p>While the signal is resilient, the equipment (like the ONU/Router in your home) requires electricity. <strong>If there is a power outage, your internet service will go down.</strong> To maintain connectivity during a power cut, you would need a backup power supply (UPS).</p>` }
        ];
        const glossary = [
            { term: 'Bandwidth', definition: 'The maximum rate at which data can be transferred over a network. Measured in Mbps (Megabits per second), it determines how "fast" your internet connection feels.' },
            { term: 'DNS', definition: '(Domain Name System) The internet\'s phonebook. It translates human-readable domain names (like www.swiftel.co.ke) into machine-readable IP addresses.' },
            { term: 'Download Speed', definition: 'The rate at which data is transferred from the internet to your device. Important for streaming, browsing, and receiving files.' },
            { term: 'Ethernet', definition: 'A standard for connecting devices in a wired local area network (LAN). An Ethernet cable provides a more stable and often faster connection than Wi-Fi.' },
            { term: 'Fibre Internet', definition: 'A type of high-speed internet that uses fibre optic cables to transmit data as pulses of light. See our article for a full comparison with Wireless.' },
            { term: 'Firewall', definition: 'A network security system that monitors and controls network traffic, acting as a barrier between a trusted internal network and untrusted external networks.' },
            { term: 'FUP', definition: '(Fair Usage Policy) A policy used by ISPs to ensure that all customers get a reliable connection. It means that after a certain amount of data usage, speeds may be temporarily reduced for very heavy users to prevent network congestion.' },
            { term: 'IP Address', definition: '(Internet Protocol Address) A unique numerical label assigned to each device on a network. It\'s like a mailing address for your device on the internet.' },
            { term: 'ISP', definition: '(Internet Service Provider) A company that provides customers with access to the internet. Swiftel Fibre is an ISP.' },
            { term: 'Latency', definition: 'The delay (measured in milliseconds) it takes for data to travel from its source to its destination and back. Lower latency is better, especially for online gaming and video calls.' },
            { term: 'Ping', definition: 'A utility used to measure latency. A "low ping" means a more responsive connection.' },
            { term: 'Router', definition: 'A device that creates your local network (e.g., your Wi-Fi) and allows multiple devices to share a single internet connection.' },
            { term: 'Server', definition: 'A powerful computer that provides data or services to other computers (clients) over a network. Websites, online games, and streaming services all run on servers.' },
            { term: 'Server Room', definition: 'A secure, climate-controlled room that houses an organization\'s servers and networking equipment.' },
            { term: 'SME', definition: 'An acronym for Small and Medium-sized Enterprise, a common term for businesses that are not large corporations.' },
            { term: 'Streaming', definition: 'The continuous transmission of audio or video files from a server to a client, allowing you to watch movies or listen to music without downloading the entire file first.' },
            { term: 'Upload Speed', definition: 'The rate at which data is transferred from your device to the internet. Important for video conferencing, live streaming, and sending large files.' },
            { term: 'WFH', definition: 'An acronym for Work From Home, a practice that relies heavily on a stable, high-speed internet connection.' }
        ];

        const articleList = document.getElementById('kb-article-list');
        const contentArea = document.getElementById('kb-content-area');
        const searchInput = document.getElementById('kb-search');
        const tabBtns = document.querySelectorAll('.kb-tab-btn');
        const tabContents = document.querySelectorAll('.kb-tab-content');
        const glossaryContainer = document.querySelector('.glossary-container');

        const renderArticles = (filter = '') => {
            if (!articleList) return;
            articleList.innerHTML = '';
            const filteredArticles = articles.filter(article => 
                article.title.toLowerCase().includes(filter.toLowerCase()) || 
                article.content.toLowerCase().includes(filter.toLowerCase())
            );

            const categories = [...new Set(filteredArticles.map(a => a.category))];
            
            if (filteredArticles.length === 0) {
                articleList.innerHTML = '<p style="padding: 1rem;">No articles found.</p>';
                return;
            }

            categories.forEach(category => {
                const categoryDiv = document.createElement('div');
                categoryDiv.className = 'kb-category';
                categoryDiv.innerHTML = `<h4>${category}</h4>`;
                
                filteredArticles.filter(a => a.category === category).forEach(article => {
                    const link = document.createElement('a');
                    link.className = 'kb-article-link';
                    link.textContent = article.title;
                    link.dataset.id = article.id;
                    categoryDiv.appendChild(link);
                });
                articleList.appendChild(categoryDiv);
            });
        };

        const loadArticle = (id) => {
            if (!contentArea) return;
            const article = articles.find(a => a.id === id);
            if (article) {
                contentArea.innerHTML = `
                    <div class="kb-article-content">
                        <p class="kb-meta">Last Updated: ${article.lastUpdated}</p>
                        ${article.content}
                    </div>
                `;
                document.querySelectorAll('.kb-article-link').forEach(link => {
                    link.classList.toggle('active', link.dataset.id === id);
                });
            }
        };

        const renderGlossary = () => {
            if (!glossaryContainer) return;
            glossaryContainer.innerHTML = '';
            glossary.sort((a, b) => a.term.localeCompare(b.term)); // Sort glossary alphabetically
            const grouped = glossary.reduce((acc, item) => {
                const letter = item.term.charAt(0).toUpperCase();
                if (!acc[letter]) {
                    acc[letter] = [];
                }
                acc[letter].push(item);
                return acc;
            }, {});

            Object.keys(grouped).sort().forEach(letter => {
                const groupDiv = document.createElement('div');
                groupDiv.className = 'glossary-group';
                const letterHeading = document.createElement('h3');
                letterHeading.className = 'glossary-letter';
                letterHeading.textContent = letter;
                groupDiv.appendChild(letterHeading);
                
                const dl = document.createElement('dl');
                grouped[letter].forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'glossary-item';
                    itemDiv.innerHTML = `<dt>${item.term}</dt><dd>${item.definition}</dd>`;
                    dl.appendChild(itemDiv);
                });
                groupDiv.appendChild(dl);
                glossaryContainer.appendChild(groupDiv);
            });
        };
        
        // Initial render & event listeners
        if (articleList && contentArea && searchInput && tabBtns.length && glossaryContainer) {
            renderArticles();
            renderGlossary();
            contentArea.innerHTML = `<div class="placeholder"><i class="fas fa-book-open"></i><h3>Welcome to the Knowledge Base</h3><p>Select an article from the left to get started, or switch to the Glossary tab.</p></div>`;
            searchInput.addEventListener('input', () => renderArticles(searchInput.value));
            articleList.addEventListener('click', (e) => {
                if (e.target.classList.contains('kb-article-link')) {
                    loadArticle(e.target.dataset.id);
                }
            });
            tabBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    tabBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    tabContents.forEach(content => {
                        content.classList.toggle('active', content.id === `${btn.dataset.tab}-content`);
                    });
                });
            });
        }
    }
});