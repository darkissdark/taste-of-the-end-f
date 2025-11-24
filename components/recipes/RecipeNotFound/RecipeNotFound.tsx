import css from './RecipeNotFound.module.css';
import { SvgIcon } from '@/components/ui/icons/SvgIcon';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Container from '@/components/layout/Container/Container';

const RecipeNotFound = () => {
  return (
    <Container>
      <div className={`${css.container} ${css.notFoundContainer}`}>
        <Image
          className={css.image}
          src="/recipeNF.jpg"
          alt="Recipe Not Found"
          width={600}
          height={438}
          sizes="(max-width: 767px) 361px, 600px"
        />
        <h1 className={css.title}>404</h1>
        <p className={css.text}>Recipe not found</p>
        <Link href="/" className={css.backLink}>
          <SvgIcon name="back_to_home" className={css.icon} />
          Back to Home
        </Link>
      </div>
    </Container>
  );
};

export default RecipeNotFound;
