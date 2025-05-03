import { BaseIcon } from "./IconBase";
import { IIcon } from "../types";

export const IconZoom = ({ size, color }: IIcon) => {
  return (
    <BaseIcon size={size} color={color}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
      <path d="M7 10l6 0" />
      <path d="M10 7l0 6" />
      <path d="M21 21l-6 -6" />
    </BaseIcon>
  );
};
