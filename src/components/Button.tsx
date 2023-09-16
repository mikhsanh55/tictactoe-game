import { ReactNode } from "react";
interface Props {
  children: ReactNode;
  variant?: string;
  onButtonClick: () => void;
}

enum Variant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  WARNING = "warning",
  DANGER = "danger",
  SUCCESS = "success",
  LIGHT = "light",
  DARK = "dark",
}

function Button({ children, variant = "primary", onButtonClick }: Props) {
  return (
    <button onClick={onButtonClick} className={`btn btn-${variant}`}>
      {children}
    </button>
  );
}

export default Button;
