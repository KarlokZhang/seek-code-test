import { render, screen } from '@testing-library/react';

import { Notification } from './Notification';
import { notificationStyles } from './Notification.styles';

describe('Notification', () => {
    it('should render the notification message', () => {
        render(<Notification message="Test message" type="success" />);

        expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    it.each(['success', 'warning', 'error'])('should render the notification with the correct type', (type) => {
        const notificationStyle = notificationStyles[type as 'success' | 'warning' | 'error'];
        render(<Notification message="Test message" type={type as 'success' | 'warning' | 'error'} />);

        expect(screen.getByText('Test message')).toHaveClass(notificationStyle);
    });

    it('should render the optional style classes', () => {
        render(<Notification message="Test message" type="success" styleClasses="test-class" />);

        expect(screen.getByText('Test message')).toHaveClass('test-class');
    });
});
