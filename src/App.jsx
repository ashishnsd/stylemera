import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PerfumeLanding from "./components/PerfumeLanding";

const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const CategoryProducts = lazy(() => import("./pages/CategoryProducts"));

export default function App() {
  return (
    <>
      {/* Custom Scrollbar Styles */}
      <style>{`
        body::-webkit-scrollbar {
          width: 15px;
        }

        body::-webkit-scrollbar-track {
          background: #ffffff;
          border-left: 1px solid hsl(0, 0%, 93%);
        }

        body::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #f0c14b, #f0c14b);
          border: 3px solid #fdfbf8;
          border-radius: 6px;
          box-shadow: 0 0 8px rgba(240, 193, 75, 0.3);
        }

        body::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #f0c14b, #f0c14b);
        }
      `}</style>

      <Suspense fallback={<div style={{ padding: '50px', textAlign: 'center' }}><p>Loading...</p></div>}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/category/:category" element={<CategoryProducts />} />
          </Route>
          <Route path="/perfume" element={<PerfumeLanding />} />
        </Routes>
      </Suspense>

      <style>{`
        @keyframes search-drop {
          0% { 
            transform: translateY(-20px);
            opacity: 0;
          }
          100% { 
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-search-drop {
          animation: search-drop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </>
  );
}
