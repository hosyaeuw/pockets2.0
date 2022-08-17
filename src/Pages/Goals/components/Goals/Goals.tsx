import React from "react";
import { GoalImg } from "../../../../assets";
import { Button, Content, Text } from "../../../../components";
import useGoals, { TGoal } from "../../../common/hooks/useGoals";
import useModal from "../../../common/hooks/useModal";
import { Modal } from "../../../Dashboard/components/Goals/components";
import { GoalCard } from "./components";
import styles from "./Goals.module.scss";

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
            {[...items, ...items].map((item) => (
                <GoalCard item={item} />
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