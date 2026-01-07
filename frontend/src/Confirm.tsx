interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function Confirm({ message, onConfirm, onCancel }: Props) {
  return (
    <div className="confirm-dialog" onClick={onCancel}>
      <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-header">Confirm</div>
        <div className="confirm-body">{message}</div>
        <div className="confirm-actions">
          <button onClick={onCancel} className="secondary-btn">
            Cancel
          </button>
          <button onClick={onConfirm} className="primary-btn">
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
