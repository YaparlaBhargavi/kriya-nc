import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://127.0.0.1:8000/products";  // FastAPI URL

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    quantity: ""
  });
  const [error, setError] = useState("");

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(API);
      setProducts(res.data);
    } catch (err) {
      setError("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product
  const handleAdd = async () => {
    try {
      await axios.post(API, form);
      fetchProducts();
      setForm({ id: "", name: "", description: "", price: "", quantity: "" });
    } catch (err) {
      setError("Error adding product");
    }
  };

  return (
    <div className="container">
      <h1>mitra</h1>
      <div>Total: {products.length}</div>

      <div className="card">
        <h3>Add Product</h3>
        <input placeholder="ID" value={form.id}
          onChange={e => setForm({ ...form, id: e.target.value })} />
        <input placeholder="Name" value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Description" value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })} />
        <input placeholder="Price" value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })} />
        <input placeholder="Quantity" value={form.quantity}
          onChange={e => setForm({ ...form, quantity: e.target.value })} />

        <button onClick={handleAdd}>Add</button>

        {error && <div className="error">{error}</div>}
      </div>

      <div className="card">
        <h3>Products</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr><td colSpan="5">No products found.</td></tr>
            ) : (
              products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.description}</td>
                  <td>{p.price}</td>
                  <td>{p.quantity}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
