import classNames from "classnames";
import { Modal, Content, Text } from "../";

import styles from "./PocketsModal.module.scss";

type Props = {
    show: boolean;
    onClose: () => void;
    className?: string;
    title?: string;
};

const PocketsModal: React.FC<React.PropsWithChildren<Props>> = ({
    children,
    show,
    onClose,
    className,
    title,
}) => {
    return (
        <Modal onClose={onClose} show={show}>
            <Content className={classNames(styles.modal, className)}>
                <button
                    className={styles["modal__close-btn"]}
                    onClick={onClose}
                >
                    <Text color="secondary" size="l">
                        &times;
                    </Text>
                </button>
                {!!title && (
                    <Text align="center" size="xl">
                        <b>{title}</b>
                    </Text>
                )}
                <div className={styles.modal__content}>{children}</div>
            </Content>
        </Modal>
    );
};

export default PocketsModal;
