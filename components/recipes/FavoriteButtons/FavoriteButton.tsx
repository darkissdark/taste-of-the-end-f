'use client';

import { useState } from 'react';
import { addToFavorites, removeFromFavorites } from '@/lib/api/clientApi';
import { useAuthDialogStore } from '@/lib/store/authDialogStore';
import useAuthStore from '@/lib/store/authStore';
import { FavoriteButtonIcon } from './ButtonIcon/FavoriteButtonIcon';
import { FavoriteButtonWide } from './ButtonWide/FavoriteButtonWide';

type Variant = 'icon' | 'wide';

interface favoriteButtonProps {
  recipeId: string;
  initialIsFavorite: boolean;
  variant: Variant;
  onUnlike?: (recipeId: string) => void;
}

export default function FavoriteButton({
  recipeId,
  initialIsFavorite,
  variant,
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
        onUnlike?.(recipeId);
      } else {
        await addToFavorites(recipeId);
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (variant === 'icon')
    return (
      <FavoriteButtonIcon
        isFavorite={isFavorite}
        loading={loading}
        toggleFavorite={toggleFavorite}
      />
    );
  return (
    <FavoriteButtonWide isFavorite={isFavorite} loading={loading} toggleFavorite={toggleFavorite} />
  );
}
