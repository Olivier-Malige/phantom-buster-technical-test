import type { ReactNode } from 'react';

interface ConfirmModalProps {
  modalId: string;
  isOpen: boolean;
  title?: string;
  children?: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  disableSubmit?: boolean;
}

const ConfirmModal = ({
  isOpen,
  modalId,
  title,
  children,
  onConfirm,
  onCancel,
  disableSubmit = false,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div data-testid={modalId} className="modal-box">
        <h3 className="text-lg font-bold">{title || 'Are you sure?'}</h3>
        <div className="py-4">{children}</div>
        <div className="modal-action">
          <button
            data-testid={`${modalId}-cancel`}
            className="btn-ghost btn"
            onClick={onCancel}
          >
            Cancel
          </button>
          {!disableSubmit && (
            <button
              data-testid={`${modalId}-ok`}
              className="btn-accent btn"
              onClick={onConfirm}
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export { ConfirmModal };
