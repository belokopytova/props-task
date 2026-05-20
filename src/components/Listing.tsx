import React from 'react';

interface MainImage {
  url_570xN: string;
}

interface ListingItem {
  listing_id: number;
  url: string;
  MainImage?: MainImage;
  title?: string;
  currency_code?: string;
  price?: string;
  quantity?: number;
}

// типизация для props 
interface ListingProps {
  items?: ListingItem[];
}

const formatTitle = (title?: string): string => {
  if (!title) return '';
  if (title.length > 50) {
    return title.substring(0, 50) + '…';
  }
  return title;
};

// отображение цены
const formatPrice = (price?: string, currencyCode?: string): string => {
  if (!price) return '';
  
  const numericPrice = parseFloat(price);
  if (isNaN(numericPrice)) return `${currencyCode || ''} ${price}`;
  
  switch (currencyCode) {
    case 'USD':
      return `$${numericPrice.toFixed(2)}`;
    case 'EUR':
      return `€${numericPrice.toFixed(2)}`;
    case 'GBP':
      return `£${numericPrice.toFixed(2)}`;
    default:
      return `${currencyCode || 'CAD'} ${numericPrice.toFixed(2)}`;
  }
};

const getStockClass = (quantity?: number): string => {
  if (quantity === undefined || quantity === null) return 'stock-low';
  if (quantity <= 10) return 'stock-low'; 
  if (quantity <= 20) return 'stock-medium';
  return 'stock-high';
};

// текст остатка
const formatStockText = (quantity?: number): string => {
  if (!quantity) return '0 left';
  return `${quantity} left`;
};

// Компонент Listing
const Listing: React.FC<ListingProps> = ({ items = [] }) => {
  if (!items.length) {
    return <div className="no-items">Нет предложений</div>;
  }

  return (
    <div className="listings-container">
      <h2 className="listings-title">Список предложений</h2>
      <div className="listings-grid">
        {items.map((item) => (
          <div key={item.listing_id} className="product-card">
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <img 
                src={item.MainImage?.url_570xN || 'https://via.placeholder.com/570xN?text=No+Image'} 
                alt={formatTitle(item.title)} 
                className="product-image" 
              />
            </a>
            <div className="product-info">
              <h3 className="product-title">{formatTitle(item.title)}</h3>
              <div className="price-container">
                <div className="product-price">
                  {formatPrice(item.price, item.currency_code)}
                </div>
                <span className={`stock-badge ${getStockClass(item.quantity)}`}>
                  {formatStockText(item.quantity)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listing;
