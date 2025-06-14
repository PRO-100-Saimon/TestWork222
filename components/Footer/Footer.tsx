'use client';

import { useAuthStore } from '@/store/auth';
import styles from './Footer.module.scss';

const Footer = () => {
  const { user, isAuthenticated } = useAuthStore();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.year}>
            © {currentYear}
          </div>
          {isAuthenticated && user && (
            <div className={styles.userEmail}>
              Logged as {user.email}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;