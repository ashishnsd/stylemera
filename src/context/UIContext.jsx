import { createContext, useState } from "react";

export const UIContext = createContext();

export function UIProvider({ children }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isToastOpen, setToastOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({ design: [], color: [], price: [] });
  const [showFilters, setShowFilters] = useState(false);

  const overlayVisible = isModalOpen || isMobileMenuOpen || isCartOpen || isSidebarOpen;

  return (
    <UIContext.Provider
      value={{
        isModalOpen,
        setModalOpen,
        isToastOpen,
        setToastOpen,
        isMobileMenuOpen,
        setMobileMenuOpen,
        isCartOpen,
        setCartOpen,
        activeAccordion,
        setActiveAccordion,
        isSidebarOpen,
        setSidebarOpen,
        selectedCategory,
        setSelectedCategory,
        selectedFilters,
        setSelectedFilters,
        showFilters,
        setShowFilters,
        overlayVisible
      }}
    >
      {children}
    </UIContext.Provider>
  );
}
