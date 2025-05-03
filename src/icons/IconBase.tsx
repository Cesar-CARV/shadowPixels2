import { IIconBase } from "../types";

export const BaseIcon = ({ children, size, color }: IIconBase) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size ? size : 24}
      height={size ? size : 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color ? color : "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
};
