import * as React from 'react';

import DateHelper from '../../../utils/DateHelper';

import { DateContext } from './DateProvider';

const useDateContext = () => {
    const { date, setDate } = React.useContext(DateContext);

    return {
        dateStr: DateHelper.formatDateToStr(date),
        date: date,
        setDate,
    };
};

export default useDateContext;
