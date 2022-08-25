import * as React from 'react';

import classNames from 'classnames';

import { ArrowIcon } from '../../../../../../assets';

import { Content, Text } from '../../../../../../components';

import DateHelper from '../../../../../../utils/DateHelper';

import useDateContext from '../../../../../common/providers/useDateContext';

import styles from './Header.module.scss';

const Plate: React.FC<{ onPrev: () => void; onNext: () => void; value: string | number }> = ({
    onPrev,
    onNext,
    value,
}) => {
    return (
        <Content variant="primary" className={styles.plate}>
            <button
                onClick={onPrev}
                className={classNames(styles.plate__btn, styles.plate__btn_prev)}
            >
                <ArrowIcon />
            </button>
            <Text>
                <b>{value}</b>
            </Text>
            <button
                onClick={onNext}
                className={classNames(styles.plate__btn, styles.plate__btn_next)}
            >
                <ArrowIcon />
            </button>
        </Content>
    );
};

const MonthPlate: React.FC<{
    date: Date;
    onChange: (date: Date) => void;
}> = ({ date, onChange }) => {
    const onPrevHandler = React.useCallback(() => {
        onChange(DateHelper.addMonth(date, -1));
    }, [onChange, date]);

    const onNextHandler = React.useCallback(() => {
        onChange(DateHelper.addMonth(date, 1));
    }, [onChange, date]);

    return (
        <Plate
            value={DateHelper.getAppDate(date).split(' ')[1]}
            onPrev={onPrevHandler}
            onNext={onNextHandler}
        />
    );
};

const maxDate = new Date().getFullYear();
const minDate = maxDate - 50;

const DatePlate: React.FC<{ date: Date; onChange: (date: Date) => void }> = ({
    date,
    onChange,
}) => {
    const currentYear = date.getFullYear();

    const onPrevHandler = React.useCallback(() => {
        if (currentYear > minDate - 1) {
            onChange(DateHelper.addYear(date, -1));
        }
    }, [onChange, date, currentYear]);

    const onNextHandler = React.useCallback(() => {
        if (currentYear < maxDate + 1) {
            onChange(DateHelper.addYear(date, 1));
        }
    }, [onChange, date, currentYear]);

    return <Plate value={date.getFullYear()} onPrev={onPrevHandler} onNext={onNextHandler} />;
};

const debounceTime = 1000;

const Header = () => {
    const { date, setDate } = useDateContext();
    const [startDate, setStartDate] = React.useState(date);
    const timerRef = React.useRef<NodeJS.Timeout>();

    const changeDateHandler = React.useCallback(
        (date: Date) => {
            setStartDate(date);
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            timerRef.current = setTimeout(() => setDate(date), debounceTime);
        },
        [setDate],
    );

    return (
        <div className={styles.header}>
            <Text size="l">
                <b>Статистика</b>
            </Text>
            <div className={styles.header__plates}>
                <div className={styles['header__plate-month']}>
                    <MonthPlate date={startDate} onChange={changeDateHandler} />
                </div>
                <div className={styles['header__plate-year']}>
                    <DatePlate date={startDate} onChange={changeDateHandler} />
                </div>
            </div>
        </div>
    );
};

export default Header;
