import Overlay from "../components/Overlay";
import Modal from "../components/Modal";
import NotificationToast from "../components/NotificationToast";
import CartDrawer from "../components/CartDrawer";
import Header from "../components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";

export default function MainLayout() {
  const location = useLocation();
  const isPerfumeLanding = location && location.pathname === '/perfume';

  return (
    <div className={`min-h-screen flex flex-col ${isPerfumeLanding ? '' : 'bg-gray-50'}`} style={isPerfumeLanding ? { background: '#0a0a0a', color: '#f8f8f8' } : undefined}>
      <Overlay />
      {/* Modal should not open on PerfumeLanding page */}
      {!isPerfumeLanding && <Modal />}
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
