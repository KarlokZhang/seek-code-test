export interface NotificationProps {
    message: string;
    type: 'success' | 'warning' | 'error';
    styleClasses?: string;
}
