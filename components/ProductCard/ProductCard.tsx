'use client';

import Image from 'next/image';
import { Product } from '@/types/api';
import { useAuthStore } from '@/store/auth';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { isAuthenticated } = useAuthStore();

  const handleAddToCart = () => {
    // Placeholder function - not implemented as per requirements
    console.log('Add to cart:', product.id);
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={200}
          className={styles.productImage}
          priority={false}
        />
      </div>
      
      <div className={styles.content}>
        <div className={styles.category}>
          {product.category}
        </div>
        
        <h3 className={styles.title}>
          {product.title}
        </h3>
        
        <div className={styles.footer}>
          <span className={styles.price}>
            ${product.price.toFixed(2)}
          </span>
          
          {isAuthenticated && (
            <button 
              onClick={handleAddToCart}
              className={styles.addToCartButton}
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;