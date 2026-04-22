import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  isLoading?: boolean;
};

export function Button({ className, variant = "primary", isLoading, children, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50",
        {
          "bg-slate-900 text-white hover:bg-slate-800": variant === "primary",
          "bg-amber-200 text-slate-900 hover:bg-amber-300": variant === "secondary",
          "bg-transparent text-slate-700 hover:bg-slate-100": variant === "ghost",
          "bg-red-600 text-white hover:bg-red-500": variant === "danger"
        },
        className
      )}
      {...props}
    >
      {isLoading ? "Processando..." : children}
    </button>
  );
}
