const API_BASE = 'http://localhost:5000/api';

async function fetchProducts() {
  const response = await fetch(`${API_BASE}/products`);
  const products = await response.json();
  const container = document.getElementById('products');
  products.forEach(product => {
    container.innerHTML += `
      <div>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
        <button onclick="addToCart('${product._id}')">Add to Cart</button>
      </div>
    `;
  });
}

async function addToCart(productId) {
  const token = localStorage.getItem('token');
  await fetch(`${API_BASE}/cart/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ productId, quantity: 1 }),
  });
  alert('Added to cart!');
}

fetchProducts();