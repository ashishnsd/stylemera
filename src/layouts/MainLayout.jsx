import Overlay from "../components/Overlay";
import Modal from "../components/Modal";
import NotificationToast from "../components/NotificationToast";
import CartDrawer from "../components/CartDrawer";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Overlay />
      <Modal />
      {/* <NotificationToast /> */}
      <CartDrawer />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
