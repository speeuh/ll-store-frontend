import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';

import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.footer__social_list}>
        <li className={styles.footer__social_list_link}>
          <a href='https://www.facebook.com/' target='_blank' rel='noreferrer'>
            <BsFacebook />
          </a>
        </li>
        <li className={styles.footer__social_list_link}>
          <a href='https://www.instagram.com/' target='_blank' rel='noreferrer'>
            <BsInstagram />
          </a>
        </li>
        <li className={styles.footer__social_list_link}>
          <a href='https://www.twitter.com/' target='_blank' rel='noreferrer'>
            <BsTwitter />
          </a>
        </li>
      </ul>
      <p className={styles.footer__copy_right}>
        <span>llStore</span> &copy;2022
      </p>
    </footer>
  );
}
