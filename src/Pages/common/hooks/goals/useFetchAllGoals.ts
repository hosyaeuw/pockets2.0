import { useFetchAllGoalsQuery } from '../../../../services/goals';
import { TGoal } from '../useGoals';

const defaultItems: TGoal[] = [];

const useFetchAllGoals = () => {
    const { data, ...other } = useFetchAllGoalsQuery('');

    return {
        items: data?.result ?? defaultItems,
        ...other,
    };
};

export default useFetchAllGoals;
