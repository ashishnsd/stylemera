import logo from "../../assets/images/logo/logo.svg";
import paymentImg from "../../assets/images/payment.png";
import { useRef } from "react";

export default function Footer() {
  const footerRef = useRef(null);

  const footerCategories = [
    { name: "Fashion", icon: "shirt-outline" },
    { name: "Electronics", icon: "phone-portrait-outline" },
    { name: "Cosmetics", icon: "sparkles-outline" },
    { name: "Health", icon: "heart-outline" },
    { name: "Best Sellers", icon: "trophy-outline" }
  ];

  const footerProducts = [
    { name: "Prices Drop", icon: "pricetag-outline" },
    { name: "New Products", icon: "star-outline" },
    { name: "Best Sales", icon: "trending-up-outline" },
    { name: "Contact Us", icon: "mail-outline" }
  ];

  const footerServices = [
    { name: "Fast Shipping", icon: "rocket-outline" },
    { name: "Easy Returns", icon: "refresh-outline" },
    { name: "24/7 Support", icon: "headset-outline" },
    { name: "Secure Payment", icon: "lock-closed-outline" }
  ];

  const footerCompany = [
    { name: "Delivery", icon: "car-outline" },
    { name: "Legal Notice", icon: "document-outline" },
    { name: "Terms & Conditions", icon: "checkbox-outline" },
    { name: "Wishlist", icon: "heart-outline" },
    { name: "Help", icon: "help-circle-outline" }
  ];

  const socialLinks = [
    { name: "Facebook", icon: "logo-facebook", color: "#1877f2" },
    { name: "Twitter", icon: "logo-twitter", color: "#1da1f2" },
    { name: "Instagram", icon: "logo-instagram", color: "#e4405f" },
    { name: "LinkedIn", icon: "logo-linkedin", color: "#0077b5" }
  ];

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-gradient-to-b from-black via-[#0a0a0a] to-[#1a1a2e] mt-16 md:mt-24 lg:mt-32 w-full">
      {/* Background Logo Layer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={logo}
            alt=""
            aria-hidden="true"
            className="w-[90%] max-w-[900px] opacity-[0.18] blur-[0.5px]"
          />
        </div>
      </div>
      <div className="w-full px-2 sm:px-4 py-8 md:py-12 lg:py-16">
        <div className="container mx-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-6 mb-6">
          
          {/* Brand Section */}
          <div className="col-span-3 md:col-span-2 lg:col-span-2">
            <div className="group flex flex-row items-start gap-3 md:gap-4">
              <img
                src={logo}
                alt="StyleMera logo"
                className="max-w-[60px] h-auto flex-shrink-0 transition-all duration-300 group-hover:scale-110 filter brightness-110 drop-shadow-lg"
              />
              <div className="flex-1">
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-2 md:mb-3">
                  Your ultimate destination for fashion, electronics, cosmetics and more. Quality products with amazing prices delivered fast!
                </p>
                
                <div className="flex gap-2 md:gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      className="group/social relative w-9 md:w-12 h-9 md:h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-[#f0c14b]/50 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${social.color}20, ${social.color}10)`
                      }}
                      aria-label={social.name}
                    >
                      <ion-icon name={social.icon} className="text-lg md:text-xl transition-all duration-300 group-hover/social:scale-125" style={{color: social.color}}></ion-icon>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Categories Section */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <FooterSection title="CATEGORIES" items={footerCategories} />
          </div>

          {/* Products Section */}
          <div className="hidden md:block col-span-1 md:col-span-1 lg:col-span-1">
            <FooterSection title="PRODUCTS" items={footerProducts} />
          </div>

          {/* Services Section */}
          <div className="col-span-1 md:hidden lg:hidden">
            <FooterSection title="SERVICES" items={footerServices} />
          </div>

          {/* Company Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h3 className="text-white font-bold text-sm md:text-base uppercase tracking-wider mb-3">
              COMPANY
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
              {footerCompany.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="group flex items-center gap-2 py-1.5 hover:text-[#f0c14b] transition-colors duration-200"
                >
                  <span className="text-[#f0c14b] text-sm">•</span>
                  <span className="text-gray-300 text-xs md:text-sm">{item.name}</span>
                </a>
              ))}
            </div>
          </div>
          
        </div>

        {/* Bottom Section */}
        <div className="pt-4 md:pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
            {/* Payment Methods */}
            <div className="text-center md:text-left">
              <p className="text-white font-bold text-sm uppercase tracking-wider mb-3">
                Secure Payment
              </p>
              <img
                src={paymentImg}
                alt="payment methods"
                className="max-w-[220px] mx-auto md:mx-0 opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>

            {/* Newsletter */}
            <div className="md:col-span-2 lg:col-span-1">
              <p className="text-white font-bold text-sm uppercase tracking-wider mb-3">
                Newsletter
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#f0c14b] transition-colors"
                />
                <button className="px-4 py-2.5 bg-gradient-to-r from-[#f0c14b] to-[#e5b43c] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#f0c14b]/30 transition-all duration-300 hover:scale-105">
                  <ion-icon name="send-outline" className="text-lg"></ion-icon>
                </button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-3">
            <p className="text-gray-400 text-sm mb-2">
              &copy; {new Date().getFullYear()} <span className="text-[#f0c14b] font-bold">StyleMera</span>. All Rights Reserved.
            </p>
            <div className="flex justify-center gap-2 flex-wrap text-xs text-gray-500 mb-4 pb-4">
              <a href="#" className="hover:text-[#f0c14b] transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-[#f0c14b] transition-colors">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-[#f0c14b] transition-colors">Cookie Settings</a>
            </div>
            <p className="text-gray-500 text-xs flex items-center justify-center gap-1">
              Developed with <ion-icon name="heart" style={{color: '#f0c14b'}}></ion-icon> by <span className="font-bold text-[#f0c14b]">ASHISH</span>
            </p>
          </div>
        </div>
      </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

      `}</style>
    </footer>
  );
}

// Footer Section Component
function FooterSection({ title, items }) {
  return (
    <div>
      <h3 className="text-white font-bold text-sm md:text-base uppercase tracking-wider mb-3">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
        {items.map((item, index) => (
          <a
            key={index}
            href="#"
            className="group flex items-center gap-2 py-1.5 hover:text-[#f0c14b] transition-colors duration-200"
          >
            <span className="text-[#f0c14b] text-sm">•</span>
            <span className="text-gray-300 text-xs md:text-sm">{item.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
