import { useState } from "react";
import { Mail, Lock, User, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

function LoginModal() {
  const [activeTab, setActiveTab] = useState("signin");
  const { authFormData, setAuthFormData, signIn, signUp, loading } =
    useAuthStore();



  return (
    <dialog id="login_modal" className="modal">
      <div className="modal-box">
        {/* CLOSE BUTTON */}
        <form method="dialog">
          <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
            <X/>
          </button>
        </form>

        {/* MODAL HEADER WITH TABS */}
        <h3 className="mb-8 text-xl font-bold text-primary">Welcome to NovaCart</h3>

        <div className="mb-8 border-b tabs border-base-300">
          <button
            className={`tab tab-lg ${activeTab === "signin" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("signin")}
          >
            Sign In
          </button>
          <button
            className={`tab tab-lg ${activeTab === "signup" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* SIGN IN TAB */}
        {activeTab === "signin" && (
          <form onSubmit={signIn} className="space-y-6">
            <div className="space-y-4">
              {/* EMAIL INPUT */}
              <div className="form-control">
                <label className="label">
                  <span className="text-base font-medium label-text">Email</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-base-content/50">
                    <Mail className="size-5" />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full py-3 pl-10 transition-colors duration-200 input input-bordered focus:input-primary"
                    value={authFormData.email}
                    onChange={(e) =>
                      setAuthFormData({ ...authFormData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* PASSWORD INPUT */}
              <div className="form-control">
                <label className="label">
                  <span className="text-base font-medium label-text">
                    Password
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-base-content/50">
                    <Lock className="size-5" />
                  </div>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full py-3 pl-10 transition-colors duration-200 input input-bordered focus:input-primary"
                    value={authFormData.password}
                    onChange={(e) =>
                      setAuthFormData({
                        ...authFormData,
                        password: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
            </div>

            {/* MODAL ACTIONS */}
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-ghost">Cancel</button>
              </form>
              <button
                type="submit"
                className="btn btn-primary min-w-[120px]"
                disabled={
                  !authFormData.email ||
                  !authFormData.password ||
                  loading
                }
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>
        )}

        {/* SIGN UP TAB */}
        {activeTab === "signup" && (
          <form onSubmit={signUp} className="space-y-6">
            <div className="space-y-4">
              {/* NAME INPUT */}
              <div className="form-control">
                <label className="label">
                  <span className="text-base font-medium label-text">
                    Full Name
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-base-content/50">
                    <User className="size-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full py-3 pl-10 transition-colors duration-200 input input-bordered focus:input-primary"
                    value={authFormData.name}
                    onChange={(e) =>
                      setAuthFormData({ ...authFormData, name: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* EMAIL INPUT */}
              <div className="form-control">
                <label className="label">
                  <span className="text-base font-medium label-text">Email</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-base-content/50">
                    <Mail className="size-5" />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full py-3 pl-10 transition-colors duration-200 input input-bordered focus:input-primary"
                    value={authFormData.email}
                    onChange={(e) =>
                      setAuthFormData({ ...authFormData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* PASSWORD INPUT */}
              <div className="form-control">
                <label className="label">
                  <span className="text-base font-medium label-text">
                    Password
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-base-content/50">
                    <Lock className="size-5" />
                  </div>
                  <input
                    type="password"
                    placeholder="Create a password"
                    className="w-full py-3 pl-10 transition-colors duration-200 input input-bordered focus:input-primary"
                    value={authFormData.password}
                    onChange={(e) =>
                      setAuthFormData({
                        ...authFormData,
                        password: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
            </div>

            {/* MODAL ACTIONS */}
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-ghost">Cancel</button>
              </form>
              <button
                type="submit"
                className="btn btn-primary min-w-[120px]"
                disabled={
                  !authFormData.name ||
                  !authFormData.email ||
                  !authFormData.password ||
                  loading
                }
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* BACKDROP */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default LoginModal;