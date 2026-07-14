import { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react";

// --- INPUT COMPONENT ---
type InputProps = {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
} & ComponentPropsWithoutRef<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5 w-full text-left">
        {label && (
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={[
              "w-full px-4 py-3 rounded-xl border text-gray-900 placeholder-gray-400 bg-gray-50/50 text-sm transition-all focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600",
              icon ? "pl-11" : "",
              error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-200",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-600 font-semibold">{error}</p>}
        {helperText && !error && <p className="text-xs text-gray-400">{helperText}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

// --- TEXTAREA COMPONENT ---
type TextAreaProps = {
  label?: string;
  error?: string;
  helperText?: string;
} & ComponentPropsWithoutRef<"textarea">;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5 w-full text-left">
        {label && (
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={[
            "w-full px-4 py-3 rounded-xl border text-gray-900 placeholder-gray-400 bg-gray-50/50 text-sm transition-all focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600",
            error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-200",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />
        {error && <p className="text-xs text-red-600 font-semibold">{error}</p>}
        {helperText && !error && <p className="text-xs text-gray-400">{helperText}</p>}
      </div>
    );
  }
);
TextArea.displayName = "TextArea";

// --- SELECT COMPONENT ---
type SelectProps = {
  label?: string;
  error?: string;
  helperText?: string;
  options?: { value: string; label: string }[];
} & ComponentPropsWithoutRef<"select">;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, className, children, ...props }, ref) => {
    return (
      <div className="space-y-1.5 w-full text-left">
        {label && (
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={[
            "w-full px-4 py-3 rounded-xl border text-gray-900 bg-gray-50/50 text-sm transition-all focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600",
            error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-200",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        >
          {children || (
            <>
              <option value="">-- Pilih --</option>
              {options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </>
          )}
        </select>
        {error && <p className="text-xs text-red-600 font-semibold">{error}</p>}
        {helperText && !error && <p className="text-xs text-gray-400">{helperText}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";

export default Input;
