'use client';

import { useEffect, useRef, type FormEvent } from 'react';
import styles from './LogoutDialog.module.css';
import Button from '@/components/buttons/Buttons';
import { SvgIcon } from '@/components/ui/icons/SvgIcon';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/lib/store/authStore';
import { api } from '@/lib/api/api';
import toast from 'react-hot-toast';

type LogoutDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function LogoutDialog({ open, onClose }: LogoutDialogProps) {
  const router = useRouter();
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);
  const primaryActionRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(() => {
      primaryActionRef.current?.focus();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleCancel = () => {
    onClose();
  };

  const handleLogout = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Something went wrong while logging out. Please try again.');
    } finally {
      clearIsAuthenticated();
      onClose();
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-title"
      onClick={onClose}
    >
      <div className={styles.panel} onClick={(event) => event.stopPropagation()}>
        <h3 id="logout-title" className={styles.title}>
          Are you sure?
        </h3>
        <p className={styles.text}>We will miss you!</p>

        <div className={styles.actionsWrapper}>
          <div className={styles.actionsColumn}>
            <form className={styles.actions} onSubmit={handleLogout}>
              <Button ref={primaryActionRef} type="submit" variant="danger" size="lg">
                Log out
              </Button>
            </form>
          </div>
          <div className={styles.actionsColumn}>
            <Button type="button" variant="whiteDialog" size="lg" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>

        <button className={styles.close} onClick={onClose} aria-label="Close">
          <SvgIcon name="close" aria-hidden />
        </button>
      </div>
    </div>
  );
}
