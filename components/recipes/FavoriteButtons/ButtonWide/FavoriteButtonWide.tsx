import { SvgIcon } from '@/components/ui/icons/SvgIcon';
import css from './FavoriteButtonWide.module.css';

interface Props {
  isFavorite: boolean;
  loading: boolean;
  toggleFavorite: () => void;
}

export function FavoriteButtonWide({ isFavorite, loading, toggleFavorite }: Props) {
  return (
    <button className={css.favoriteButton} disabled={loading} onClick={toggleFavorite}>
      <span>{isFavorite ? 'Unsave' : 'Save'}</span>
      <SvgIcon className={isFavorite ? css.favoriteActive : css.noFavorite} name="save_tooth" />
    </button>
  );
}
