const fetch3Products = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products?limit=3');
        const data = await response.json();
        // console.log(data)
        displayProducts(data);
        // setupFiltering(data);
    } catch (error) {
        console.error("Error fetching products:", error);
        productContainer.innerHTML = `<p class="text-error">Failed to load products. Please try again later.</p>`;
    }
}

const container = document.getElementById('product-container');
// Function to render products
const displayProducts = (products) => {
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
                    <span class="text-sm font-bold text-gray-600"><i class="fa-solid fa-star text-yellow-400"></i> ${product.rating.rate} (${product.rating.count})</span>
                </div>
                <h2 class="card-title text-base h-12 overflow-hidden">${product.title}</h2>
                <p class="text-xl font-bold text-black">$${product.price}</p>
                <div class="card-actions justify-between mt-4">
                    <button onclick="loadProdDetail('${product.id}')" class="btn btn-outline btn-sm rounded-md flex-1"><i class="fa-regular fa-eye"></i> Details</button>
                    <button class="btn btn-primary bg-blue-600 border-none btn-sm rounded-md flex-1"><i class="fa-solid fa-cart-plus"></i> Add</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

fetch3Products();

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
// const renderCategory = (categories) => {
//     const container = document.getElementById('categorys')

//     for (let categoryName of categories) {
//         // console.log(categoryName)
//         const btndiv = document.createElement('div')
//         btndiv.innerHTML = `<button onClick="pByCat('${categoryName}')" class="btn btn-sm rounded-full px-6 btn-outline border-gray-300 text-gray-600">${categoryName}</button>`;

//         container.append(btndiv);
//     }
// };
const removeActive = () => {
    const catBTN = document.querySelectorAll(".catBtn");
    //   console.log(lessonButtons);
    catBTN.forEach((btn) => btn.classList.remove("bg-blue-600", "text-white", "border-none"));
};
const pByCat = (cName) => {
    console.log(cName)
    // manageSpinner(true);

    const url = `https://fakestoreapi.com/products/category/${cName}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive(); // remove all active class
            const clickBtn = document.getElementById(`catBtn-${cName}`);
            // console.log(data)
            clickBtn.classList.add("bg-blue-600", "text-white", "border-none"); // add active class
            renderProducts(data);
        });
}
const renderCategory = (categories) => {
    const container = document.getElementById('categorys');
    // container.innerHTML = ''; 

    for (let categoryName of categories) {
        // 1. Create button element
        const btn = document.createElement('button');

        // 2. Set classes and text
        btn.className = "catBtn btn btn-sm rounded-full px-6 btn-outline border-gray-300 text-gray-600";
        btn.id = `catBtn-${categoryName}`;
        btn.innerText = categoryName;

        // 3. Add the click event properly
        btn.addEventListener('click', () => {
            pByCat(categoryName);
        });

        // 4. Append directly to container (no extra div needed)
        container.append(btn);
    }
};
const renderProducts = (products) => {
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
                    <button onclick="loadProdDetail('${product.id}')" class="btn btn-outline btn-xs flex-1 rounded text-gray-600 border-gray-300 normal-case">
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

const loadProdDetail = async (id) => {
    console.log(id)
    const url = `https://fakestoreapi.com/products/${id}`;
    const res = await fetch(url);
    const details = await res.json();

    // FIX: Pass 'details' directly, NOT 'details.data'
    displayProdDetails(details);
};

const displayProdDetails = (product) => {
    // console.log(product); // This will now show the actual product object
    const detailsBox = document.getElementById("details-container");

    // Safety check to ensure the product was found
    if (!product) return;

    detailsBox.innerHTML = `
        <figure class="px-10 pt-10 h-64 bg-white flex justify-center">
            <img src="${product.image}" alt="${product.title}" class="h-full object-contain" />
        </figure>
        <div class="card-body p-5">
            <div class="flex justify-between items-center mb-2">
                <span class="badge badge-primary bg-blue-100 text-blue-700 border-none font-semibold text-xs py-3">
                    ${product.category}
                </span>
                <span class="text-sm font-bold text-gray-600">
                    <i class="fa-solid fa-star text-yellow-400"></i> ${product.rating?.rate || 'N/A'} (${product.rating?.count || 0})
                </span>
            </div>
            <h2 class="card-title text-xl text-gray-600 font-bold mb-2">${product.title}</h2>
            <p class="text-gray-600 text-sm mb-4">${product.description}</p> 
            <p class="text-2xl font-bold text-black">$${product.price}</p>
        </div>
    `;

    document.getElementById("prod_modal").showModal();
};

// 3. Simple Filtering Logic
const setupFiltering = (allData) => {
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