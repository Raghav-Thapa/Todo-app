import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { StatusButton } from "../Buttons/ButtonComponent";

export default function ShowTaskModal({
  children,
  open,
  onClose,
  selectedTask,
  setTaskDetailModal,
}) {
  // console.log('from modal component',open);
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;

    if (open) {
      modal.showModal();
    } else {
      modal.close();
    }
  }, [open]);

  return createPortal(
    <dialog
      className="modelStyle lg:w-1/4 lg:h-1/4 text-center p-4 rounded-2xl overflow-visible break-words"
      ref={dialog}
      onClose={onClose}
    >
      {children}
      <div className="mb-5 float-right">
        <button
          onClick={() => {
            setTaskDetailModal(false);
          }}
        >
          <i className="fa-solid fa-circle-xmark"></i>
        </button>
      </div>
      <h1 className="text-xl lg:mt-7 lg:text-2xl font-semibold">
        {selectedTask.todo}
      </h1>
      <h2 className="mt-5 float-start ms-10">
        <span className="font-serif font-semibold me-2"> Status:</span>
        <span
          className={`${
            selectedTask.status === "completed" &&
            "inline-flex text-s leading-5 font-semibold rounded-full text-green-900"
          } 
          ${
            selectedTask.status === "started" &&
            "inline-flex text-s leading-5 font-semibold rounded-full text-blue-900"
          }
          ${
            selectedTask.status === "pending" &&
            "inline-flex text-s leading-5 font-semibold rounded-full text-slate-900"
          } `}
        >
          {" "}
          {selectedTask.status}
        </span>
      </h2>
    </dialog>,
    document.getElementById("modal")
  );
}
