import { useNavigate } from "react-router-dom";
import { ShieldX, ArrowLeft } from "lucide-react";

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <ShieldX className="w-10 h-10 text-red-500 dark:text-red-400" />
          </div>
        </div>

        <p className="text-sm font-semibold text-red-500 dark:text-red-400 uppercase tracking-widest mb-2">
          403 — Forbidden
        </p>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Access denied
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          You don't have the required permissions to view this page. Contact
          your administrator if you believe this is a mistake.
        </p>

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-2.5 rounded-lg transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Go back
        </button>
      </div>
    </div>
  );
}
