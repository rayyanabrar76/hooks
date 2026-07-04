"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useUI, type DrawerId } from "@/store/ui";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { cn } from "@/lib/cn";

type DrawerProps = {
  id: Exclude<DrawerId, null>;
  title: string;
  side?: "left" | "right";
  /** Panel width classes; defaults to a comfortable mobile-first sheet. */
  widthClass?: string;
  children: ReactNode;
  /** Optional sticky footer (e.g. cart checkout bar). */
  footer?: ReactNode;
};

/**
 * Reusable slide-in panel. Handles backdrop, enter/exit animation, ESC-to-close,
 * body scroll-lock, focus trapping and ARIA. The three app drawers compose this.
 */
export function Drawer({
  id,
  title,
  side = "right",
  widthClass = "w-[88vw] max-w-md",
  children,
  footer,
}: DrawerProps) {
  const openDrawer = useUI((s) => s.drawer);
  const close = useUI((s) => s.close);
  const isOpen = openDrawer === id;
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap(panelRef, isOpen);

  // ESC to close + lock body scroll while any drawer is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60]" aria-hidden={!isOpen}>
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close panel"
            onClick={close}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />

          {/* Panel */}
          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={cn(
              "absolute top-0 bottom-0 flex h-full flex-col bg-ink border-hairline",
              side === "right"
                ? "right-0 border-l"
                : "left-0 border-r",
              widthClass,
            )}
            initial={{ x: side === "right" ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: side === "right" ? "100%" : "-100%" }}
            transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
          >
            <header className="flex items-center justify-between border-b border-hairline px-5 py-4">
              <h2 className="font-display text-2xl tracking-wide">{title}</h2>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="grid size-9 place-items-center text-ash transition-colors hover:text-bone"
              >
                <X size={22} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto overscroll-contain">
              {children}
            </div>

            {footer && (
              <div className="border-t border-hairline p-5">{footer}</div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
