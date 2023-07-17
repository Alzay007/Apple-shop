import { Fragment } from 'react';
import { ProductDescription } from 'types/ProductDescription';

import styles from './ProductAbout.module.scss';

interface ProductAboutProps {
  description: ProductDescription[] | undefined;
}

export const ProductAbout = ({ description }: ProductAboutProps) => {
  return (
    <div className={styles.about}>
      <h2 className={styles.about__title}>About</h2>

      {description?.map((spec: ProductDescription) => (
        <Fragment key={spec.title}>
          <h3 className={styles.about__subtitle}>{spec.title}</h3>

          <p className={styles.about__content}>
            {spec.text.map((text: string) => (
              <span key={text} className={styles.about_text}>
                {text}
              </span>
            ))}
          </p>
        </Fragment>
      ))}
    </div>
  );
};
