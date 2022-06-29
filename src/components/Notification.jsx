import Close from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

function Notification({ notification, setNotification }) {
  const removeNotification = () => {
    setNotification({});
  };

  return JSON.stringify(notification) !== '{}' ? (
    <div
      className={`notification ${notification.status}`}
      onAnimationEnd={removeNotification}
    >
      <span>{notification.message}</span>
      <button type="button" onClick={removeNotification}>
        <Close />
      </button>
    </div>
  ) : (
    ''
  );
}
export default Notification;

/* ------------- Prop Validation -------------*/
Notification.propTypes = {
  notification: PropTypes.shape({
    status: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
  setNotification: PropTypes.func.isRequired,
};
