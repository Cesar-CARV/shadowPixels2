interface Props {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  pixelSize?: number;
  className?: string;
}

export const exportCSS = ({
  ctx,
  width,
  height,
  pixelSize = 16,
  className,
}: Props) => {
  // set basic styles
  let cssStyle = `
    .${className ? className : "sprite"} {
     	position: relative;
	    width: ${width}em;
	    height: ${height}em;
      font-size: ${pixelSize}px;
    }

    .${className ? className : "sprite"}::after {
      content: "";
      position: absolute;
      display: block;
      top: -1em;
      left: -1em;
      width: 1em;
      height: 1em;
      background-color: transparent;
      box-shadow:`;

  // get data
  const imgData = ctx.getImageData(0, 0, width, height).data;

  const dataSpan = 4; // r g b a
  let index = 0;

  // map shadows
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const r = imgData[index]; //.toString(16).padStart(2, "0");
      const g = imgData[index + 1]; //.toString(16).padStart(2, "0");
      const b = imgData[index + 2]; //.toString(16).padStart(2, "0");
      const a = imgData[index + 3]; //.toString(16).padStart(2, "0");

      // const shadow = `${x + 1}em ${y + 1}em rgb(${r},${g},${b},${a}), `;
      if (a / 255 > 0) {
        const shadow = `${x + 1}em ${y + 1}em rgb(${r} ${g} ${b}), `;
        cssStyle += shadow;
      }
      index += dataSpan;
    }
  }

  // close cssStyle
  cssStyle = cssStyle.substring(0, cssStyle.length - 2);
  cssStyle += ";\n}";

  return cssStyle;
};
