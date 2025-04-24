import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const CryptoCarousel: React.FC = () => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CryptoData[]>(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 10,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCryptos(response.data);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative overflow-hidden bg-transparent py-4 rounded-full">
    <div className="flex animate-marquee space-x-10 w-max px-20">
      {[...cryptos, ...cryptos].map((crypto, index) => (
        <div
          key={index}
          className="flex items-center space-x-2 text-white px-4 py-2 bg-black bg-opacity-50 rounded-full border border-white/10 shadow-sm"
        >
          <img
            src={crypto.image}
            alt={crypto.name}
            className="w-6 h-6 rounded-full"
          />
          <span className="font-medium text-sm">{crypto.name}</span>
          <span className="text-xs text-green-400">
            ${crypto.current_price.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  </div>
  
  
  );
};

export default CryptoCarousel;
