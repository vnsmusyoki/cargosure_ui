import { useNavigate } from "react-router-dom";
import { LogIn, ShieldOff } from "lucide-react";

export default function UnauthenticatedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
            <ShieldOff className="w-10 h-10 text-amber-500 dark:text-amber-400" />
          </div>
        </div>

        <p className="text-sm font-semibold text-amber-500 dark:text-amber-400 uppercase tracking-widest mb-2">
          Session Expired
        </p>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
          You're not logged in
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Your session has expired or you haven't signed in yet. Please log in
          to continue.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-2.5 rounded-lg transition"
        >
          <LogIn className="w-4 h-4" />
          Go to Login
        </button>
      </div>
    </div>
  );
}
