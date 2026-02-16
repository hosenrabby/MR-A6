// Mock data for the Trending section
const products = [
    {
        id: 1,
        title: "Fjallraven - Foldsack No. 1 Backpack, ...",
        price: 109.95,
        rating: 3.9,
        reviews: 120,
        category: "Men's Clothing",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
    },
    {
        id: 2,
        title: "Mens Casual Premium Slim Fit T-Shirts",
        price: 22.30,
        rating: 4.1,
        reviews: 259,
        category: "Men's Clothing",
        image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
    },
    {
        id: 3,
        title: "Mens Cotton Jacket",
        price: 55.99,
        rating: 4.7,
        reviews: 500,
        category: "Men's Clothing",
        image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
    }
];

const container = document.getElementById('product-container');

// Function to render products
function displayProducts() {
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = "card bg-white shadow-xl border overflow-hidden";
        card.innerHTML = `
            <figure class="px-10 pt-10 h-64 bg-white">
                <img src="${product.image}" alt="${product.title}" class="h-full object-contain" />
            </figure>
            <div class="card-body p-5">
                <div class="flex justify-between items-center mb-2">
                    <span class="badge badge-primary bg-blue-100 text-blue-700 border-none font-semibold text-xs py-3">${product.category}</span>
                    <span class="text-sm font-bold text-gray-600"><i class="fa-solid fa-star text-yellow-400"></i> ${product.rating} (${product.reviews})</span>
                </div>
                <h2 class="card-title text-base h-12 overflow-hidden">${product.title}</h2>
                <p class="text-xl font-bold text-black">$${product.price}</p>
                <div class="card-actions justify-between mt-4">
                    <button class="btn btn-outline btn-sm rounded-md flex-1"><i class="fa-regular fa-eye"></i> Details</button>
                    <button class="btn btn-primary bg-blue-600 border-none btn-sm rounded-md flex-1"><i class="fa-solid fa-cart-plus"></i> Add</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

displayProducts();


const switchToPage = (target) => {
    const homeSection = document.getElementById('homePS');
    const productsSection = document.getElementById('allPS');
    const homeLinks = document.querySelectorAll('.nav-home');
    const productLinks = document.querySelectorAll('.nav-products');

    if (target === 'home') {
        homeSection.classList.remove('hidden');
        productsSection.classList.add('hidden');
       
        homeLinks.forEach(link => link.classList.add('text-blue-600'));
        productLinks.forEach(link => link.classList.remove('text-blue-600'));
    } else {
        homeSection.classList.add('hidden');
        productsSection.classList.remove('hidden');
   
        productLinks.forEach(link => link.classList.add('text-blue-600'));
        homeLinks.forEach(link => link.classList.remove('text-blue-600'));

        const container = document.getElementById('all-products-container');
        if (container && container.innerHTML.trim() === "") {
            fetchProducts();
        }
    }
}

document.querySelectorAll('.nav-home').forEach(btn => {
    btn.addEventListener('click', () => switchToPage('home'));
});

document.querySelectorAll('.nav-products').forEach(btn => {
    btn.addEventListener('click', () => switchToPage('products'));
});

const productContainer = document.getElementById('all-products-container');
const categoryContainer = document.getElementById('category-filters');


const fetchProducts = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        // console.log(data)
        renderProducts(data);
        // setupFiltering(data);
    } catch (error) {
        console.error("Error fetching products:", error);
        productContainer.innerHTML = `<p class="text-error">Failed to load products. Please try again later.</p>`;
    }
}
const fetchCategory = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        // console.log(data)
        renderCategory(data);
        fetchProducts()
        
        // setupFiltering(data);
    } catch (error) {
        console.error("Error fetching products:", error);
        productContainer.innerHTML = `<p class="text-error">Failed to load Category. Please try again later.</p>`;
    }
}

// 2. Render Products function (your existing logic with a small fix for rating access)
const renderCategory =(category)=> {
    // categoryContainer.innerHTML = '';
    category.forEach(caategory => {
        const button = document.createElement('button');
        button.className = "btn btn-sm rounded-full px-6 btn-outline border-gray-300 text-gray-600";
        button.innerText = `${caategory}`;
        categoryContainer.appendChild(button);
    })
};
const renderProducts =(products)=> {
    productContainer.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = "card bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-shadow";
        card.innerHTML = `
            <figure class="p-4 bg-gray-100 h-60 flex items-center justify-center m-3 rounded-lg">
                <img src="${product.image}" alt="${product.title}" class="h-full object-contain" />
            </figure>
            <div class="p-5 text-left">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">${product.category}</span>
                    <span class="text-xs font-semibold text-gray-500">
                        <i class="fa-solid fa-star text-yellow-400"></i> ${product.rating.rate} (${product.rating.count})
                    </span>
                </div>
                <h3 class="font-bold text-gray-800 truncate mb-1" title="${product.title}">${product.title}</h3>
                <p class="text-lg font-extrabold text-gray-900">$${product.price}</p>
                <div class="flex gap-2 mt-4">
                    <button class="btn btn-outline btn-xs flex-1 rounded text-gray-600 border-gray-300 normal-case">
                        <i class="fa-regular fa-eye text-[10px]"></i> Details
                    </button>
                    <button class="btn btn-primary btn-xs flex-1 rounded bg-blue-600 border-none normal-case">
                        <i class="fa-solid fa-cart-plus text-[10px]"></i> Add
                    </button>
                </div>
            </div>
        `;
        productContainer.appendChild(card);
    });
}

// 3. Simple Filtering Logic
function setupFiltering(allData) {
    const buttons = categoryContainer.querySelectorAll('button');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // UI: Update active button state
            buttons.forEach(b => {
                b.classList.remove('bg-blue-600', 'text-white', 'border-none');
                b.classList.add('btn-outline', 'border-gray-300', 'text-gray-600');
            });
            btn.classList.add('bg-blue-600', 'text-white', 'border-none');
            btn.classList.remove('btn-outline', 'border-gray-300', 'text-gray-600');

            // Logic: Filter data
            const category = btn.innerText.toLowerCase();
            if (category === 'all') {
                renderProducts(allData);
            } else {
                const filtered = allData.filter(p => p.category.toLowerCase() === category);
                renderProducts(filtered);
            }
        });
    });
}

// Start the process
fetchCategory();