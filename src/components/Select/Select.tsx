import * as React from "react";
import Text from "../Text";
import Option, { OptionComponent } from "./Option/Option";

import styles from "./Select.module.scss";

type Props = {
    children?: React.ReactNode;
    placeholder?: string;
    onChange?: (value: any) => void;
};

type SelectComponent = React.FC<Props> & {
    Option: OptionComponent;
};

const Select: SelectComponent = ({
    children,
    placeholder = "Выберите опцию",
    onChange,
}) => {
    const selectRef = React.useRef<HTMLDivElement | null>(null);
    const [value, setValue] = React.useState<any | null>(null);
    const [showOptions, setShowOptions] = React.useState(false);

    const openOptions = React.useCallback(() => setShowOptions(true), []);
    const closeOptions = React.useCallback(() => setShowOptions(false), []);

    const onClickHandler = React.useCallback(
        (value: any) => {
            onChange && onChange(value)
            setValue(value);
            closeOptions();
        },
        [closeOptions, onChange]
    );

    const renderChildren = () => {
        if (Array.isArray(children) && children.length > 0) {
            return React.Children.map(children, (child: React.ReactNode) => {
                if (React.isValidElement(child)) {
                    return (
                        <Option
                            selected={value === child.props.value}
                            onClick={onClickHandler}
                            value={child.props.value}
                            {...child.props}
                        />
                    );
                }
                return null;
            });
        }
    };

    React.useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                selectRef.current &&
                !selectRef.current.contains(event.target as Node)
            ) {
                setShowOptions(false);
            }
        };

        document.body.addEventListener("click", handleOutsideClick, true);

        return () =>
            document.body.removeEventListener("click", handleOutsideClick);
    }, []);

    return (
        <div className={styles.select} onClick={openOptions} ref={selectRef}>
            {value === null && (
                <Text oneLine color="secondary">
                    {placeholder}
                </Text>
            )}
            {value !== null && <Text oneLine>{value}</Text>}
            {showOptions && (
                <div className={styles.select__options}>{renderChildren()}</div>
            )}
        </div>
    );
};

Select.Option = Option;

export default Select;
