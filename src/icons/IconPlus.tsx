import { BaseIcon } from "./IconBase";
import { IIcon } from "../types";

export const IconPlus = ({ size, color }: IIcon) => {
  return (
    <BaseIcon size={size} color={color}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 5l0 14" />
      <path d="M5 12l14 0" />
    </BaseIcon>
  );
};
