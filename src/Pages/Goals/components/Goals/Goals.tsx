import * as React from 'react';

import { GoalImg } from '../../../../assets';
import { Button, Content, Spin, Text } from '../../../../components';
import useFetchAllGoals from '../../../common/hooks/goals/useFetchAllGoals';
import useModal from '../../../common/hooks/useModal';
import { Modal } from '../../../Dashboard/components/Goals/components';
import { GoalCardWithModal } from './components';
import GoalCardButton from './components/GoalCardButton';

import styles from './Goals.module.scss';

type Props = {
    onClick: () => void;
};

const Wrapper: React.FC<Props> = ({ onClick }) => {
    const { items, isLoading } = useFetchAllGoals();
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
            goalCardsRef.current.addEventListener('wheel', scrollHorizontally);
        }
    }, [scrollHorizontally]);

    const onMouseLeaveHandler = React.useCallback(() => {
        if (goalCardsRef.current) {
            goalCardsRef.current.removeEventListener('wheel', scrollHorizontally);
        }
    }, [scrollHorizontally]);

    if (isLoading) {
        return (
            <div className={styles['goals-empty-container']}>
                <div className={styles['goals-empty']}>
                    <Spin />
                </div>
            </div>
        );
    }

    if (!items.length) {
        return (
            <div className={styles['goals-empty-container']}>
                <div className={styles['goals-empty']}>
                    <img src={GoalImg} alt="goal-empty" className={styles['goals-empty__img']} />
                    <Text color="secondary">У вас нет ни одной цели</Text>
                    <Button onClick={onClick}>
                        <Text size="l">Добавить цель</Text>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div
            className={styles['goals__cards']}
            ref={goalCardsRef}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
        >
            {items.map(item => (
                <div key={item.id} className={styles['goals__item']}>
                    <div className={styles['goals__item-wrapper']}>
                        <GoalCardButton item={item} />
                    </div>
                    <GoalCardWithModal item={item} />
                </div>
            ))}
        </div>
    );
};

const AddGoalButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    const { items } = useFetchAllGoals();

    if (items.length === 0) {
        return null;
    }

    return (
        <Button variant="ghost" onClick={onClick}>
            <Content variant="primary" className={styles['goals__header-btn']}>
                <Text size="xl" color="primary">
                    +
                </Text>
                <Text color="primary">Добавить цель</Text>
            </Content>
        </Button>
    );
};

const Goals = () => {
    const { showModal, toggleShowModalHandler } = useModal();

    return (
        <Content className={styles.goals}>
            <div className={styles.goals__header}>
                <Text size="l">
                    <b>Цели</b>
                </Text>
                <AddGoalButton onClick={toggleShowModalHandler} />
            </div>
            <Modal onClose={toggleShowModalHandler} show={showModal} />
            <Wrapper onClick={toggleShowModalHandler} />
        </Content>
    );
};

export default Goals;
