import { render, screen } from '@testing-library/react';

import { Selector } from './Selector';

describe('Selector', () => {
    it('should not render selector if options are empty', () => {
        render(<Selector label="Test" options={[]} />);

        expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    });

    it('should render the label for the selector', () => {
        render(<Selector label="Testing Selector" options={[{ label: 'OptionA', value: 'Option A' }]} />);

        expect(screen.getByText('Testing Selector')).toBeInTheDocument();
    });

    it('should render the options for the selector', () => {
        render(<Selector label="Testing Selector" options={[{ label: 'OptionA', value: 'Option A' }]} />);

        expect(screen.getByText('OptionA')).toBeInTheDocument();
    });

    it('should render the default option for the selector', () => {
        const mockOptions = [
            { label: 'OptionA', value: 'Option A' },
            { label: 'OptionB', value: 'Option B' },
            { label: 'OptionC', value: 'Option C' },
        ];
        render(<Selector label="Testing Selector" options={mockOptions} defaultOption="Option A" />);

        expect(screen.getByRole('option', { name: 'OptionA' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'OptionB' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'OptionC' })).toBeInTheDocument();
    });
});
