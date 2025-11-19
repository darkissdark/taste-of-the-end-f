'use client';

import { useState } from 'react';
import { SvgIcon } from '@/components/ui/icons/SvgIcon';
import css from './FavoriteButton.module.css';
import { addToFavorites, checkSession, removeFromFavorites } from '@/lib/api/clientApi';
import { useAuthDialogStore } from '@/lib/store/authDialogStore';
import useAuthStore from '@/lib/store/authStore';

interface FavoriteButtonProps {
  recipeId: string;
  initialIsFavorite: boolean;
}

export default function FavoriteButton({ recipeId, initialIsFavorite }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const openAuthDialog = useAuthDialogStore((s) => s.open);
  const toggleFavorite = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (isFavorite) {
        await removeFromFavorites(recipeId);
      } else {
        await addToFavorites(recipeId);
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error('Error updating favorites', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={isFavorite ? css.favoriteButton : css.notFavoriteButton}
      disabled={loading}
      onClick={() => {
        if (loading) return;
        if (!isAuthenticated) {
          openAuthDialog();
          return;
        }
        toggleFavorite();
      }}
    >
      <SvgIcon name="save_tooth" />
    </button>
  );
}
