import React, { useEffect, useState } from "react";
import styles from "./modal.module.css";
import { useSelector } from "react-redux";

const Modal = ({ isOpen, handleClose, children }) => {
  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../../components/themes/${colors}`);

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    if (!isOpen) document.body.style.overflow = "scroll";
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      let timeOut = setTimeout(() => {
        setShow(true);
      }, 100);

      return () => clearTimeout(timeOut);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  const handleCloseModal = () => {
    handleClose();
  };

  // if (!isOpen) return null;

  return (
    <>
      <div
        className={show ? styles.dark_bg_on : styles.dark_bg_off}
        onClick={() => handleCloseModal()}
      ></div>
      <div
        style={{ backgroundColor: colorFiles.secondaryBackgroundColor }}
        className={show ? styles.modal_open : styles.modal_closed}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
