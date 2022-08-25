import classNames from 'classnames';

import { Button, Content, Spin, Text } from '../../../../../../components';
import { GoalPlate } from '../../../../../common/components';
import useFetchTopGoals from '../../../../../common/hooks/goals/useFetchTopGoals';
import useModal from '../../../../../common/hooks/useModal';
import Modal from '../Modal';

import styles from './GoalList.module.scss';

type Props = {};

const Wrapper: React.FC<Props> = () => {
    const { items, isLoading } = useFetchTopGoals();

    const { showModal, toggleShowModalHandler } = useModal();

    if (isLoading) {
        return (
            <Content
                variant="primary"
                className={classNames(styles['goal-list__empty-container'], styles.loading)}
            >
                <Spin />
            </Content>
        );
    }

    if (items.length === 0) {
        return (
            <Content variant="primary" className={styles['goal-list__empty-container']}>
                <Modal show={showModal} onClose={toggleShowModalHandler} />
                <div className={styles['goal-list__empty']}>
                    <div className={styles['goal-list__empty-wrapper']}>
                        <Text size="l" color="secondary">
                            У вас нет ни одной цели
                        </Text>
                        <Button onClick={toggleShowModalHandler}>
                            <Text size="l">Добавить цель</Text>
                        </Button>
                    </div>
                </div>
            </Content>
        );
    }

    return (
        <div className={styles['goal-list__items']}>
            {items.map(item => (
                <GoalPlate key={item.id} goal={item} />
            ))}
        </div>
    );
};

const GoalList = () => {
    return (
        <div className={styles['goal-list-container']}>
            <Wrapper />
        </div>
    );
};

export default GoalList;
