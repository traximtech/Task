interface ButtonProps {
  children: React.ReactNode;
  type?: "submit" | "button";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button = ({
  children,
  type,
  onClick,
  disabled,
  className,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`disabled:opacity-50 disabled:cursor-not-allowed bg-black/80 hover:bg-black uppercase font-medium text-white w-1/6 py-3 rounded-xl flex items-center justify-center ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;


export const BackButton = ({
  children,
  type,
  onClick,
  disabled,
  className,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`my-4 font-medium cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};
