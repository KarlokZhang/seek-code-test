import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from './Button';

describe('Button', () => {
    it('should render the label for the button', () => {
        render(
            <Button ariaLabel="Test Button" onClick={() => {}}>
                Test
            </Button>,
        );

        expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
    });

    it('should call the onClick function when the button is clicked', () => {
        const onClick = jest.fn();
        render(
            <Button ariaLabel="Test Button" onClick={onClick}>
                Test
            </Button>,
        );

        fireEvent.click(screen.getByRole('button', { name: 'Test Button' }));

        expect(onClick).toHaveBeenCalled();
    });

    it('should disable the button when the disabled prop is true', () => {
        render(
            <Button ariaLabel="Test Button" onClick={() => {}} disabled>
                Test
            </Button>,
        );

        expect(screen.getByRole('button', { name: 'Test Button' })).toBeDisabled();
    });

    it('should render the button with the correct class name', () => {
        render(
            <Button ariaLabel="Test Button" onClick={() => {}} className="test-classname">
                Test
            </Button>,
        );

        expect(screen.getByRole('button', { name: 'Test Button' })).toHaveClass('test-classname');
    });

    it('should render the button with the correct type', () => {
        render(
            <Button ariaLabel="Test Button" onClick={() => {}} type="submit">
                Test
            </Button>,
        );

        expect(screen.getByRole('button', { name: 'Test Button' })).toHaveAttribute('type', 'submit');
    });

    it('should render the button with children', () => {
        render(
            <Button ariaLabel="Test Button" onClick={() => {}}>
                <span>Test</span>
            </Button>,
        );

        expect(screen.getByRole('button', { name: 'Test Button' })).toContainHTML('<span>Test</span>');
    });
});
