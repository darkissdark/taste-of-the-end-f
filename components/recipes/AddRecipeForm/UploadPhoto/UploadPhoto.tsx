import { useState, ChangeEvent, useRef } from 'react';
import css from './UploadPhoto.module.css';

const defaultImages = {
  mobile: '/default-image-mobile.jpg',
  tablet: '/default-image-tablet.jpg',
  desktop: '/default-image-desktop.jpg',
};

const UploadPhoto = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const onImageClick = () => {
    inputRef.current?.click();
  };

  return (
    <form>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className={css.upload}
        onChange={onFileChange}
      />
      {preview ? (
        <img
          src={preview}
          alt="preview"
          onClick={onImageClick}
          className={css.photo}
          style={{ cursor: 'pointer' }}
        />
      ) : (
        <picture onClick={onImageClick} style={{ cursor: 'pointer' }}>
          <source srcSet={defaultImages.mobile} media="(max-width: 767px)" />
          <source srcSet={defaultImages.tablet} media="(max-width: 1439px)" />
          <img src={defaultImages.desktop} alt="default preview" className={css.photo} />
        </picture>
      )}
    </form>
  );
};

export default UploadPhoto;
