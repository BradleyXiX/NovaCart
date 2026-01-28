import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "lucide-react";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 border-b bg-base-100/80 backdrop-blur-lg border-base-content/10">
      <div className="mx-auto max-w-7xl">
        <div className="navbar px-4 min-h-[4rem] justify-between">
          {/* LOGO */}
          <div className="flex-1 lg:flex-none">
            <Link to="/" className="transition-opacity hover:opacity-80">
              <div className="flex items-center gap-2">
                <ShoppingCartIcon className="size-9 text-primary" />
                <span className="font-mono text-2xl font-bold tracking-widest text-primary">
                  NovaCart
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
