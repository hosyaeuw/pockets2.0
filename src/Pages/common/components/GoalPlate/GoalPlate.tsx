import { Content, Text } from '../../../../components';
import { AmountHelper } from '../../../../utils/amountHelper';
import { TGoal, TGoalTop } from '../../hooks/useGoals';

import Graph from './Graph';

import styles from './GoalPlate.module.scss';

type Props = {
    goal: TGoalTop | TGoal;
};

const GoalPlate: React.FC<Props> = ({ goal }) => {
    return (
        <Content variant="primary" className={styles['goal-plate']}>
            <Graph amount={goal.amount} totalAmount={goal.total_amount} />
            <div className={styles['goal-plate__content']}>
                <Text oneLine color="secondary">
                    {goal.name}
                </Text>
                <Text>
                    <b>{AmountHelper.format(goal.amount)}</b> /{' '}
                    {AmountHelper.format(goal.total_amount)}
                </Text>
            </div>
        </Content>
    );
};

export default GoalPlate;
