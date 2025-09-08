// VidyaShare App JavaScript - Fixed Version

// Application Data from provided JSON
const appData = {
  designSystem: {
    colors: {
      primary: "#0284c7",
      primaryLight: "#03a9f4", 
      primaryDark: "#075985",
      secondary: "#f97316",
      accent: "#10b981",
      background: "#f9fafb",
      surface: "#ffffff"
    },
    fonts: {
      family: "Inter",
      weights: [400, 500, 600, 700, 800]
    }
  },
  books: [
    {
      id: "book1",
      title: "Concepts of Physics - Part 1",
      author: "H.C. Verma",
      edition: "2022 Edition",
      isbn: "978-8177091878",
      imageUrl: "https://picsum.photos/seed/hcverma/400/600",
      condition: "B",
      conditionLabel: "B (Very Good)",
      listingType: "Buy",
      price: 350,
      originalPrice: 495,
      description: "Gently used for JEE preparation. Minor cover wear, no markings inside. An essential book for any engineering aspirant.",
      seller: {
        id: "user1",
        name: "Rohan Sharma", 
        location: "Koramangala, Bangalore",
        rating: 4.8,
        successfulTransactions: 22,
        avatarUrl: "https://picsum.photos/seed/rohan/100/100"
      },
      category: "IIT-JEE",
      isVerified: true,
      tags: ["Physics", "JEE Mains", "JEE Advanced"]
    },
    {
      id: "book2", 
      title: "Indian Polity",
      author: "M. Laxmikanth",
      edition: "6th Edition",
      isbn: "978-9352608759",
      imageUrl: "https://picsum.photos/seed/polity/400/600",
      condition: "C",
      conditionLabel: "C (Good)",
      listingType: "Rent",
      rentalFee: 150,
      securityDeposit: 300,
      originalPrice: 650,
      description: "Comprehensive coverage of Indian political system. Some highlighting present but readable throughout.",
      seller: {
        id: "user2",
        name: "Priya Patel",
        location: "Andheri, Mumbai", 
        rating: 4.9,
        successfulTransactions: 45,
        avatarUrl: "https://picsum.photos/seed/priya/100/100"
      },
      category: "UPSC",
      isVerified: true,
      tags: ["Polity", "UPSC", "Civil Services"]
    },
    {
      id: "book3",
      title: "Objective NCERT Biology",
      author: "MTG Editorial Board",
      edition: "2023 Edition", 
      isbn: "978-9390931842",
      imageUrl: "https://picsum.photos/seed/biology/400/600",
      condition: "A",
      conditionLabel: "A (Like New)",
      listingType: "Buy",
      price: 425,
      originalPrice: 550,
      description: "Brand new condition, never used. Perfect for NEET preparation with objective questions.",
      seller: {
        id: "user3",
        name: "Arjun Verma",
        location: "Connaught Place, Delhi",
        rating: 4.5,
        successfulTransactions: 15,
        avatarUrl: "https://picsum.photos/seed/arjun/100/100"
      },
      category: "NEET",
      isVerified: false,
      tags: ["Biology", "NEET", "Medical Entrance"]
    },
    {
      id: "book4",
      title: "Atomic Habits",
      author: "James Clear",
      edition: "English Edition",
      isbn: "978-0735211292", 
      imageUrl: "https://picsum.photos/seed/habits/400/600",
      condition: "B",
      conditionLabel: "B (Very Good)",
      listingType: "Buy",
      price: 250,
      originalPrice: 350,
      description: "Popular self-help book in great condition. Minimal wear on cover, no internal markings.",
      seller: {
        id: "user4",
        name: "Sneha Gupta",
        location: "Sector 18, Noida",
        rating: 4.7,
        successfulTransactions: 28,
        avatarUrl: "https://picsum.photos/seed/sneha/100/100"
      },
      category: "Self-help",
      isVerified: true,
      tags: ["Habits", "Self-improvement", "Productivity"]
    },
    {
      id: "book5",
      title: "Mathematics Class 12 NCERT",
      author: "NCERT",
      edition: "2023-24 Edition",
      isbn: "978-8174507938",
      imageUrl: "https://picsum.photos/seed/math12/400/600",
      condition: "C", 
      conditionLabel: "C (Good)",
      listingType: "Rent",
      rentalFee: 80,
      securityDeposit: 150,
      originalPrice: 185,
      description: "Standard NCERT textbook with solved examples marked. Good for board exam preparation.",
      seller: {
        id: "user5",
        name: "Rahul Singh",
        location: "Malviya Nagar, Jaipur",
        rating: 4.6,
        successfulTransactions: 33,
        avatarUrl: "https://picsum.photos/seed/rahul/100/100"
      },
      category: "Class 12th",
      isVerified: true,
      tags: ["Mathematics", "NCERT", "Board Exam"]
    }
  ]
};

