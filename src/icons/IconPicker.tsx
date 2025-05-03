import { BaseIcon } from "./IconBase";
import { IIcon } from "../types";

export const IconPicker = ({ size, color }: IIcon) => {
  return (
    <BaseIcon size={size} color={color}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M11 7l6 6" />
      <path d="M4 16l11.7 -11.7a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4l-11.7 11.7h-4v-4z" />
    </BaseIcon>
  );
};
