import * as React from "react";
import { Text } from "../../../../components";
import useCategories from "../../../common/hooks/useCategories";

import styles from "./MoreExtends.module.scss";

const MoreExtends = () => {
    const { items } = useCategories();

    const moreExtendsCategory = React.useMemo(
        () => [...items].sort((a, b) => b.amount - a.amount)[0],
        [items]
    );

    return (
        <div className={styles["more-extends"]}>
            <Text size="s" color="secondary">
                Больше всего расходов
            </Text>
            <Text size="s" oneLine>
                {moreExtendsCategory?.name ?? "-"}
            </Text>
        </div>
    );
};

export default MoreExtends;
