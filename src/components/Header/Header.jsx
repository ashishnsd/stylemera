import HeaderTop from "./HeaderTop";
import HeaderMain from "./HeaderMain";
import DesktopNav from "./DesktopNav";
import MobileBottomNav from "./MobileBottomNav";
import MobileNav from "./MobileNav";

export default function Header() {
  return (
    <header>
      <HeaderTop />
      <HeaderMain />
      <DesktopNav />
      <MobileBottomNav />
      <MobileNav />
    </header>
  );
}
