import classNames from "classnames";
import * as React from "react";
import { Button, Text } from "../";

import styles from "./Tabs.module.scss";

type Option = {
    title: string;
    value: string;
};

type TabProps = {
    option: Option;
    onClick: (value: string) => void;
    selected: boolean;
    className?: string;
};

const Tab: React.FC<TabProps> = ({ option, onClick, selected, className }) => {
    const onClickHandler = React.useCallback(() => {
        onClick(option.value);
    }, [option.value, onClick]);

    return (
        <Button
            className={classNames(styles.tab, className)}
            onClick={onClickHandler}
            size="s"
            variant={selected ? "default" : "secondary"}
        >
            <Text color={selected ? "default" : "primary"}>
                <b>{option.title}</b>
            </Text>
        </Button>
    );
};

type Props = {
    options: Option[];
    onChange: (value: string) => void;
    defaultValue?: string;
};

const Tabs: React.FC<Props> = ({ options, onChange, defaultValue }) => {
    const [selectedOptionValue, setSelectedOptionValue] = React.useState(
        defaultValue || options[0].value
    );

    const onClickHandler = React.useCallback(
        (value: string) => {
            onChange(value);
            setSelectedOptionValue(value);
        },
        [onChange]
    );

    return (
        <div className={styles.tabs}>
            {options.map((option, index) => (
                <Tab
                    className={classNames({
                        [styles.tab_first]: index === 0,
                        [styles.tab_last]: index === options.length - 1,
                    })}
                    selected={option.value === selectedOptionValue}
                    onClick={onClickHandler}
                    option={option}
                />
            ))}
        </div>
    );
};

export default Tabs;
