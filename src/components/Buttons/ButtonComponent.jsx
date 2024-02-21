import React from "react";

export const EditDeleteButtons = ({
  categoryId,
  handleEditCategory,
  openDeleteModal,
}) => {
  return (
    <div className="me-9">
      <button
        aria-label="edit category"
        className="lg:me-3 me-1 ms-1 lg:ms-3 inline-flex lg:text-lg text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800 p-1"
        onClick={() => handleEditCategory(categoryId)}
      >
        <i className="fa-solid fa-pen-to-square"></i>
      </button>
      <button
        className="p-1 inline-flex text-lg leading-5 font-semibold  rounded-full bg-red-200 text-red-800 ms-2"
        onClick={() => openDeleteModal(categoryId)}
      >
        <i className="fa-solid fa-trash"></i>
      </button>
    </div>
  );
};

export const AddCategoryButton = ({ handleClickAddCategory }) => (
  <button aria-label="add category" onClick={handleClickAddCategory}>
    <i className="lg:ms-3 ms-2 fa-solid fa-circle-plus"></i>
  </button>
);

export const ViewTasksButton = ({
  handleViewTask,
  cateId,
  isSelected,
  cate,
}) => (
  <button
    aria-label="view tasks"
    className="lg:ms-1"
    onClick={() => handleViewTask(cateId)}
  >
    {cate.cate}
  </button>
);

export const SaveEditCategoryButton = ({
  handleSaveCategory,
  cateId,
  newCategoryName,
  setEditingCategory,
}) => (
  <>
    <button
      aria-label="save edit category"
      className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 text-green-800 ms-2"
      onClick={() => {
        handleSaveCategory(cateId, newCategoryName);
      }}
    >
      Save
    </button>
    <button
      className="px-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200 text-red-800 ms-2"
      onClick={() => setEditingCategory(null)}
    >
      Cancel
    </button>
  </>
);

export const Buttons = ({ text, arialabel, className, handleFunctions }) => (
  <button
    aria-label={arialabel}
    className={className}
    onClick={() => {
      handleFunctions = { handleFunctions };
    }}
  >
    {text}
  </button>
);

   export const StatusButton = ({
     status,
     handleClick,
     taskStatus,
     todo,
     activeStyle,
     inactiveStyle,
     disabledStyle,
   }) => {
     const isTaskComplete = taskStatus[todo.id] === "completed";
     const isCurrentButtonComplete = status === "completed";
     const isDisabled = isTaskComplete && !isCurrentButtonComplete;

     let buttonStyle;
     if (isDisabled) {
       buttonStyle = disabledStyle;
     } else {
       buttonStyle =
         taskStatus[todo.id] === status ? activeStyle : inactiveStyle;
     }

     return (
       <button
         onClick={() => handleClick(todo.id, status)}
         className={buttonStyle}
         disabled={isDisabled}
       >
         {status}
       </button>
     );
   };
