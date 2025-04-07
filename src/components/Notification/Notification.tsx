import { notificationStyles } from './Notification.styles';
import { NotificationProps } from './Notification.types';

export const Notification = ({ message, type, styleClasses }: NotificationProps) => {
    return (
        <p className={`p-2 rounded-md text-xs text-shadow-black ${notificationStyles[type]} ${styleClasses}`}>
            {message}
        </p>
    );
};
