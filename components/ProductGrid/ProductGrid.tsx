'use client';

import { useEffect } from 'react';
import { useProductsStore } from '@/store/products';
import ProductCard from '@/components/ProductCard/ProductCard';
import styles from './ProductGrid.module.scss';

const ProductGrid = () => {
  const { products, isLoading, error, fetchProducts } = useProductsStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (isLoading) {
    return (
      <div className={styles.productGrid}>
        <div className={styles.loading}>
          Loading products...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.productGrid}>
        <div className={styles.error}>
          Error loading products: {error}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.productGrid}>
      <h2 className={styles.title}>Latest Products</h2>
      
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;