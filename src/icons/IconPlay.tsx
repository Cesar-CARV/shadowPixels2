import { BaseIcon } from "./IconBase";
import { IIcon } from "../types";

export const IconPlay = ({ size, color }: IIcon) => {
  return (
    <BaseIcon size={size} color={color}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7 4v16l13 -8z" />
    </BaseIcon>
  );
};
