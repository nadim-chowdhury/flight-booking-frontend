"use client";

import { X } from "lucide-react";
import React, { useRef } from "react";

const MapModal = ({ isOpen, onClose, children, title }) => {
  const modalRef = useRef(null);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={handleClickOutside}
        >
          <div
            ref={modalRef}
            className="bg-white rounded-lg w-full max-w-xl p-6 shadow-lg mx-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-700">{title}</h2>
              <button
                onClick={onClose}
                className="bg-rose-600 hover:bg-rose-800 border rounded-full flex items-center justify-center w-6 h-6 p-1 transition-all duration-300 font-medium"
              >
                <X />
              </button>
            </div>
            <div>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default MapModal;
