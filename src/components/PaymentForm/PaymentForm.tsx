import { CheckoutCard } from '../CheckoutCard';
import styles from './PaymentForm.module.scss';

export const PaymentForm = () => {
  const product = {
    name: 'Apple iPad Pro 11 (2021) 128GB Silver',
    code: 'x1',
    price: '$1,590'
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal_product}>
        <CheckoutCard
          name={product.name}
          code={product.code}
          price={product.price}
        />
        <div className={styles.round_shape}></div>
      </div>
      <div className={styles.modal_info}>
        <div className={styles.info}>
          <h2 className={styles.info_title}>Payment Information</h2>
          <form>
            <ul className={styles.form_list}>
              <li className={styles.form_list_row}>
                <div className={styles.user}>
                  <label>Name</label>
                  <br />
                  <i className={`${styles.fas} ${styles.fa_user}`}></i>
                  <input type="text" required />
                </div>
              </li>
              <li className={styles.form_list_row}>
                <div className={styles.number}>
                  <label>Card Number</label>
                  <br />
                  <i className={`${styles.far} ${styles.fa_credit_card}`}></i>
                  <input type="text" required />
                </div>
              </li>
              <li className={`${styles.form_list_row} ${styles.clearfix}`}>
                <div className={styles.date}>
                  <label>Expiration Date</label>
                  <br />
                  <input
                    className={styles.month}
                    type="text"
                    required
                    placeholder="MM"
                  />
                  <input
                    className={styles.year}
                    type="text"
                    required
                    placeholder="YY"
                  />
                </div>
                <div className={styles.cvc}>
                  <label>CVC</label>
                  <i className="fas fa-question-circle"></i>
                  <br />
                  <input type="text" required placeholder="123" />
                </div>
              </li>
              <li className={styles.form_list_row}>
                <div className={styles.checkbox}>
                  <label>
                    <input type="checkbox" />
                    <span>Remember My Information</span>
                  </label>
                </div>
              </li>
            </ul>
            <button type="submit" className={styles.pay_button}>
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
