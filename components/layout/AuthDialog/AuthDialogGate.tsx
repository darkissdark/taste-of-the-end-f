'use client';

import { AuthDialog } from './AuthDialog';
import { useAuthDialogStore } from '@/lib/store/authDialogStore';

export function AuthDialogGate() {
  const isOpen = useAuthDialogStore((state) => state.isOpen);
  const close = useAuthDialogStore((state) => state.close);

  return <AuthDialog open={isOpen} onClose={close} />;
}
