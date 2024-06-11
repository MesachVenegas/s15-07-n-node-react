"use client";

import { InputHTMLAttributes, forwardRef } from "react";


import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  sublabel?: string;
  labelClass?: string;
  error?: string;
  children?: React.ReactNode;
}

/**
 * The Input component is a controlled input and label container to be used in forms.
 *
 * @example
 * ```
 * <Input label="Email" sublabel="Sub-etiqueta" icon={faEye} labelClass="border-red"  />
 * ```
 * @param {string} label - Label string to input
 * @param {string} sublabel - Sub-label string to input
 * @param {IconDefinition} icon - FontAwesomeIcon to show on input field
 * @param {string} labelClass - class to be applied to container
 *
 * @returns {JSX.Element}  Input component with label and sublabel
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, sublabel, labelClass, className, children, error, disabled, ...props },
    ref
  ) => {
    return (
      <label
        className={cn(
          `label border-2 border-gray-400 bg-white/90 transition-colors duration-200 ease-in-out focus-within:ring-1
           ${error
            ? " border-red focus-within:border-red focus-within:ring-red"
            : "border-gray-400 focus-within:border-blue-800 focus-within:ring-blue-800"
          }`,
          labelClass
        )}
      >
        <div className="text-xs px-2">
          {label && <p>{label}</p>}
        </div>
        <div className="flex flex-nowrap items-center relative w-full px-2 gap-1">
          <input
            ref={ref}
            disabled={disabled}
            className={cn(
              "input-field w-full text-black dark:text-layout font-medium focus-visible:outline-none focus:ring-none focus-visible:ring-none focus:border-none focus-visible:ring-offset-0 placeholder:text-gray-500  dark:placeholder:text-gray-400 transition-colors duration-200 ease-in-out disable:pointer-event-none disabled:cursor-not-allowed border-none",
              className
            )}
            {...props}
          />
          <div className="grid place-content-center mr-2 text-gray-600 dark:text-slate-400">
            {children}
          </div>
        </div>
      </label>
    );
  }
);

Input.displayName = "Input";

export default Input;
