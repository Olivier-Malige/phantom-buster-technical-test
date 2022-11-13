import type { ReactNode } from 'react';

interface ConfirmModalProps {
  modalId: string;
  title?: string;
  children?: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  disableSubmit?: boolean;
}

const ConfirmModal = ({
  modalId,
  title,
  children,
  onConfirm,
  onCancel,
  disableSubmit = false,
}: ConfirmModalProps) => {
  return (
    <>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">{title || 'Are you sure?'}</h3>
          <div className="py-4">{children}</div>
          <div className="modal-action">
            <label
              htmlFor={modalId}
              className="btn-ghost btn"
              onClick={onCancel}
            >
              Cancel
            </label>
            {!disableSubmit && (
              <label
                htmlFor={modalId}
                className="btn-warning btn"
                onClick={onConfirm}
              >
                OK
              </label>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export { ConfirmModal };
