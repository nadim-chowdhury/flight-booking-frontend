"use client";

import React, { useState, useEffect } from "react";

export default function Toast({
  message,
  type = "success",
  visible,
  duration = 3000,
  onClose,
}) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-3 rounded-md shadow-lg transition-opacity duration-500 ${
        type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
      }`}
    >
      {message}
    </div>
  );
}