// Global state
let currentUser = null;
let filteredBooks = [...appData.books];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('VidyaShare app initializing...');
    initializeNavigation();
    initializeModals();
    initializeTabs();
    initializeSearch();
    initializeCategoryFilters();
    renderFeaturedBooks();
    renderBrowseBooks();
    initializeForms();
    setupDashboardInteractions();
    initializeDropdownNavigation();
    
    // Ensure home section is active on load
    showSection('home');
});

// Navigation System - Fixed
function initializeNavigation() {
    console.log('Initializing navigation...');
    
    const navigationLinks = document.querySelectorAll('.nav-link');
    
    navigationLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const targetSection = link.getAttribute('data-section');
            console.log('Navigation clicked:', targetSection);
            
            if (targetSection) {
                showSection(targetSection);
                updateActiveNavLink(link);
            }
        });
    });
    
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

function showSection(sectionId) {
    console.log('Showing section:', sectionId);
    
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
        console.log('Section shown:', sectionId);
    } else {
        console.error('Section not found:', sectionId);
    }
}

function updateActiveNavLink(activeLink) {
    const navigationLinks = document.querySelectorAll('.nav-link');
    navigationLinks.forEach(link => {
        link.classList.remove('active');
    });
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Dropdown Navigation - Fixed
function initializeDropdownNavigation() {
    const dropdownLinks = document.querySelectorAll('.dropdown-section a');
    
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const category = link.getAttribute('data-category');
            console.log('Dropdown category clicked:', category);
            
            if (category) {
                showSection('browse');
                updateActiveNavLink(document.querySelector('[data-section="browse"]'));
                
                const categoryFilter = document.getElementById('categoryFilter');
                if (categoryFilter) {
                    categoryFilter.value = category;
                    applyFilters();
                }
                
                showNotification(`Browsing ${category} books`);
            }
        });
    });
}

// Modal System - Fixed
function initializeModals() {
    console.log('Initializing modals...');
    
    const loginBtn = document.getElementById('loginBtn');
    
    // Login Modal
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Login button clicked');
            showModal('loginModal');
        });
    }
    
    // Close modal handlers
    const closeButtons = document.querySelectorAll('.modal-close');
    const overlays = document.querySelectorAll('.modal-overlay');
    
    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const modal = e.target.closest('.modal');
            if (modal) {
                hideModal(modal.id);
            }
        });
    });
    
    overlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const modal = e.target.closest('.modal');
            if (modal) {
                hideModal(modal.id);
            }
        });
    });
    
    // List book modal
    const listBookBtn = document.getElementById('listBookBtn');
    if (listBookBtn) {
        listBookBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showModal('listBookModal');
        });
    }
    
    const listBookCancel = document.getElementById('listBookCancel');
    if (listBookCancel) {
        listBookCancel.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            hideModal('listBookModal');
        });
    }
}

function showModal(modalId) {
    console.log('Showing modal:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    } else {
        console.error('Modal not found:', modalId);
    }
}

function hideModal(modalId) {
    console.log('Hiding modal:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Tab System - Fixed
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const tabName = button.getAttribute('data-tab');
            const parentContainer = button.closest('.section, .modal-body');
            
            if (!parentContainer || !tabName) return;
            
            console.log('Tab clicked:', tabName);
            
            // Update active tab button
            parentContainer.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            
            // Update active tab content
            parentContainer.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });
            
            const targetContent = parentContainer.querySelector(`#${tabName}`);
            if (targetContent) {
                targetContent.classList.add('active');
                targetContent.style.display = 'block';
            }
        });
    });
}

