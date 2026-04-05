import { InputHTMLAttributes, ReactNode, forwardRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  trailing?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  function Input({ label, error, trailing, ...props }, ref) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[10px] tracking-[0.2em] text-muted uppercase">
            {label}
          </label>
          {trailing}
        </div>
        <input
          ref={ref}
          {...props}
          className={`block w-full px-4 py-3 bg-transparent border text-sm text-white placeholder:text-white/20 outline-none transition-colors ${
            error
              ? "border-red-500 focus:border-red-400"
              : "border-white/15 focus:border-white/40"
          }`}
        />
        {error && (
          <p className="mt-1.5 text-xs text-red-400">{error}</p>
        )}
      </div>
    );
  },
);
