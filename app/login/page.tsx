'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './login.module.scss';

interface FormData {
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
}

const LoginPage = () => {
  const router = useRouter();
  const { login, isAuthenticated, isLoading, error, clearError } = useAuthStore();

  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    clearError();
  }, [clearError]);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (formData.username.trim().length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.trim().length < 3) {
      errors.password = 'Password must be at least 3 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await login({
        username: formData.username.trim(),
        password: formData.password.trim(),
      });
      // Redirect will happen automatically via useEffect
    } catch (error) {
      // Error is handled by the store
      console.error('Login failed:', error);
    }
  };

  if (isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className={styles.loginPage}>
      <Header />

      <main className={styles.main}>
        <div className={styles.loginContainer}>
          <h1 className={styles.title}>Login</h1>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.label}>
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`${styles.input} ${formErrors.username ? styles.error : ''}`}
                placeholder="Enter your username"
                disabled={isLoading}
              />
              {formErrors.username && (
                <span className={styles.errorMessage}>{formErrors.username}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`${styles.input} ${formErrors.password ? styles.error : ''}`}
                placeholder="Enter your password"
                disabled={isLoading}
              />
              {formErrors.password && (
                <span className={styles.errorMessage}>{formErrors.password}</span>
              )}
            </div>

            <button type="submit" disabled={isLoading} className={styles.submitButton}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>

            {error && <div className={styles.generalError}>{error}</div>}
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;
