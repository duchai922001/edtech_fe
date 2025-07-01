"use client";

import type React from "react";
import { X, AlertTriangle, CheckCircle } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "warning" | "info" | "danger";
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Đồng ý",
  cancelText = "Hủy",
  type = "warning",
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="modal-icon modal-icon-warning" />;
      case "info":
        return <CheckCircle className="modal-icon modal-icon-info" />;
      case "danger":
        return <AlertTriangle className="modal-icon modal-icon-danger" />;
      default:
        return <AlertTriangle className="modal-icon modal-icon-warning" />;
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-header-content">
            {getIcon()}
            <h3 className="modal-title">{title}</h3>
          </div>
          <button onClick={onClose} className="modal-close-button">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-message">{message}</p>
        </div>

        <div className="modal-footer">
          <button
            onClick={onClose}
            className="modal-button modal-button-cancel"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`modal-button modal-button-confirm modal-button-${type}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
