type Props = {};

const Box: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
    return <div>{children}</div>;
};

export default Box;
