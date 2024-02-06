import React from "react";

export const EditDeleteButtons = ({
  categoryId,
  handleEditCategory,
  openDeleteModal,
}) => {
  return (
    <div>
      <button
        aria-label="edit category"
        className="lg:me-3 me-1 ms-1 lg:ms-3  inline-flex lg:text-lg text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800 p-1"
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
}) => (
  <button
    aria-label="save edit category"
    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 text-green-800 ms-2"
    onClick={() => {
      handleSaveCategory(cateId, newCategoryName);
    }}
  >
    Save
  </button>
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
