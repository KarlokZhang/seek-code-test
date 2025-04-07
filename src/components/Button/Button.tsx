import { ButtonProps } from './Button.types';

export const Button = ({ children, ariaLabel, onClick, disabled, className, type = 'button' }: ButtonProps) => {
    return (
        <button type={type} aria-label={ariaLabel} onClick={onClick} disabled={disabled} className={className}>
            {children}
        </button>
    );
};
