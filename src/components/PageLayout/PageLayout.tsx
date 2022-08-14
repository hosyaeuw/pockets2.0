import Header from "../Header";

import styles from "./PageLayout.module.scss";

type Props = {
    title: string | React.ReactNode;
    prevPath?: string;
};

const PageLayout: React.FC<React.PropsWithChildren<Props>> = ({
    children,
    title,
    prevPath,
}) => {
    return (
        <div className={styles["page-layout-container"]}>
            <div className={styles["page-layout"]}>
                <div className={styles["page-layout__header"]}>
                    <Header title={title} prevPath={prevPath} />
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default PageLayout;
