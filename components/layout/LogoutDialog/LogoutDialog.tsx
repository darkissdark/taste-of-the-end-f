'use client';

import { useEffect } from 'react';
import styles from './LogoutDialog.module.css';
import Button from '@/components/buttons/Buttons';
import { SvgIcon } from '@/components/ui/icons/SvgIcon';

type LogoutDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function LogoutDialog({ open, onClose }: LogoutDialogProps) {
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
            <form className={styles.actions} method="POST" action="/api/auth/logout">
              <Button type="submit" variant="white" className={styles.actionButton}>
                Log out
              </Button>
            </form>
          </div>
          <div className={styles.actionsColumn}>
            <Button
              type="button"
              variant="white"
              className={styles.actionButtonSecondary}
              onClick={handleCancel}
            >
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
