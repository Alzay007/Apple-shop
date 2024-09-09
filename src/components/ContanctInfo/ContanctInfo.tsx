import React, { ChangeEvent, useState } from 'react';
import { ContactInfoData } from './../../types/InputType';
import { CartItem } from './../../types/CartItemType';

import styles from './ContactInfo.module.scss';

interface ContactInfoProps {
  onContactInfoChange: (info: ContactInfoData) => void;
  selectedItems: CartItem[];
}

export const ContactInfo: React.FC<ContactInfoProps> = ({
  onContactInfoChange
}) => {
  const [contactInfo, setContactInfo] = useState<ContactInfoData>({
    name: '',
    lastname: '',
    middlename: '',
    email: '',
    phone: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedContactInfo = { ...contactInfo, [name]: value };
    setContactInfo(updatedContactInfo);
    onContactInfoChange(updatedContactInfo);
  };

  return (
    <div className={styles.contact__info}>
      <h2>Контактная информация</h2>
      <input
        type="text"
        name="name"
        placeholder="Имя"
        value={contactInfo.name}
        onChange={handleChange}
        className={styles.contact__info_input}
      />
      <input
        type="text"
        name="lastname"
        placeholder="Фамилия"
        value={contactInfo.lastname}
        onChange={handleChange}
        className={styles.contact__info_input}
      />
      <input
        type="text"
        name="middlename"
        placeholder="Отчество"
        value={contactInfo.middlename}
        onChange={handleChange}
        className={styles.contact__info_input}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={contactInfo.email}
        onChange={handleChange}
        className={styles.contact__info_input}
      />
      <input
        type="tel"
        name="phone"
        placeholder="Телефон"
        value={contactInfo.phone}
        onChange={handleChange}
        className={styles.contact__info_input}
      />
    </div>
  );
};
