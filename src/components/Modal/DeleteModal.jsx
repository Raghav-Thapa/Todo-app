import Modal from "./Modal";

export default function DeleteConfirmationModal({ open, onClose, onConfirm }) {
  // console.log(open)
  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="mt-2" style={{ fontWeight: "bold" }}>
        Confirm Deletion
      </h2>
      <p className="mb-3">Are you sure you want to delete this ?</p>
      <button
        className="ms-5 me-3 px-2  text-xs leading-5 font-semibold rounded-full bg-red-200 text-red-800"
        onClick={onConfirm}
      >
        Yes
      </button>
      <button
        className="ms-5 me-3 px-2  text-xs leading-5 font-semibold rounded-full bg-green-200 text-green-800"
        onClick={onClose}
      >
        No
      </button>
    </Modal>
  );
}
