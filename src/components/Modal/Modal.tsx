import React from "react";
import ReactDOM from "react-dom";

import styles from "./Modal.module.scss";

type Props = {
    show: boolean;
    onClose: () => void;
};

const el = document.getElementById("root");

const Modal: React.FC<React.PropsWithChildren<Props>> = ({
    children,
    show,
    onClose,
}) => {
    const stopProp = React.useCallback((e: React.MouseEvent) => e.stopPropagation(), []);

    if (!el || !show) {
        return null;
    }

    return ReactDOM.createPortal(
        <div className={styles["modal-container"]} onClick={onClose}>
            <div className={styles.modal} onClick={stopProp}>
                {children}
            </div>
        </div>,
        el
    );
};

export default Modal;
