const FlashMessage = ({ flashMessage, flashMessageType }) => {
  if (!flashMessage) return null;

  const icons = {
    success: <i className="fa-solid fa-check me-3"></i>,
    warn: <i className="fa-solid fa-exclamation-triangle me-3"></i>,
    error: <i className="fa-solid fa-times me-3"></i>,
  };

  const icon = icons[flashMessageType] || null;

  return (
    <div
      data-testid="flash-message"
      className={`flashMessage ${flashMessageType}`}
    >
      {icon} {flashMessage}
    </div>
  );
};

export default FlashMessage;
