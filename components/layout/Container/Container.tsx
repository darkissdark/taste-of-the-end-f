import { PropsWithChildren } from 'react';
import style from './Container.module.css';

export default function Container({ children }: PropsWithChildren) {
  return <div className={style.main}>{children}</div>;
}
