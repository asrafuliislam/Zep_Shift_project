import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const Forbidden = ({
  message = "You don't have permission to access this page.",
  showLogout = false,
  onLogout = null,
  homePath = "/",
  supportEmail = null,
}) => {
  const navigate = useNavigate();

  const handleGoHome = () => navigate(homePath);
  const handleContact = () => {
    if (supportEmail) {
      window.location.href = `mailto:${supportEmail}?subject=Access%20Denied%20on%20zapShift`;
    } else {
      // fallback: navigate to a support/contact route if you have one
      navigate("/contact");
    }
  };

  const handleLogout = async () => {
    if (typeof onLogout === "function") {
      try {
        await onLogout();
      } catch (err) {
        // swallow errors; optionally show toast in parent
        console.error("Logout handler failed:", err);
      }
    } else {
      // fallback: navigate to login page
      navigate("/login");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="max-w-xl w-full bg-white/90 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-lg p-8 text-center"
        role="alert"
        aria-live="polite"
      >
        <div className="mb-6 flex items-center justify-center">
          {/* simple lock / forbidden icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-red-600 dark:text-red-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect x="3" y="11" width="18" height="10" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            <line x1="9" y1="16" x2="15" y2="16" />
          </svg>
        </div>

        <h1 className="text-2xl font-semibold mb-2 text-slate-900 dark:text-slate-100">403 — Forbidden</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">{message}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleGoHome}
            className="text-white  px-4 py-2 rounded-lg border border-slate-200 dark:border-white shadow-sm hover:shadow-md transition"
            aria-label="Go to home"
          >
            Go to Home
          </button>

          <button
            onClick={handleContact}
            className="text-white px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            aria-label="Contact support"
          >
            Contact Support
          </button>

          {showLogout && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              aria-label="Sign out"
            >
              Sign Out
            </button>
          )}
        </div>

        <p className="mt-6 text-xs text-slate-400">If you think this is a mistake, contact your administrator.</p>
      </motion.div>
    </div>
  );
};

export default Forbidden;
