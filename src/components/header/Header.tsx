import { LinkButton } from "../buttons/LinkButton";
import { Button } from "../buttons/Button";
import styles from "./Header.module.css";
import { IconGithub } from "../../icons/IconGithub";
import { IconLinkedin } from "../../icons/IconLinkedin";
import { useContext, useEffect, useState } from "react";
import { Modal } from "../modal/Modal";
import { exportCSS } from "../../helper/exportCSS";
import { CanvasContext } from "../../context/CanvasContext";
import { ICanvasContextType } from "../../types";
import { Input } from "../input/Input";
import { IconCheck } from "../../icons/IconCheck";

export const Header = () => {
  const { bufferCtx, bufferCanvas, width, height } = useContext(
    CanvasContext
  ) as ICanvasContextType;
  const [exportModal, setExportModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cssStyle, setCssStyle] = useState<string | null>(null);
  const [pixelSize, setPixelSize] = useState(16);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);

    return () => clearTimeout(timer);
  }, [copied]);

  const handleShowModal = () => {
    setExportModal(true);

    if (!bufferCtx || isNaN(pixelSize)) return;
    setCssStyle(exportCSS({ ctx: bufferCtx, width, height, pixelSize }));
  };

  const handleCopy = () => {
    if (!cssStyle) return;

    setCopied(true);
    navigator.clipboard.writeText(cssStyle);
  };

  const handlePixelSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(e.target.value);
    setPixelSize(newValue);

    if (!bufferCtx || isNaN(newValue)) return;
    setCssStyle(
      exportCSS({ ctx: bufferCtx, width, height, pixelSize: newValue })
    );
    setCopied(false);
  };

  const handleDownload = () => {
    // const image = await fetch(imageSrc);
    // const imageBlog = await image.blob();
    // const imageURL = URL.createObjectURL(imageBlog);

    // const backup = new Image();
    // backup.src = bufferCtx.canvas.toDataURL();
    // ctx?.resetTransform();
    // ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    // ctx?.scale(scale, scale);
    // ctx?.translate(viewportPosition.x, viewportPosition.y);
    // ctx?.drawImage(backup, 0, 0, width, height, 0, 0, width, height);

    if (!bufferCanvas) return;

    // create download canvas
    const downloadCanvas = document.createElement("canvas");
    downloadCanvas.width = width * pixelSize;
    downloadCanvas.height = height * pixelSize;
    const downloadCanvasContext = downloadCanvas.getContext("2d");

    // create context 2d
    if (!downloadCanvasContext) return;
    downloadCanvasContext.imageSmoothingEnabled = false;

    // get image and draw on canvas
    const backup = new Image();
    backup.src = bufferCanvas.toDataURL();
    downloadCanvasContext?.scale(pixelSize, pixelSize);
    downloadCanvasContext?.drawImage(
      backup,
      0,
      0,
      width,
      height,
      0,
      0,
      width,
      height
    );

    // download image
    const imageURL = downloadCanvas?.toDataURL();
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "image file name here";
    link.click();
  };

  return (
    <header className={styles.header}>
      <h1>ShadowPixels 2.0</h1>
      <nav>
        <ul>
          <li>
            <LinkButton
              href="https://github.com/Cesar-CARV"
              target="_blank"
              title="View Github"
              color="grey"
            >
              <IconGithub size={16} />
              <span>Github</span>
            </LinkButton>
          </li>
          <li>
            <LinkButton
              href="https://www.linkedin.com/in/cesar-ruiz-v/"
              target="_blank"
              title="View linkedin"
              color="blue"
            >
              <IconLinkedin size={16} />
              <span>Linkedin</span>
            </LinkButton>
          </li>
          <li>
            <span className={styles.line}></span>
          </li>
          <li>
            <Button title="button test" color="green" onClick={handleShowModal}>
              Export
            </Button>
          </li>
        </ul>
      </nav>

      <Modal
        open={exportModal}
        close={() => setExportModal(false)}
        title="Export"
      >
        <div>
          <div className={styles["header-modal-controls"]}>
            <Input
              type="number"
              title="pixel size"
              placehoder="8"
              min={1}
              value={pixelSize || ""}
              onChange={handlePixelSize}
            ></Input>
            <Button
              title="copy code"
              color={copied ? "green" : "blue"}
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  Copied <IconCheck size={16} />
                </>
              ) : (
                "Copy"
              )}
            </Button>
            <Button title="copy code" color="grey" onClick={handleDownload}>
              download as png
            </Button>
          </div>
          <p style={{ color: "var(--color-green)" }}>
            <code>{cssStyle}</code>
          </p>
        </div>
      </Modal>
    </header>
  );
};
