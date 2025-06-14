'use client';

import { useEffect } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import { useProductsStore } from '@/store/products';

export default function CamerasPage() {
  const { searchProducts } = useProductsStore();

  useEffect(() => {
    // Ищем товары связанные с камерами и фотографией
    searchProducts('camera');
  }, [searchProducts]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', marginBottom: '2rem' }}>
            📷 Cameras & Photography
          </h1>
          <ProductGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
}