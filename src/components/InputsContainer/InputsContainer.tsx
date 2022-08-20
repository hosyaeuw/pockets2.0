import styles from "./InputsContainer.module.scss";

const InputsContainer: React.FC<React.PropsWithChildren> = ({ children }) => (
    <div className={styles["inputs-container"]}>{children}</div>
);

export default InputsContainer;
