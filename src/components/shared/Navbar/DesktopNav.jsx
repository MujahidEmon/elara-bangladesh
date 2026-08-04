import Link from "next/link";
import NavigationLinks from "./NavigationLinks";

const DesktopNav = ({ categories }) => {
  return (
    <nav className="hidden bg-[#fcab35] transition-all duration-300 lg:block">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-center gap-7 overflow-x-auto px-4">

        <NavigationLinks categories={categories} />

      </div>
    </nav>
  );
};

export default DesktopNav;