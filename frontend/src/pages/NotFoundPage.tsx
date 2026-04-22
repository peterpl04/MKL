import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <h1 className="text-3xl font-black text-slate-900">Página não encontrada</h1>
        <p className="mt-3 text-sm text-slate-600">O link pode ter expirado ou foi digitado incorretamente.</p>
        <Link to="/" className="mt-6 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
          Ir para início
        </Link>
      </div>
    </main>
  );
}
