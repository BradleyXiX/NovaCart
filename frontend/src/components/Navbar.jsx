import { Link, useResolvedPath } from "react-router-dom";
import { ShoppingBagIcon, ShoppingCartIcon, UserCircleIcon, LogInIcon, LogOutIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import LoginModal from "./LoginModal";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { pathname } = useResolvedPath();
  const { testAdminLogin, isAuthenticated, user, signOut } = useAuthStore();
  const isHomePage = pathname === "/"
  return (
    <div className="sticky top-0 z-50 border-b bg-base-100/80 backdrop-blur-lg border-base-content/10">
      <div className="mx-auto max-w-7xl">
        <div className="navbar px-4 min-h-[4rem] justify-between">
          {/* LOGO */}
          <div className="flex-1 lg:flex-none">
            <Link to="/" className="transition-opacity hover:opacity-80">
              <div className="flex items-center gap-2">
                <ShoppingCartIcon className="size-9 text-primary" />
                <span className="font-mono text-2xl font-semibold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  NovaCart
                </span>
              </div>
            </Link>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            <ThemeSelector />

            {isHomePage && (
              <div className="indicator">
                <div className="p-2 transition-colors rounded-full hover:bg-base-200">
                  <ShoppingBagIcon className="size-5" />
                  <span className="badge badge-sm badge-primary indicator-item">8
                  </span>
                </div>   
              </div>
            )}

            {/* TEST ADMIN BUTTON - REMOVE IN PRODUCTION */}
            {import.meta.env.MODE === "development" && (
              <button 
                className="btn btn-xs btn-ghost gap-2"
                onClick={testAdminLogin}
                title="Test admin login (for development only)"
              >
                <LogInIcon className="size-4" />
                Test Admin
              </button>
            )}

            {isAuthenticated ? (
              <div className="dropdown dropdown-end">
                <button className="p-2 transition-colors rounded-full hover:bg-base-200 cursor-pointer">
                  <UserCircleIcon className="size-6"/>
                </button>
                <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li className="menu-title">
                    <span>{user?.name}</span>
                  </li>
                  <li><a>{user?.email}</a></li>
                  {user?.isAdmin && (
                    <li><a className="badge badge-primary">Admin</a></li>
                  )}
                  <li>
                    <a onClick={signOut} className="text-error">
                      <LogOutIcon className="size-4" />
                      Sign Out
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <button 
                className="p-2 transition-colors rounded-full hover:bg-base-200 cursor-pointer"
                onClick={() => document.getElementById("login_modal").showModal()}
              >
                <UserCircleIcon className="size-6"/>
              </button>
            )}
          </div>

        </div>
      </div>

      <LoginModal />
    </div>
  );
};

export default Navbar;