// Search and Filter System - Fixed
function initializeSearch() {
    console.log('Initializing search...');
    
    const mainSearch = document.getElementById('mainSearch');
    const browseSearch = document.getElementById('browseSearch');
    const searchBtn = document.querySelector('.search-btn');
    
    if (mainSearch) {
        mainSearch.addEventListener('input', handleMainSearch);
        mainSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleMainSearchSubmit();
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Search button clicked');
            handleMainSearchSubmit();
        });
    }
    
    if (browseSearch) {
        browseSearch.addEventListener('input', (e) => {
            console.log('Browse search input:', e.target.value);
            applyFilters();
        });
    }
    
    // Filter selectors
    const categoryFilter = document.getElementById('categoryFilter');
    const conditionFilter = document.getElementById('conditionFilter');
    const typeFilter = document.getElementById('typeFilter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            console.log('Category filter changed:', e.target.value);
            applyFilters();
        });
    }
    if (conditionFilter) {
        conditionFilter.addEventListener('change', (e) => {
            console.log('Condition filter changed:', e.target.value);
            applyFilters();
        });
    }
    if (typeFilter) {
        typeFilter.addEventListener('change', (e) => {
            console.log('Type filter changed:', e.target.value);
            applyFilters();
        });
    }
}

function handleMainSearch(e) {
    const query = e.target.value.toLowerCase();
    if (query.length > 2) {
        const results = searchBooks(query);
        console.log('Search results:', results.length);
    }
}

function handleMainSearchSubmit() {
    const mainSearchInput = document.getElementById('mainSearch');
    const query = mainSearchInput ? mainSearchInput.value : '';
    
    console.log('Main search submit:', query);
    
    if (query && query.trim()) {
        // Navigate to browse section
        showSection('browse');
        updateActiveNavLink(document.querySelector('[data-section="browse"]'));
        
        // Set the search query in browse search
        const browseSearchInput = document.getElementById('browseSearch');
        if (browseSearchInput) {
            browseSearchInput.value = query;
        }
        
        // Apply filters with the search query
        applyFilters();
        
        // Show notification
        showNotification(`Searching for "${query}"...`);
    } else {
        showNotification('Please enter a search term');
    }
}

function searchBooks(query) {
    return appData.books.filter(book => 
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query) ||
        book.tags.some(tag => tag.toLowerCase().includes(query))
    );
}

function applyFilters() {
    const browseSearchInput = document.getElementById('browseSearch');
    const searchQuery = browseSearchInput ? browseSearchInput.value.toLowerCase() : '';
    const categoryFilter = document.getElementById('categoryFilter');
    const conditionFilter = document.getElementById('conditionFilter');
    const typeFilter = document.getElementById('typeFilter');
    
    const categoryValue = categoryFilter ? categoryFilter.value : '';
    const conditionValue = conditionFilter ? conditionFilter.value : '';
    const typeValue = typeFilter ? typeFilter.value : '';
    
    console.log('Applying filters:', {searchQuery, categoryValue, conditionValue, typeValue});
    
    filteredBooks = appData.books.filter(book => {
        const matchesSearch = !searchQuery || 
            book.title.toLowerCase().includes(searchQuery) ||
            book.author.toLowerCase().includes(searchQuery) ||
            book.category.toLowerCase().includes(searchQuery) ||
            book.tags.some(tag => tag.toLowerCase().includes(searchQuery));
            
        const matchesCategory = !categoryValue || book.category === categoryValue;
        const matchesCondition = !conditionValue || book.condition === conditionValue;
        
        // Type filter logic (buy/rent)
        const matchesType = !typeValue || 
            (typeValue === 'buy' && book.listingType === 'Buy') ||
            (typeValue === 'rent' && book.listingType === 'Rent');
            
        return matchesSearch && matchesCategory && matchesCondition && matchesType;
    });
    
    console.log('Filtered books:', filteredBooks.length);
    renderBrowseBooks();
}

// Category Filter System - Fixed
function initializeCategoryFilters() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const category = card.getAttribute('data-category');
            console.log('Category card clicked:', category);
            
            if (category) {
                showSection('browse');
                updateActiveNavLink(document.querySelector('[data-section="browse"]'));
                
                const categoryFilter = document.getElementById('categoryFilter');
                if (categoryFilter) {
                    categoryFilter.value = category;
                    applyFilters();
                }
                
                showNotification(`Browsing ${category} books`);
            }
        });
    });
}

