'use client';

import dynamic from 'next/dynamic';
import { useAuthDialogStore } from '@/lib/store/authDialogStore';

const AuthDialog = dynamic(() => import('./AuthDialog').then((m) => m.AuthDialog), { ssr: false });

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
