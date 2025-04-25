import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const coinColors: Record<string, string> = {
  bitcoin: '#F7931A',
  ethereum: '#3C3C3D',
  tether: '#26A17B',
  binancecoin: '#F0B90B',
  solana: '#9945FF',
  ripple: '#346AA9',
  cardano: '#0033AD',
  dogecoin: '#C2A633',
  tron: '#EF0027',
  polkadot: '#E6007A',
};

const CryptoChart = () => {
  const [cryptoData, setCryptoData] = useState<Record<string, number[]>>({});
  const [timestamps, setTimestamps] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&sparkline=false'
        );
        const data = await response.json();

        const updatedData: Record<string, number[]> = { ...cryptoData };
        const now = new Date().toLocaleTimeString();

        data.forEach((coin: any) => {
          if (!updatedData[coin.id]) {
            updatedData[coin.id] = [];
          }
          updatedData[coin.id] = [...updatedData[coin.id].slice(-29), coin.current_price];
        });

        setCryptoData(updatedData);
        setTimestamps(prev => [...prev.slice(-29), now]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [cryptoData]);

  const generateGradient = (ctx: CanvasRenderingContext2D, color: string) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, `${color}00`);
    return gradient;
  };

  const createChartData = () => {
    const canvas = chartRef.current?.ctx;

    return {
      labels: timestamps,
      datasets: Object.entries(cryptoData).map(([coinId, prices]) => {
        const baseColor = coinColors[coinId] || '#8884d8';
        const gradient = canvas ? generateGradient(canvas, baseColor) : baseColor;

        return {
          label: coinId.toUpperCase(),
          data: prices,
          fill: true,
          backgroundColor: gradient,
          borderColor: baseColor,
          tension: 0.4,
          pointRadius: 0,
        };
      }),
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#fff',
          font: {
            size: 14,
            family: "'Oswald', sans-serif",
          },
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 16,
          family: "'Oswald', sans-serif",
        },
        bodyFont: {
          size: 12,
          family: "'Oswald', sans-serif",
        },
      },
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#fff',
          font: {
            family: "'Oswald', sans-serif",
          },
          callback: (value: number) => `$${value.toLocaleString()}`,
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#fff',
          font: {
            family: "'Oswald', sans-serif",
          },
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-web3-primary"></div>
      </div>
    );
  }

  return (
    <div className="mb-10 p-10 h-[70vh]">
      <h2 className="text-3xl md:text-6xl font-bold mb-6 text-gradient text-center">Live Crypto Prices</h2>
      <Line ref={chartRef} data={createChartData()} options={options} />
    </div>
  );
};

export default CryptoChart;
