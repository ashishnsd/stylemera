import { useEffect } from "react";
import Banner from "../components/Banner/Banner";
import CategoryScroller from "../components/Category/CategoryScroller";
import ProductGrid from "../components/Product/ProductGrid";
import TrendingProducts from "../components/Product/TrendingProducts";
import CartNotification from "../components/CartNotification";
import DealOfDay from "../components/DealOfDay/DealOfDay";

export default function Home() {
  return (
    <>
      {/* Cart Notification */}
      <CartNotification />

      {/* Section 1: Banner - Default Background */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100">
        <Banner />
      </div>

      {/* Section 2: Categories - Light Pink */}
      <div className="bg-gradient-to-r from-pink-50 via-white to-pink-50">
        <CategoryScroller />
      </div>

      {/* Section 3: Trending & Deals - Light Gray */}
      <div className="py-8 lg:py-12 bg-gradient-to-br from-gray-100 to-gray-50">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="w-full space-y-8">
            <ProductGrid title="New Products" />
            <DealOfDay />
          </div>
        </div>
      </div>

      {/* Section 4: Trending Products - Light Gray */}
      <div className="py-8 lg:py-12 bg-gradient-to-br from-gray-100 to-gray-50">
        <div className="container mx-auto px-2 sm:px-4">
          <TrendingProducts />
        </div>
      </div>
    </>
  );
}
