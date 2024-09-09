import { useState } from 'react';
import { ContactInfo } from '../../components/ContanctInfo';
import { CartItem } from '@/types/CartItemType';
import { ContactInfoData } from '@/types/InputType';

import styles from './CheckoutPage.module.scss';

export const CheckoutPage = () => {
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([
    { id: 1, image: 'path_to_image_1', name: 'Товар 1', count: 2, price: 100 },
    { id: 2, image: 'path_to_image_2', name: 'Товар 2', count: 1, price: 150 }
  ]);

  const handleContactInfoChange = (info: ContactInfoData) => {
    console.log('Updated Contact Info:', info);
  };

  return (
    <div className={styles.checkout__page}>
      <h1>Оформление заказа</h1>
      <ContactInfo
        onContactInfoChange={handleContactInfoChange}
        selectedItems={selectedItems}
      />
    </div>
  );
};
