import { useContext } from "react";
import { UIContext } from "../../context/UIContext";
import { useNavigate } from "react-router-dom";

export default function MobileNav() {
  const navigate = useNavigate();
  const {
    isMobileMenuOpen,
    setMobileMenuOpen,
    activeAccordion,
    setActiveAccordion
  } = useContext(UIContext);

  return (
    <nav 
      className={`mobile-navigation-menu bg-white fixed left-0 right-0 top-0 w-full max-h-[90vh] p-5 shadow-lg overflow-y-auto z-50 transition-all duration-500 rounded-b-3xl ${
        isMobileMenuOpen ? 'translate-y-0 visible' : '-translate-y-full invisible'
      }`}
      style={{
        overscrollBehavior: 'contain'
      }}
    >
      <div className="menu-top pb-4 mb-2.5 flex justify-between items-center border-b-2 border-gray-200">
        <h2 className="menu-title text-[#f0c14b] text-[18px] font-semibold">Menu</h2>
        <button 
          className="menu-close-btn text-gray-800 text-[22px]"
          onClick={() => setMobileMenuOpen(false)}
        >
          <ion-icon name="close-outline" style={{ '--ionicon-stroke-width': '50px' }}></ion-icon>
        </button>
      </div>

      <ul className="mobile-menu-category-list mb-[30px]">
        <li className="menu-category border-b border-gray-200" key="Perfume">
          <button
            className="w-full flex items-center text-gray-800 text-[16px] font-medium py-3"
            onClick={() => {
              navigate("/perfume");
              setMobileMenuOpen(false);
            }}
          >
            Perfume
          </button>
        </li>
        <li className="menu-category border-b border-gray-200" key="Watch's">
          <button
            className="w-full flex items-center text-gray-800 text-[16px] font-medium py-3"
            onClick={() => {
              navigate("/watches");
              setMobileMenuOpen(false);
            }}
          >
            Watch's
          </button>
        </li>
        {/* Only 'Perfume' remains in the menu */}
      </ul>

      <div className="menu-social-container flex justify-center items-center gap-2.5">
        {['logo-facebook', 'logo-twitter', 'logo-instagram', 'logo-linkedin'].map((icon) => (
          <a 
            key={icon}
            href="#" 
            className="social-link bg-gray-200 text-gray-800 text-xl p-2.5 rounded-md hover:bg-[#f0c14b] hover:text-white transition-colors"
          >
            <ion-icon name={icon}></ion-icon>
          </a>
        ))}
      </div>
    </nav>
  );
}
