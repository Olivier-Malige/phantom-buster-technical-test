import { MoreDots, Timer } from '../../icons';
import { ConfirmModal } from '../ConfirmModal';

const RENAME_MODAL_ID = 'rename-modal';
const DELETE_MODAL_ID = 'delete-modal';

const PhantomCard = () => {
  const handleDelete = () => {
    console.log('delete');
  };

  const handleRename = () => {
    console.log('rename');
  };

  const handleCancel = () => {
    console.log('cancel');
  };

  const dropDownMenu = (
    <div className="dropdown-bottom dropdown-end dropdown">
      <label tabIndex={0} className="btn-ghost btn-sm btn-circle btn ">
        <MoreDots className="w-4" />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box w-36 bg-base-100 p-2 text-sm shadow"
      >
        <li>
          <label htmlFor={RENAME_MODAL_ID}>Rename</label>
        </li>
        <li>
          <a>Duplicate</a>
        </li>
        <div className="border-t-2" />
        <li>
          <label htmlFor={DELETE_MODAL_ID} className=" text-error">
            Delete
          </label>
        </li>
      </ul>
    </div>
  );

  const renameModal = (
    <ConfirmModal
      modalId={RENAME_MODAL_ID}
      onCancel={handleCancel}
      onConfirm={handleRename}
      title="Enter a new name for this Phantom"
    >
      <input
        type="text"
        placeholder="New name"
        className="input-bordered input-ghost  input w-full"
      />
    </ConfirmModal>
  );

  const deleteModal = (
    <ConfirmModal
      modalId={DELETE_MODAL_ID}
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
      <div className="card bg-base-100">
        <div className="card-body">
          <div className="card-actions justify-end">{dropDownMenu}</div>
          <h2 className="card-title">name</h2>
          <div className="flex text-sm text-gray-500">
            <span className="truncate">repeatedLaunchTimes</span>
            <div className="divider divider-horizontal" />
            <span className="flex gap-2">
              <Timer className="w-3" /> nextLaunchIn
            </span>
          </div>
        </div>
      </div>
      {renameModal}
      {deleteModal}
    </>
  );
};

export { PhantomCard };
