import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/Button";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <Link to="/app" className="text-lg font-black tracking-tight text-slate-900">
            P/W Digital
          </Link>

          <nav className="flex items-center gap-1 rounded-xl bg-slate-100 p-1">
            <NavLink
              to="/app"
              end
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? "bg-white text-slate-900" : "text-slate-600"}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/app/empresa"
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? "bg-white text-slate-900" : "text-slate-600"}`
              }
            >
              Empresa
            </NavLink>
            <NavLink
              to="/app/produtos"
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? "bg-white text-slate-900" : "text-slate-600"}`
              }
            >
              Produtos
            </NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <div className="text-right text-xs text-slate-500">
              <p>{user?.name}</p>
              <p className="font-semibold text-slate-700">Plano {user?.plan}</p>
            </div>
            <Button variant="ghost" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
