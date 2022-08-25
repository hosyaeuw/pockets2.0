import { useFetchTopGoalsQuery } from '../../../../services/goals';
import { TGoalTop } from '../useGoals';

const defaultItems: TGoalTop[] = [];

const useFetchTopGoals = () => {
    const { data, ...other } = useFetchTopGoalsQuery('');

    return {
        items: data?.result ?? defaultItems,
        ...other,
    };
};

export default useFetchTopGoals;
