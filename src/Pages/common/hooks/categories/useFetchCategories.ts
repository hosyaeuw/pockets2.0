import { useFetchCategoriesQuery } from '../../../../services/categories';
import useDateContext from '../../providers/useDateContext';
import { TCategory } from '../useCategories';

const defaultItems: TCategory[] = [];

const useFetchCategories = () => {
    const { dateStr } = useDateContext();
    const { data, isLoading, error } = useFetchCategoriesQuery(dateStr);

    return {
        items: data?.result ?? defaultItems,
        isLoading,
        error,
    };
};

export default useFetchCategories;
