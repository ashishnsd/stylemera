import { useContext } from "react";
import { UIContext } from "../../context/UIContext";

export default function MobileNav() {
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
        {["Men's", "Women's", "Jewelry", "Perfume"].map((title) => (
          <li className="menu-category border-b border-gray-200" key={title}>
            <button
              className={`accordion-menu w-full flex justify-between items-center ${
                activeAccordion === title ? "active" : ""
              }`}
              onClick={() =>
                setActiveAccordion(activeAccordion === title ? null : title)
              }
            >
              <p className="menu-title text-gray-800 text-[16px] font-medium py-3">{title}</p>
              <div className="text-sm">
                <span 
                  className={`add-icon ${
                    activeAccordion === title ? 'hidden' : 'block'
                  }`}
                >
                  <ion-icon 
                    name="add-outline" 
                    style={{ 
                      fontSize: '18px',
                      color: 'var(--onyx)',
                      '--ionicon-stroke-width': '90px' 
                    }}
                  ></ion-icon>
                </span>
                <span 
                  className={`remove-icon ${
                    activeAccordion === title ? 'block' : 'hidden'
                  }`}
                >
                  <ion-icon 
                    name="remove-outline"
                    style={{ 
                      fontSize: '18px',
                      color: 'var(--onyx)',
                      '--ionicon-stroke-width': '90px' 
                    }}
                  ></ion-icon>
                </span>
              </div>
            </button>

            <ul
              className={`submenu-category-list ml-2.5 overflow-hidden transition-all duration-500 ${
                activeAccordion === title ? 'max-h-[148px] visible' : 'max-h-0 invisible'
              }`}
            >
              <li className="submenu-category">
                <a 
                  className="submenu-title block py-1.5 text-[16px] text-gray-500 font-light hover:text-gray-700" 
                  href="#"
                >
                  Item 1
                </a>
              </li>
              <li className="submenu-category">
                <a 
                  className="submenu-title block py-1.5 text-[16px] text-gray-500 font-light hover:text-gray-700" 
                  href="#"
                >
                  Item 2
                </a>
              </li>
            </ul>
          </li>
        ))}
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
