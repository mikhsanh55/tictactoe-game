import { Children, ReactNode } from "react";

interface Props {
  text: string;
  children: ReactNode;
}

const AlertComponent = ({ text, children }: Props) => {
  return (
    <>
      <p>{text}</p>
      <div className="alert alert-primary">{children}</div>
    </>
  );
};

export default AlertComponent;
