import Container from '@/components/layout/Container/Container';
import Image from 'next/image';
import Link from 'next/link';
import { SvgIcon } from '@/components/ui/icons/SvgIcon';

import css from './NotFoundLayout.module.css';

type NotFoundLayoutProps = {
  code?: string;
  message: string;
  backHref?: string;
  backLabel?: string;
  imageSrc?: string;
  imageAlt?: string;
  iconName?: string;
};

const NotFoundLayout = ({
  code = '404',
  message,
  backHref = '/',
  backLabel = 'Back to Home',
  imageSrc,
  imageAlt = 'Not found',
  iconName,
}: NotFoundLayoutProps) => {
  return (
    <Container>
      <div className={css.notFoundContainer}>
        {iconName ? (
          <SvgIcon name={iconName} className={css.image} />
        ) : (
          imageSrc && (
            <Image
              className={css.image}
              src={imageSrc}
              alt={imageAlt}
              width={600}
              height={438}
              sizes="(max-width: 767px) 361px, 600px"
            />
          )
        )}

        {code && <h1 className={css.title}>{code}</h1>}
        <p className={css.text}>{message}</p>

        <Link href={backHref} className={css.backLink}>
          <SvgIcon name="back_to_home" className={css.icon} />
          {backLabel}
        </Link>
      </div>
    </Container>
  );
};

export default NotFoundLayout;