// Book Rendering - Fixed
function renderFeaturedBooks() {
    const container = document.getElementById('featuredBooks');
    if (!container) {
        console.error('Featured books container not found');
        return;
    }
    
    const featuredBooks = appData.books.slice(0, 4);
    console.log('Rendering featured books:', featuredBooks.length);
    
    container.innerHTML = featuredBooks.map(book => createBookCard(book)).join('');
    
    // Add click handlers to book cards
    container.querySelectorAll('.book-card').forEach((card, index) => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Featured book card clicked:', featuredBooks[index].title);
            showBookDetail(featuredBooks[index]);
        });
    });
}

function renderBrowseBooks() {
    const container = document.getElementById('browseBooks');
    if (!container) {
        console.error('Browse books container not found');
        return;
    }
    
    console.log('Rendering browse books:', filteredBooks.length);
    
    if (filteredBooks.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 2rem;">
                <h3>No books found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredBooks.map(book => createBookCard(book)).join('');
    
    // Add click handlers to book cards
    container.querySelectorAll('.book-card').forEach((card, index) => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Browse book card clicked:', filteredBooks[index].title);
            showBookDetail(filteredBooks[index]);
        });
    });
}

function createBookCard(book) {
    const price = book.price || book.rentalFee;
    const originalPrice = book.originalPrice;
    const savings = price && originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;
    const ratingStars = '★'.repeat(Math.floor(book.seller.rating)) + '☆'.repeat(5 - Math.floor(book.seller.rating));
    
    return `
        <div class="book-card" data-book-id="${book.id}">
            <div class="book-image">📚</div>
            <div class="book-info">
                <h3>${book.title}</h3>
                <div class="book-author">${book.author}</div>
                <div class="book-condition condition-${book.condition}">Grade ${book.condition}</div>
                ${book.isVerified ? '<div class="verified-badge"><i class="fas fa-shield-alt"></i> Verified</div>' : ''}
                <div class="book-pricing">
                    <span class="book-price">₹${price}</span>
                    ${originalPrice ? `<span class="book-original-price">₹${originalPrice}</span>` : ''}
                    ${savings > 0 ? `<span class="book-savings">${savings}% off</span>` : ''}
                </div>
                ${book.listingType === 'Rent' ? `<div class="rent-option">Rent: ₹${book.rentalFee}/month</div>` : ''}
                <div class="book-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${book.seller.location}
                </div>
                <div class="seller-rating">
                    <span class="rating-stars">${ratingStars}</span>
                    <span>${book.seller.rating}</span>
                    <small>(${book.seller.name})</small>
                </div>
            </div>
        </div>
    `;
}

// Book Detail Modal - Fixed
function showBookDetail(book) {
    console.log('Showing book detail for:', book.title);
    
    const modal = document.getElementById('bookModal');
    if (!modal) {
        console.error('Book modal not found');
        return;
    }
    
    const price = book.price || book.rentalFee;
    const originalPrice = book.originalPrice;
    const savings = price && originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;
    
    // Update modal content safely
    const updateElement = (id, content) => {
        const element = document.getElementById(id);
        if (element) element.textContent = content;
    };
    
    const showElement = (id, show = true) => {
        const element = document.getElementById(id);
        if (element) element.style.display = show ? 'inline' : 'none';
    };
    
    updateElement('modalBookTitle', book.title);
    updateElement('modalAuthor', book.author);
    updateElement('modalPrice', `₹${price}`);
    updateElement('modalSeller', book.seller.name);
    updateElement('modalRating', book.seller.rating);
    updateElement('modalLocation', book.seller.location);
    updateElement('modalDescription', book.description);
    
    if (originalPrice) {
        updateElement('modalOriginalPrice', `₹${originalPrice}`);
        showElement('modalOriginalPrice', true);
        const savingsElement = document.querySelector('.savings');
        if (savingsElement) {
            savingsElement.textContent = `Save ${savings}%`;
            savingsElement.style.display = 'inline';
        }
    } else {
        showElement('modalOriginalPrice', false);
        const savingsElement = document.querySelector('.savings');
        if (savingsElement) savingsElement.style.display = 'none';
    }
    
    // Update condition badge
    const conditionBadge = document.getElementById('modalCondition');
    if (conditionBadge) {
        conditionBadge.textContent = `Grade ${book.condition}`;
        conditionBadge.className = `condition-badge condition-${book.condition}`;
    }
    
    // Update verified badge
    const verifiedBadge = document.getElementById('modalVerified');
    if (verifiedBadge) {
        verifiedBadge.style.display = book.isVerified ? 'flex' : 'none';
    }
    
    // Update rent price
    const rentPriceElement = document.getElementById('modalRentPrice');
    if (rentPriceElement) {
        const rentalOption = rentPriceElement.parentElement;
        if (book.listingType === 'Rent' && book.rentalFee) {
            rentPriceElement.textContent = `₹${book.rentalFee}/month`;
            if (rentalOption) rentalOption.style.display = 'block';
        } else {
            if (rentalOption) rentalOption.style.display = 'none';
        }
    }
    
    showModal('bookModal');
}

