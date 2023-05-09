import { useState } from 'react';

export function useToggle(defaultValue: boolean | undefined) {

    const [value, setValue] = useState<boolean>(defaultValue || false);

    function toggleValue(value: boolean | React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        setValue(currentValue =>
            typeof value === 'boolean' ? value : !currentValue);
    }

    return { value, toggleValue}

}