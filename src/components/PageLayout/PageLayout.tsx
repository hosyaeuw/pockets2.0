import Header from "../Header";

import styles from "./PageLayout.module.scss";

const PageLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <div className={styles["page-layout-container"]}>
            <div className={styles["page-layout"]}>
                <div className={styles["page-layout__header"]}>
                    <Header />
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default PageLayout;
