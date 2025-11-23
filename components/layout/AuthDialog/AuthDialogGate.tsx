'use client';

import { AuthDialog } from './AuthDialog';
import { useAuthDialogStore } from '@/lib/store/authDialogStore';

export function AuthDialogGate() {
  const isOpen = useAuthDialogStore((state) => state.isOpen);
  const close = useAuthDialogStore((state) => state.close);
  const lastTrigger = useAuthDialogStore((state) => state.lastTrigger);

  const handleClose = () => {
    close();
    if (lastTrigger) {
      lastTrigger.focus();
    }
  };

  return <AuthDialog open={isOpen} onClose={handleClose} />;
}
