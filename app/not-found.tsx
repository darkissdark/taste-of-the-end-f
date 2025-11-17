import css from './not-found.module.css';
import { SvgIcon } from '@/components/ui/icons/SvgIcon';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className={css.pageWrapper}>
      <div className={css.content}>
        <h1 className={css.title}>Oops!</h1>
        <p className={css.discription}>You are lost</p>
        <SvgIcon name="img-404" className={css.logo} />
        <button className={css.btn}>
          <SvgIcon name="arrow-back" className={css.iconBack} />
          <Link href="/">Go Home</Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
