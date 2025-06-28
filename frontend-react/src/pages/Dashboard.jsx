import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { CSVLink } from "react-csv";
import { toast } from 'react-hot-toast';

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState({ username: "", role: "" });
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minQty, setMinQty] = useState("");
  const [maxQty, setMaxQty] = useState("");
  const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUserData({ username: decoded.username, role: decoded.role });
      fetchProducts(token);
    } catch (err) {
      console.error("Invalid token");
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [navigate]);

  const fetchProducts = async (token) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("You have been logged out!");
    navigate("/auth");
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${BASE_URL}/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Product deleted successfully.");
        setProducts(products.filter((p) => p._id !== id));
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete product.");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());

    const withinPrice =
      (!minPrice || p.price >= parseFloat(minPrice)) &&
      (!maxPrice || p.price <= parseFloat(maxPrice));

    const withinQty =
      (!minQty || p.quantity >= parseInt(minQty)) &&
      (!maxQty || p.quantity <= parseInt(maxQty));

    return matchSearch && withinPrice && withinQty;
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 dark:bg-gray-900 p-6">
      <div className="w-full mx-auto bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md p-8">
        <div className="text-center mb-6">
          <h1 className="sm:text-2xl text-xl font-bold text-gray-800 dark:text-white">
            WELCOME, {userData.username.toUpperCase()}
          </h1>

        </div>

        {userData.role === "Seller" && (
          <>
          <div className="text-center mb-6 space-y-3 space-x-4">
            <Link to="/add-product">
              <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg mb-6">
                Add New Product
              </button>
            </Link>
            <Link to="/seller-requests">
              <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-7 rounded-lg mb-6 sm:ml-0 ml-[-15px]">
                View Requests
              </button>
            </Link>
            <Link to="/seller/my-offers">

              <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-11 sm:ml-0 ml-[-15px] rounded-lg">
                My Offers
              </button>
            </Link>
          </div>
                      <div className="text-center sm:text-right mb-6">
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg"
              >
                Logout
              </button>
            </div>
          </>
        )}


        {userData.role === "Buyer" && (
          <div>
            <div className="text-center mb-6 space-y-4 space-x-3">
              <Link to="/browse">
                <button className="bg-purple-600 hover:bg-purple-700 transition-all duration-500 text-white py-2 px-4 rounded-lg mb-6">
                  purchase Products
                </button>
              </Link>
              <Link to="/my-orders">
                <button className="bg-purple-600 hover:bg-purple-700 transition-all duration-500 text-white py-2 px-4 rounded-lg">
                  View you Orders
                </button>
              </Link>
            </div>
            <div className="text-center sm:text-right mb-6">
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {userData.role === "Owner" && (
          <div className="text-center mb-4">
            <Link to="/owner-stats">
              <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg">
                View Statistics
              </button>
            </Link>
          </div>
        )}

        {(userData.role === "Admin" || userData.role === "Owner") && products.length > 0 && (
         <div className="text-right flex flex-col sm:flex-row sm:justify-end items-center sm:items-start mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
            <CSVLink
              data={products.map(p => ({
                name: p.name,
                price: p.price,
                quantity: p.quantity,
                location: p.location,
                createdBy: p.createdBy
              }))}
              headers={[
                { label: "Product Name", key: "name" },
                { label: "Price", key: "price" },
                { label: "Quantity", key: "quantity" },
                { label: "Location", key: "location" },
                { label: "Created By", key: "createdBy" }
              ]}
              filename={"products_export.csv"}
              className="bg-purple-600 text-white  py-2  px-4 sm:py-2 sm:px-6 rounded-lg hover:bg-purple-700 mb-2"
            >
              Export to CSV
            </CSVLink>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 sm:py-2 sm:px-6 rounded-lg"
            >
              Logout
            </button>

          </div>
        )}

        {userData.role === "Admin" && (
          <>
            <div className="flex flex-wrap gap-4 justify-center mb-6">
              <input
                type="text"
                placeholder="🔍 Search by name or location"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-60 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              />
              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-40 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-40 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              />
              <input
                type="number"
                placeholder="Min Quantity"
                value={minQty}
                onChange={(e) => setMinQty(e.target.value)}
                className="w-40 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              />
              <input
                type="number"
                placeholder="Max Quantity"
                value={maxQty}
                onChange={(e) => setMaxQty(e.target.value)}
                className="w-40 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              />
            </div>

            {/* ✅ New Button to View Requests */}
            <div className="text-center mb-6">
              <Link to="/admin-requests">
                <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg">
                  View Product Requests
                </button>
              </Link>
            </div>
          </>
        )}


        {filteredProducts.length === 0 ? (
          <p className="text-gray-500">No products to display.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredProducts.map((p) => (
              <div key={p._id} className="bg-gray-100 dark:bg-gray-700 hover:shadow-gray-500 border border-gray-400 rounded-xl p-4 shadow hover:-translate-y-1 transition-transform">
                {p.imageUrl && (
                  <img
                    src={p.imageUrl}
                    alt="product image"
                    className="w-full h-48 object-contain rounded-md mb-4 "
                  />
                )}
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-gray-700">{p.name.toUpperCase()}</h3>
                  <p>Price: ₹{p.price}</p>
                  <p>Quantity: {p.quantity}</p>
                  <p>Location: {p.location}</p>
                </div>

                {(userData.role === "Admin" || (userData.role === "Seller" && p.createdBy === userData.username)) && (
                  <div className="mt-4 flex gap-2">
                    {userData.role !== "Admin" &&
                      <button
                        onClick={() => handleEdit(p._id)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                    }
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
