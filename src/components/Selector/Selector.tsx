import { useState } from 'react';

import { SelectorProps } from './Selector.types';

export const Selector = ({ label, options, defaultOption, onChange }: SelectorProps) => {
    const [selectedValue, setSelectedValue] = useState<string>(defaultOption || '');

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedValue(value);
        onChange?.(value);
    };

    if (!options || options.length === 0) return null;

    return (
        <div className="mb-6">
            <label htmlFor="customer-select" className="block text-sm font-medium mb-2">
                {label}
            </label>
            <select id="customer-select" value={selectedValue} onChange={handleChange} className="p-2 border rounded">
                {options.map((option) => (
                    <option key={option.value} value={option.value} role="option">
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
