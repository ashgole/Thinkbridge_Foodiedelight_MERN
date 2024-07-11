import React from "react";

const EditModal = ({ children }) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center ">
      <div className="relative bg-white max-w-md mx-auto rounded-lg shadow-lg w-full">
        {children}
      </div>
    </div>
  );
};

export default EditModal;
