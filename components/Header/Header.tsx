'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { Phone, Mail, MapPin, User, LogOut } from 'lucide-react';
import styles from './Header.module.scss';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
  };

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.container}>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <Phone className={styles.icon} />
              <span>+021-95-51-84</span>
            </div>
            <div className={styles.contactItem}>
              <Mail className={styles.icon} />
              <span>shop@abelohost.com</span>
            </div>
            <div className={styles.contactItem}>
              <MapPin className={styles.icon} />
              <span>1734 Stonecoal Road</span>
            </div>
          </div>

          <div className={styles.authSection}>
            {isAuthenticated && user ? (
              <div className={styles.userInfo}>
                <span className={styles.userName}>
                  {user.firstName} {user.lastName}
                </span>
                <button onClick={handleLogout} className={styles.logoutButton}>
                  <LogOut className={styles.icon} />
                  Logout
                </button>
              </div>
            ) : (
              <div className={styles.authLinks}>
                <Link href="/login" className={styles.loginLink}>
                  <User className={styles.icon} />
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.mainHeader}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            Abelohost Shop<span className={styles.dot}>.</span>
          </Link>

          <nav className={styles.nav}>
            <Link
              href="/"
              className={`${styles.navLink} ${isActiveLink('/') ? styles.active : ''}`}
            >
              Home
            </Link>
            <Link
              href="/hot-deals"
              className={`${styles.navLink} ${isActiveLink('/hot-deals') ? styles.active : ''}`}
            >
              Hot Deals
            </Link>
            <Link
              href="/laptops"
              className={`${styles.navLink} ${isActiveLink('/laptops') ? styles.active : ''}`}
            >
              Laptops
            </Link>
            <Link
              href="/smartphones"
              className={`${styles.navLink} ${isActiveLink('/smartphones') ? styles.active : ''}`}
            >
              Smartphones
            </Link>
            <Link
              href="/cameras"
              className={`${styles.navLink} ${isActiveLink('/cameras') ? styles.active : ''}`}
            >
              Cameras
            </Link>
            <Link
              href="/accessories"
              className={`${styles.navLink} ${isActiveLink('/accessories') ? styles.active : ''}`}
            >
              Accessories
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
