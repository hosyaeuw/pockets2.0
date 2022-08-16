import React from "react";
import { Button, Plate, Text } from "../../../../components";
import useModal from "../../hooks/useModal";
import useTransactions, { TransactionType } from "../../hooks/useTransactions";
import { Modal } from "../Transactions/components";

import styles from "./GlobalPlates.module.scss";

const GlobalPlates = () => {
    const { global } = useTransactions();

    const { showModal, toggleShowModalHandler } = useModal();
    const startTab = React.useRef<TransactionType>("income");

    return (
        <div className={styles["global-plates"]}>
            {showModal && (
                <Modal
                    show={showModal}
                    startTab={startTab.current}
                    onClose={toggleShowModalHandler}
                />
            )}
            <Plate
                title="Доходы"
                rightComponent={
                    <div className={styles["global-plates__right"]}>
                        <Button
                            variant="ghost"
                            onClick={() => {
                                startTab.current = "income";
                                toggleShowModalHandler();
                            }}
                        >
                            <Text size="xl" color="primary">
                                +
                            </Text>
                        </Button>
                        <Text size="l">
                            <b>{global.income}</b>
                        </Text>
                    </div>
                }
            />
            <Plate
                title="Расходы"
                rightComponent={
                    <div className={`${styles["global-plates__right"]} ${styles["global-plates__right_minus"]}`}>
                        <Button
                            variant="ghost"
                            onClick={() => {
                                startTab.current = "expense";
                                toggleShowModalHandler();
                            }}
                        >
                            <Text size="xl" color="primary">
                                -
                            </Text>
                        </Button>
                        <Text size="l">
                            <b>{global.expense}</b>
                        </Text>
                    </div>
                }
            />
        </div>
    );
};

export default GlobalPlates;
