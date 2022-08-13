import styles from "./Input.module.scss";

type Props = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {};

const Input: React.FC<Props> = ({ ...other }) => {
    return <input {...other} className={styles.input} />;
};

export default Input;
