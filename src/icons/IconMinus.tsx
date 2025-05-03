import { BaseIcon } from "./IconBase";
import { IIcon } from "../types";

export const IconMinus = ({ size, color }: IIcon) => {
  return (
    <BaseIcon size={size} color={color}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l14 0" />
    </BaseIcon>
  );
};
