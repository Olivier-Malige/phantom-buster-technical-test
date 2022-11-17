import { useState } from 'react';

import { MoreDots, Timer } from '../../icons';
import { ConfirmModal } from '../ConfirmModal';

export interface PhantomCardProps {
  id: string;
  name: string;
  launchType: 'manually' | 'repeatedly';
  repeatedLaunchTimes?: string;
  nextLaunchIn?: number;
  onDelete: (id: string) => void;
  onRename: (id: string, value: string) => void;
  onDuplicate: (id: string) => void;
}

const PhantomCard = ({
  id,
  name,
  repeatedLaunchTimes,
  nextLaunchIn,
  launchType,
  onDelete,
  onDuplicate,
  onRename,
}: PhantomCardProps) => {
  const [inputNameValue, setInputNameValue] = useState(name);

  const [openRenameModal, setOpenRenameModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const renameModalId = `rename-modal-${id}`;
  const deleteModalId = `delete-modal-${id}`;

  const handleDelete = () => {
    onDelete(id);
    setOpenDeleteModal(false);
  };

  const handleRename = () => {
    onRename(id, inputNameValue.trim());
    setOpenRenameModal(false);
  };

  const handleCancel = () => {
    setInputNameValue(name.trim());
    setOpenDeleteModal(false);
    setOpenRenameModal(false);
  };

  const handleDuplicate = () => {
    onDuplicate(id);
    (document.activeElement as HTMLElement).blur();
  };

  const dropDownMenu = (
    <div className="dropdown-bottom dropdown-end dropdown">
      <label
        data-testid="dropDownMenu"
        tabIndex={0}
        className="btn-ghost btn-sm btn-circle btn "
      >
        <MoreDots className="w-4" />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box w-36 bg-base-100 p-2 text-sm font-semibold shadow"
      >
        <li>
          <button
            data-testid="dropDownMenu-rename"
            onClick={() => setOpenRenameModal(true)}
          >
            Rename
          </button>
        </li>
        <li>
          <label data-testid="dropDownMenu-duplicate" onClick={handleDuplicate}>
            Duplicate
          </label>
        </li>
        <div className="divider divider-vertical h-0" />
        <li>
          <label
            data-testid="dropDownMenu-delete"
            onClick={() => setOpenDeleteModal(true)}
            className=" text-error "
          >
            Delete
          </label>
        </li>
      </ul>
    </div>
  );

  const renameModal = (
    <ConfirmModal
      isOpen={openRenameModal}
      modalId={renameModalId}
      onCancel={handleCancel}
      onConfirm={handleRename}
      title="Enter a new name for this Phantom"
      disableSubmit={inputNameValue.trim().length < 2}
    >
      <input
        data-testid="input-rename"
        name="phantomName"
        value={inputNameValue}
        onChange={(event) => setInputNameValue(event.target.value)}
        type="text"
        placeholder="New name"
        className="input-bordered input-secondary input w-full font-semibold"
      />
    </ConfirmModal>
  );

  const deleteModal = (
    <ConfirmModal
      isOpen={openDeleteModal}
      modalId={deleteModalId}
      onCancel={handleCancel}
      onConfirm={handleDelete}
      title="Are you sure you want to delete this Phantom?"
    >
      <p>
        Any associated files will also be deleted and we will not be able
        retrieve them
      </p>
    </ConfirmModal>
  );

  return (
    <>
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="card-actions justify-end">{dropDownMenu}</div>
          <h2 className="card-title">{name}</h2>
          <div className="flex text-sm opacity-60">
            {launchType === 'repeatedly' ? (
              <>
                <span className="truncate">{repeatedLaunchTimes}</span>
                <div className="divider divider-horizontal" />
                <span className="flex gap-2">
                  <Timer className="w-3" /> {nextLaunchIn}
                </span>
              </>
            ) : (
              <span className="truncate">Launch manually</span>
            )}
          </div>
        </div>
      </div>
      {renameModal}
      {deleteModal}
    </>
  );
};

export { PhantomCard };
