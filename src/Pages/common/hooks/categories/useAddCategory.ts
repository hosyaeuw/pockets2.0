import * as React from 'react';

import { useAddCategoryMutation } from '../../../../services/categories';

const useAddCategory = () => {
    const [addCategory, data] = useAddCategoryMutation();

    const addCategoryHandler = React.useCallback(
        (name: string) => {
            const data = {
                name,
            };

            return addCategory(data);
        },
        [addCategory],
    );

    return { addCategory: addCategoryHandler, data };
};

export default useAddCategory;
