import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import StatsPage from "./pages/StatsPage";
import EditProduct from "./pages/EditProduct";
import BrowseProducts from "./pages/BrowseProducts";
import ProtectedRoute from "./components/ProtectedRoute";
import BuyerOrders from "./pages/BuyerOrders";
import AdminRequestList from './pages/AdminRequestList';
import ProductRequestForm from './pages/ProductRequestForm';
import SellerRequestList from './pages/SellerRequestList';
import MyOffers from './pages/MyOffers';
import Home from './pages/Home';
import { Toaster } from "react-hot-toast";


const allRoles = ["Admin", "Seller", "Buyer", "Owner"];
const sellerRoles = ["Seller"];
const adminSellerRoles = ["Admin", "Seller"];
const buyerRoles = ["Buyer"];
const ownerRoles = ["Owner"];
const adminRoles = ["Admin"];

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* Shared Authenticated Route */}
        <Route element={<ProtectedRoute allowedRoles={allRoles} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Seller Only */}
        <Route element={<ProtectedRoute allowedRoles={sellerRoles} />}>
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/seller-requests" element={<SellerRequestList />} />
          <Route path="/seller/my-offers" element={<MyOffers />} />
        </Route>

        {/* Admin + Seller Access */}
        <Route element={<ProtectedRoute allowedRoles={adminSellerRoles} />}>
          <Route path="/edit-product/:id" element={<EditProduct />} />
        </Route>

        {/* Buyer Only */}
        <Route element={<ProtectedRoute allowedRoles={buyerRoles} />}>
          <Route path="/browse" element={<BrowseProducts />} />
          <Route path="/my-orders" element={<BuyerOrders />} />
          <Route path="/product-request" element={<ProductRequestForm />} />
        </Route>

        {/* Owner Only */}
        <Route element={<ProtectedRoute allowedRoles={ownerRoles} />}>
          <Route path="/owner-stats" element={<StatsPage />} />
        </Route>

        {/* Admin Only */}
        <Route element={<ProtectedRoute allowedRoles={adminRoles} />}>
          <Route path="/admin-requests" element={<AdminRequestList />} />
        </Route>
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
