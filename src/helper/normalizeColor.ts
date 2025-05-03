export const normalizeColor = (color: `#${string}`) => {
  // delete #
  let normalColor = color.replace("#", "");

  // delete alfa
  normalColor = normalColor.substring(
    0,
    normalColor.length - (normalColor.length % 3)
  );

  // set format rrggbb
  normalColor =
    normalColor.length === 6
      ? normalColor
      : normalColor
          .split("")
          .map((x) => x + x)
          .join("");

  return "#" + normalColor;
};
