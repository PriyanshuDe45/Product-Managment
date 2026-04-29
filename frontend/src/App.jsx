import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './api';
import Nav from './Nav';
import Login from './Login';
import AdminProducts from './AdminProducts';
import AdminCompanies from './AdminCompanies';
import ProductForm from './ProductForm';
import CompanyForm from './CompanyForm';
import CompanyView from './CompanyView';
import GtinVerify from './GtinVerify';
import PublicProduct from './PublicProduct';

function AdminRoute({ children }) {
  const isAdmin = useAuth();
  if (isAdmin === null) return <p>Loading...</p>;
  return isAdmin ? children : <Navigate to="/02_module_b/login" />;
}

export default function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/02_module_b/login" element={<Login />} />
        <Route path="/02_module_b/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
        <Route path="/02_module_b/products/new" element={<AdminRoute><ProductForm /></AdminRoute>} />
        <Route path="/02_module_b/products/:gtin" element={<AdminRoute><ProductForm /></AdminRoute>} />
        <Route path="/02_module_b/companies" element={<AdminRoute><AdminCompanies /></AdminRoute>} />
        <Route path="/02_module_b/companies/new" element={<AdminRoute><CompanyForm /></AdminRoute>} />
        <Route path="/02_module_b/companies/:id" element={<AdminRoute><CompanyView /></AdminRoute>} />
        <Route path="/02_module_b/companies/:id/edit" element={<AdminRoute><CompanyForm /></AdminRoute>} />
        <Route path="/02_module_b/verify" element={<GtinVerify />} />
        <Route path="/02_module_b/01/:gtin" element={<PublicProduct />} />
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h1>Product Management System</h1>
      <p><a href="/02_module_b/verify">GTIN Bulk Verification</a></p>
      <p><a href="/02_module_b/login">Admin Login</a></p>
    </div>
  );
}
