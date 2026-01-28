import { useContext } from "react";
import { UIContext } from "../context/UIContext";

export default function Overlay() {
  const {
    overlayVisible,
    setModalOpen,
    setMobileMenuOpen,
    setCartOpen,
    setSidebarOpen
  } = useContext(UIContext);

  if (!overlayVisible) return null;

  return (
    <div
      className="overlay active fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 opacity-100"
      onClick={() => {
        setModalOpen(false);
        setMobileMenuOpen(false);
        setCartOpen(false);
        setSidebarOpen(false);
      }}
    />
  );
}