// Forms - Fixed
function initializeForms() {
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleLogin();
        });
    }
    
    // Register form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleRegister();
        });
    }
    
    // List book form
    const listBookForm = document.getElementById('listBookForm');
    if (listBookForm) {
        listBookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleListBook();
        });
    }
}

function handleLogin() {
    currentUser = {
        name: 'Demo User',
        email: 'demo@example.com',
        location: 'Bangalore'
    };
    
    updateUserInterface();
    hideModal('loginModal');
    showNotification('Login successful! Welcome to VidyaShare.');
}

function handleRegister() {
    currentUser = {
        name: 'New User',
        email: 'newuser@example.com',
        location: 'Bangalore'
    };
    
    updateUserInterface();
    hideModal('loginModal');
    showNotification('Registration successful! Welcome to VidyaShare.');
}

function handleListBook() {
    hideModal('listBookModal');
    showNotification('Book listed successfully! It will be reviewed and published soon.');
    
    const form = document.getElementById('listBookForm');
    if (form) form.reset();
}

function updateUserInterface() {
    const loginBtn = document.getElementById('loginBtn');
    if (currentUser && loginBtn) {
        loginBtn.textContent = currentUser.name;
        loginBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            showNotification('User profile feature coming soon!');
        };
    }
}

// Dashboard Interactions - Fixed
function setupDashboardInteractions() {
    const featureButtons = [
        'Join Group', 'Join Discussion', 'Preview & Buy', 'Buy Now', 
        'Rent Book', 'Chat with Seller', 'Rate & Review', 'Extend Rental',
        'View Wishlist', 'Manage Listings', 'View Analytics'
    ];
    
    document.addEventListener('click', (e) => {
        if (e.target.matches('button') || e.target.matches('.btn')) {
            const buttonText = e.target.textContent.trim();
            
            if (featureButtons.some(feature => buttonText.includes(feature))) {
                e.preventDefault();
                e.stopPropagation();
                
                if (buttonText.includes('Buy Now') || buttonText.includes('Rent Book')) {
                    showNotification('Redirecting to secure payment gateway...');
                } else if (buttonText.includes('Chat with Seller')) {
                    showNotification('Opening chat with seller...');
                } else {
                    showNotification('Feature coming soon! Stay tuned.');
                }
            }
        }
    });
}

// Notification System - Fixed
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => {
        if (notif.parentNode) {
            notif.parentNode.removeChild(notif);
        }
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ffffff;
        color: #111827;
        padding: 16px 24px;
        border-radius: 8px;
        border-left: 4px solid #0284c7;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 300px;
        animation: slideIn 0.3s ease;
        cursor: pointer;
        font-family: Inter, sans-serif;
        font-size: 14px;
    `;
    
    notification.textContent = message;
    
    // Add animation styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 3000);
    
    // Click to dismiss
    notification.addEventListener('click', () => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal:not(.hidden)');
        if (openModal) {
            hideModal(openModal.id);
        }
    }
    
    // Quick navigation with keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                showSection('home');
                updateActiveNavLink(document.querySelector('[data-section="home"]'));
                break;
            case '2':
                e.preventDefault();
                showSection('browse');
                updateActiveNavLink(document.querySelector('[data-section="browse"]'));
                break;
            case '3':
                e.preventDefault();
                showSection('community');
                updateActiveNavLink(document.querySelector('[data-section="community"]'));
                break;
            case '4':
                e.preventDefault();
                showSection('dashboard');
                updateActiveNavLink(document.querySelector('[data-section="dashboard"]'));
                break;
        }
    }
});

// Export functions for potential external use
window.VidyaShare = {
    showSection,
    showBookDetail,
    showNotification,
    searchBooks,
    applyFilters,
    appData
};