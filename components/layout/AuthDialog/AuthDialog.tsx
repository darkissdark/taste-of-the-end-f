'use client';

import { useRouter } from 'next/navigation';
import styles from './AuthDialog.module.css';
import Button from '@/components/buttons/Buttons';
import { SvgIcon } from '@/components/ui/icons/SvgIcon';

type Props = {
  open: boolean;
  onClose: () => void;
};

export function AuthDialog({ open, onClose }: Props) {
  const router = useRouter();
  if (!open) return null;

  const handleSignIn = () => {
    onClose();
    router.push('/auth/login');
  };

  const handleSignUp = () => {
    onClose();
    router.push('/auth/register');
  };

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>Sign in to continue</h3>
        <p className={styles.text}>Choose an option:</p>

        <div className={styles.actions}>
          <Button
            type="button"
            variant="brown"
            size="md"
            className={styles.actionButton}
            onClick={handleSignIn}
          >
            Login
          </Button>

          <Button
            type="button"
            variant="white"
            size="md"
            className={styles.actionButtonSecondary}
            onClick={handleSignUp}
          >
            Register
          </Button>
        </div>

        <button className={styles.close} onClick={onClose} aria-label="Close">
          <SvgIcon name="close" aria-hidden />
        </button>
      </div>
    </div>
  );
}
