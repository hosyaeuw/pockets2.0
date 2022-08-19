import React from "react";
import { EllipsisIcon, GoalImg } from "../../../../assets";
import { Button, Content, Text } from "../../../../components";
import useGoals, { TGoal } from "../../../common/hooks/useGoals";
import useModal from "../../../common/hooks/useModal";
import { Modal } from "../../../Dashboard/components/Goals/components";
import { GoalCardWithModal } from "./components";
import styles from "./Goals.module.scss";

const GoalCardButton: React.FC<{ item: TGoal }> = ({ item }) => {
    const { deleteGoal } = useGoals();
    const { showModal, toggleShowModalHandler } = useModal();

    const onDeleteHandler = React.useCallback(() => {
        deleteGoal(item.id);
        toggleShowModalHandler();
    }, [item.id, deleteGoal, toggleShowModalHandler]);

    return (
        <div
            style={{
                height: 34,
                width: 34,
                background: "#17181C",
                borderRadius: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    position: "relative",
                }}
            >
                <Button variant="ghost" onClick={toggleShowModalHandler}>
                    <div
                        style={{
                            height: 24,
                            width: 24,
                            background: "#1D2023",
                            borderRadius: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <EllipsisIcon />
                    </div>
                </Button>
                {showModal && (
                    <div
                        style={{
                            position: "absolute",
                            right: "100%",
                            top: "100%",
                            background: "#191A23",
                            boxShadow:
                                "0px 12px 33px -8px rgba(44, 20, 129, 0.52)",
                            borderRadius: "16px 0px 16px 16px",
                            padding: "8px 16px",
                        }}
                    >
                        <div
                            style={{
                                height: 36,
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                cursor: "pointer",
                                userSelect: "none",
                            }}
                        >
                            <Text>Подробности</Text>
                        </div>
                        <div
                            style={{
                                height: 36,
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                cursor: "pointer",
                                userSelect: "none",
                            }}
                            onClick={onDeleteHandler}
                        >
                            <Text color="danger">Удалить</Text>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const Wrapper: React.FC<{ items: TGoal[]; openModal: () => void }> = ({
    items,
    openModal,
}) => {
    const goalCardsRef = React.useRef<HTMLDivElement | null>(null);
    const scrollHorizontally = React.useCallback((e: WheelEvent) => {
        if (goalCardsRef.current) {
            const scrollSpeed = 40;
            const delta = Math.max(-1, Math.min(1, -e.deltaY || -e.detail));
            goalCardsRef.current.scrollLeft -= delta * scrollSpeed;
            e.preventDefault();
        }
    }, []);

    const onMouseEnterHandler = React.useCallback(() => {
        if (goalCardsRef.current) {
            goalCardsRef.current.addEventListener("wheel", scrollHorizontally);
        }
    }, [scrollHorizontally]);

    const onMouseLeaveHandler = React.useCallback(() => {
        if (goalCardsRef.current) {
            goalCardsRef.current.removeEventListener(
                "wheel",
                scrollHorizontally
            );
        }
    }, [scrollHorizontally]);

    if (!items.length) {
        return (
            <div className={styles["goals-empty-container"]}>
                <div className={styles["goals-empty"]}>
                    <img
                        src={GoalImg}
                        alt="goal-empty"
                        className={styles["goals-empty__img"]}
                    />
                    <Text color="secondary">У вас нет ни одной цели</Text>
                    <Button onClick={openModal}>
                        <Text size="l">Добавить цель</Text>
                    </Button>
                </div>
            </div>
        );
    }
    // TODO: скрыть стролл
    return (
        <div
            style={{
                display: "flex",
                gap: 8,
                flex: 1,
                overflowX: "auto",
            }}
            ref={goalCardsRef}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
        >
            {items.map((item) => (
                <div
                    key={item.id}
                    style={{
                        position: "relative",
                        zIndex: 99,
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            right: 0,
                            top: 0,
                            zIndex: 999,
                        }}
                    >
                        <GoalCardButton item={item} />
                    </div>
                    <GoalCardWithModal item={item} />
                </div>
            ))}
        </div>
    );
};

const Goals = () => {
    const { showModal, toggleShowModalHandler } = useModal();
    const { items } = useGoals();

    return (
        <Content className={styles.goals}>
            <div className={styles.goals__header}>
                <Text size="l">
                    <b>Цели</b>
                </Text>
                {!!items.length && (
                    <Button variant="ghost" onClick={toggleShowModalHandler}>
                        <Content
                            variant="primary"
                            className={styles["goals__header-btn"]}
                        >
                            <Text size="xl" color="primary">
                                +
                            </Text>
                            <Text color="primary">Добавить цель</Text>
                        </Content>
                    </Button>
                )}
            </div>
            <Modal onClose={toggleShowModalHandler} show={showModal} />
            <Wrapper items={items} openModal={toggleShowModalHandler} />
        </Content>
    );
};

export default Goals;
