export interface ButtonProps {
    ariaLabel: string;
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}
