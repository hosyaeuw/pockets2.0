import * as React from 'react';

type ContextType = {
    date: Date;
    setDate: (date: Date) => void;
};

export const DateContext = React.createContext<ContextType>({
    date: new Date(),
    setDate: () => {},
});

type Props = {};

const DateProvider: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
    const [date, setDate] = React.useState(new Date());

    const setDateHandler = React.useCallback((date: Date) => setDate(date), []);

    return (
        <DateContext.Provider value={{ date, setDate: setDateHandler }}>
            {children}
        </DateContext.Provider>
    );
};

export default DateProvider;
