import styles from "./css/CopiarEnlace.module.css";
import React, { useRef, useEffect, useState } from "react";

interface Props {
  descarga: string;
}

const CopiarEnlace = ({ descarga }: Props) => {
  const [message, setMessage] = useState("");

  const textAreaRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMessage(descarga);
  }, [descarga]);

  const handleClick = (e: React.SyntheticEvent) => {
    if (textAreaRef.current) {
      textAreaRef.current.select();
      document.execCommand("copy");
      (e.target as HTMLElement).focus(); // Type casting a HTMLElement
      alert("enlace copiado");
    }
  };

  return (
    <div className={styles.enlace}>
      <input
        ref={textAreaRef}
        type="text"
        name="texto"
        id="texto"
        value={message}
        readOnly
      />
      <button type="button" onClick={handleClick}>
        COPIAR
      </button>
    </div>
  );
};

export { CopiarEnlace };
