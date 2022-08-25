import { useFetchAnalyticsQuery } from '../../../../services/goals';
import { TGoalAnalytics } from '../useGoals';

const defaultData: TGoalAnalytics = {
    open_goal_amount: 0,
    open_goal_total: 0,
    current_month_percent: 0,
    all_time_percent: 0,
    nearest_end_goal_days: 0,
    most_successful_category: undefined,
    post_popular_category: undefined,
};

const useFetchAnalytics = () => {
    const { data, ...other } = useFetchAnalyticsQuery('');

    return {
        data: data?.result ?? defaultData,
        ...other,
    };
};

export default useFetchAnalytics;
