"use client";

import * as React from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  leftIcon?: boolean;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className = "", leftIcon = true, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative w-full">
        {leftIcon && (
          <Lock className="w-4 h-4 text-[var(--text-light)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        )}
        <input
          {...props}
          ref={ref}
          type={showPassword ? "text" : "password"}
          className={`w-full ${
            leftIcon ? "pl-9" : "pl-3"
          } pr-10 py-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg-alt)] text-xs text-[var(--text)] placeholder-[var(--text-light)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all ${className}`}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors rounded focus:outline-none focus:ring-2 focus:ring-[var(--accent)] cursor-pointer"
          aria-label={showPassword ? "Hide password" : "Show password"}
          title={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
