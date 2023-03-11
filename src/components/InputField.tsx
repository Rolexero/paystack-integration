import React, { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  showPassword?: boolean;
  rightIcon?: string;
  onClickIcon?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  isError?: boolean;
  helperText?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  showPassword,
  rightIcon,
  onClickIcon,
  isError,
  helperText,
  ...props
}: InputFieldProps) => {
  return (
    <div>
      <p
        className={`mt-5 flex items-start w-full text-xs ${
          isError ? "text-red-600" : ""
        }`}
      >
        {helperText}
      </p>
      <div className="w-full flex relative">
        <input
          className={
            isError
              ? "border-[1px] border-red-600"
              : " border-[1px] border-gray-300"
          }
          {...props}
        />
        {showPassword && (
          <button
            className="absolute right-4 top-6"
            onClick={onClickIcon}
            type="button"
          ></button>
        )}
      </div>
    </div>
  );
};
