"use client";

import { useEffect } from "react";
import Icon from "./Icon/Icon";

interface DeleteDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteDialog({
  open,
  title = "Delete Item",
  description = "Are you sure you want to delete this? This action cannot be undone.",
  loading = false,
  onConfirm,
  onCancel,
}: DeleteDialogProps) {
  // close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onCancel]);

  // lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-sm bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/[0.08] rounded-2xl shadow-2xl shadow-black/20 dark:shadow-black/60">
          {/* Top */}
          <div className="p-5 pb-4">
            {/* Icon */}
            <div className="w-11 h-11 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 flex items-center justify-center mb-4">
              <Icon name="trashTwoIcon" size={20} className="text-red-500" />
            </div>

            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
              {title}
            </h3>
            <p className="text-xs text-gray-400 dark:text-white/40 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 dark:border-white/[0.05]" />

          {/* Actions */}
          <div className="flex items-center gap-2 p-4">
            {/* Cancel */}
            <button
              onClick={onCancel}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] hover:bg-gray-50 dark:hover:bg-white/[0.06] text-gray-600 dark:text-white/50 text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <Icon name="closeIcon" size={14} />
              Cancel
            </button>

            {/* Confirm */}
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-medium shadow-sm shadow-red-900/20 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Icon name="deleteIcon" size={14} />
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
