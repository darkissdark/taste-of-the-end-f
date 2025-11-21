'use client';

import { useState } from 'react';
import { addToFavorites, removeFromFavorites } from '@/lib/api/clientApi';
import { useAuthDialogStore } from '@/lib/store/authDialogStore';
import useAuthStore from '@/lib/store/authStore';
import css from './FavoriteButton.module.css';
import { SvgIcon } from '@/components/ui/icons/SvgIcon';

interface favoriteButtonProps {
  recipeId: string;
  initialIsFavorite: boolean;
  onUnlike: (recipeId: string) => void;
}

export default function FavoriteButton({
  recipeId,
  initialIsFavorite,
  onUnlike,
}: favoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [loading, setLoading] = useState(false);

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const openAuthDialog = useAuthDialogStore((s) => s.open);

  const toggleFavorite = async () => {
    if (loading) return;

    if (!isAuthenticated) {
      openAuthDialog();
      return;
    }

    setLoading(true);

    try {
      if (isFavorite) {
        await removeFromFavorites(recipeId);
        setIsFavorite(false);
        onUnlike?.(recipeId); // <— ВАЖЛИВО: прибираємо картку зі списку
      } else {
        await addToFavorites(recipeId);
        setIsFavorite(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={isFavorite ? css.favoriteButton : css.notFavoriteButton}
      disabled={loading}
      onClick={toggleFavorite}
    >
      <SvgIcon name="save_tooth" />
    </button>
  );
}
