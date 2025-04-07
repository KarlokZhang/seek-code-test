export interface SelectorOption {
    label: string;
    value: string;
}

export interface SelectorProps<T = string> {
    label: string;
    options: SelectorOption[];
    defaultOption?: T;
    onChange?: (value: T) => void;
}
