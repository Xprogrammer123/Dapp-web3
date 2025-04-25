import React, { useState } from 'react';
import WalletCard from '@/components/WalletCard';
import WalletModal from '@/components/WalletModal';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CryptoCarousel from '@/components/CryptoCarousel';
import { ArrowLeftToLine } from 'lucide-react';
import{ Link} from 'react-router-dom'
const WalletSelection = () => {
  const navigate = useNavigate();
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const wallets = [
    {
      name: 'MetaMask',
      icon: 'https://blockchaindappc.pages.dev/assets/images/metamask.jpg',
      description: 'Connect using your MetaMask wallet',
    },
    {
      name: 'Trust Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Trust-wallet.jpg',
      description: 'Connect using your Trust wallet',
    },
    {
      name: 'Best Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/bestwallet.webp',
      description: 'Connect using Best Wallet',
    },
    {
      name: 'Bifrost Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/bitfrost.png',
      description: 'Connect using Bifrost Wallet',
    },
    {
      name: 'Sui WAllet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/sui.png',
      description: 'Connect using Sui WAllet',
    },
    {
      name: 'Rabby Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/rabby.png',
      description: 'Connect using Rabby Wallet',
    },
    {
      name: 'Brave Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/brave%20wallet.webp',
      description: 'Connect using Brave Wallet',
    },
    {
      name: 'Leather Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/leather%20wallet.jpg',
      description: 'Connect using Leather Wallet',
    },
    {
      name: 'OKX Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/okx.jpeg',
      description: 'Connect using OKX Wallet',
    },
    {
      name: 'Sonar',
      icon: 'https://pbs.twimg.com/profile_images/1605279082673065997/kSXRx8LE_400x400.jpg',
      description: 'Connect using Sonar',
    },
    {
      name: 'Keplr',
      icon: 'https://blockchaindappc.pages.dev/assets/images/keplr.png',
      description: 'Connect using Keplr',
    },
    {
      name: 'Leap Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/leap.JPG',
      description: 'Connect using Leap Wallet',
    },
    {
      name: 'STEPN',
      icon: 'https://blockchaindappc.pages.dev/assets/images/stepn.png',
      description: 'Connect using STEPN',
    },
    {
      name: 'Unisat',
      icon: 'https://blockchaindappc.pages.dev/assets/images/unisat.png',
      description: 'Connect using Unisat',
    },
    {
      name: 'Hot Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/hotwallet.jpg',
      description: 'Connect using Hot Wallet',
    },
    {
      name: 'Stake Cube Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/stake.jpg',
      description: 'Connect using Stake Cube Wallet',
    },
    {
      name: 'Solfare',
      icon: 'https://blockchaindappc.pages.dev/assets/images/solflare.jpeg',
      description: 'Connect using Solfare',
    },
    {
      name: 'Wallet Connect',
      icon: 'https://blockchaindappc.pages.dev/assets/images/wclogo.png',
      description: 'Connect using Wallet Connect',
    },
    {
      name: 'Uniswap',
      icon: 'https://blockchaindappc.pages.dev/assets/images/uniswap.png',
      description: 'Connect using Uniswap',
    },
    {
      name: 'Phantom',
      icon: 'https://blockchaindappc.pages.dev/assets/images/phantom.jpg',
      description: 'Connect using Phantom',
    },
    {
      name: 'Coinomi',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Coinomi.jpg',
      description: 'Connect using Coinomi',
    },
    {
      name: 'Coinbase',
      icon: 'https://blockchaindappc.pages.dev/assets/images/coinbase.png',
      description: 'Connect using Coinbase',
    },
    {
      name: 'Gnosis Safe Multisig',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Gnosis%20Safe%20Multisig.jpg',
      description: 'Connect using Gnosis Safe Multisig',
    },
    {
      name: 'Xverce Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/xverse1691669184466.png',
      description: 'Connect using Xverce Wallet',
    },
    {
      name: 'MagicEden',
      icon: 'https://blockchaindappc.pages.dev/assets/images/magiceden.png',
      description: 'Connect using MagicEden',
    },
    {
      name: 'HaloDefi Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/HaloDefi%20Wallet.jpg',
      description: 'Connect using HaloDefi Wallet',
    },
    {
      name: 'Argent',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Argent.jpg',
      description: 'Connect using Argent',
    },
    {
      name: 'Atomic',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Atomic.jpg',
      description: 'Connect using Atomic',
    },
    {
      name: 'Rainbow',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Rainbow.jpg',
      description: 'Connect using Rainbow',
    },
    {
      name: '03Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/03Wallet.jpg',
      description: 'Connect using 03Wallet',
    },
    {
      name: '1Inch Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/1inch%20Wallet.jpg',
      description: 'Connect using 1Inch Wallet',
    },
    {
      name: 'AKTIONARIAT',
      icon: 'https://blockchaindappc.pages.dev/assets/images/AKTIONARIAT.jpg',
      description: 'Connect using AKTIONARIAT',
    },
    {
      name: 'Alice',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Alice.jpg',
      description: 'Connect using Alice',
    },
    {
      name: 'Alpha Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/AlphaWallet.jpg',
      description: 'Connect using Alpha Wallet',
    },
    {
      name: 'Crypto | Defi',
      icon: 'https://blockchaindappc.pages.dev/assets/images/crypto.jpg',
      description: 'Connect using Crypto | Defi',
    },
    {
      name: 'AT.Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/AT.Wallet.jpg',
      description: 'Connect using AT.Wallet',
    },
    {
      name: 'AToken Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/AToken%20Wallet.jpg',
      description: 'Connect using AToken Wallet',
    },
    {
      name: 'Authereum',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Authereum.jpg',
      description: 'Connect using Authereum',
    },
    {
      name: 'Binance Smart Chain',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Binance%20Smart%20Chain.jpg',
      description: 'Connect using Binance Smart Chain',
    },
    {
      name: 'Bit Keep',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Bitkeep.jpg',
      description: 'Connect using Bit Keep',
    },
    {
      name: 'BitPay',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Bitpay.jpg',
      description: 'Connect using BitPay',
    },
    {
      name: 'Bridge Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Brige%20Wallet.jpg',
      description: 'Connect using Bridge Wallet',
    },
    {
      name: 'Coin98',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Coin98.jpg',
      description: 'Connect using Coin98',
    },
    {
      name: 'CoolWallet S',
      icon: 'https://blockchaindappc.pages.dev/assets/images/CoolWallet%20S.jpg',
      description: 'Connect using CoolWallet S',
    },
    {
      name: 'CYBAVO Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/CYBAVO%20Wallet.jpg',
      description: 'Connect using CYBAVO Wallet',
    },
    {
      name: 'DCENT Wallet',
      icon: 'https://www.yadawallets.com/wp-content/uploads/2020/11/DCent-wallet-logo.png',
      description: 'Connect using DCENT Wallet',
    },
    {
      name: 'Dfiant',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Defiant.jpg',
      description: 'Connect using Dfiant',
    },
    {
      name: 'Dharma',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Dharma.jpg',
      description: 'Connect using Dharma',
    },
    {
      name: 'Dok Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Dok%20Wallet.jpg',
      description: 'Connect using Dok Wallet',
    },
    {
      name: 'Easy Pcket',
      icon: 'https://blockchaindappc.pages.dev/assets/images/EasyPocket.jpg',
      description: 'Connect using Easy Pcket',
    },
    {
      name: 'Eidoo',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Eidoo.jpg',
      description: 'Connect using Eidoo',
    },
    {
      name: 'Ellipal',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Ellipal.jpg',
      description: 'Connect using Ellipal',
    },
    {
      name: 'Equal',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Equal.jpg',
      description: 'Connect using Equal',
    },
    {
      name: 'Flare Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Flare%20Wallet.jpg',
      description: 'Connect using Flare Wallet',
    },
    {
      name: 'GridPlus',
      icon: 'https://blockchaindappc.pages.dev/assets/images/GridPlus.jpg',
      description: 'Connect using GridPlus',
    },
    {
      name: 'Guarda Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Guarda%20Wallet.jpg',
      description: 'Connect using Guarda Wallet',
    },
    {
      name: 'HaloDefi Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/HaloDefi%20Wallet.jpg',
      description: 'Connect using HaloDefi Wallet',
    },
    {
      name: 'HaskKey Me',
      icon: 'https://blockchaindappc.pages.dev/assets/images/HaskKey%20Me.jpg',
      description: 'Connect using HaskKey Me',
    },
    {
      name: 'Huobi Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Huobi%20Wallet.jpg',
      description: 'Connect using Huobi Wallet',
    },
    {
      name: 'imToken',
      icon: 'https://blockchaindappc.pages.dev/assets/images/imToken.jpg',
      description: 'Connect using imToken',
    },
    {
      name: 'Infinito',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Infinito.jpg',
      description: 'Connect using Infinito',
    },
    {
      name: 'Infinity Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Infinity%20Wallet.jpg',
      description: 'Connect using Infinity Wallet',
    },
    {
      name: 'Jade Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Jade%20Wallet.jpg',
      description: 'Connect using Jade Wallet',
    },
    {
      name: 'KEYRING PRO',
      icon: 'https://blockchaindappc.pages.dev/assets/images/KEYRING%20PRO.jpg',
      description: 'Connect using KEYRING PRO',
    },
    {
      name: 'KyberSwap',
      icon: 'https://blockchaindappc.pages.dev/assets/images/KyberSwap.jpg',
      description: 'Connect using KyberSwap',
    },
    {
      name: 'Ledger Live',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Ledger%20Live.jpg',
      description: 'Connect using Ledger Live',
    },
    {
      name: 'Loopring Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Loopring%20Wallet.jpg',
      description: 'Connect using Loopring Wallet',
    },
    {
      name: 'MathWallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/MathWallet.jpg',
      description: 'Connect using MathWallet',
    },
    {
      name: 'Midas Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Midas%20Wallet.jpg',
      description: 'Connect using Midas Wallet',
    },
    {
      name: 'MoriX Wallet',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUo1sIw72jzPO4InVwEpwZsFCmff0tdCUVjA&s',
      description: 'Connect using MoriX Wallet',
    },
    {
      name: 'MYKEY',
      icon: 'https://blockchaindappc.pages.dev/assets/images/MYKEY.jpg',
      description: 'Connect using MYKEY',
    },
    {
      name: 'Nash',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Nash.jpg',
      description: 'Connect using Nash',
    },
    {
      name: 'ONTO',
      icon: 'https://blockchaindappc.pages.dev/assets/images/ONTO.jpg',
      description: 'Connect using ONTO',
    },
    {
      name: 'Ownbit',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Ownbit.jpg',
      description: 'Connect using Ownbit',
    },
    {
      name: 'pillar',
      icon: 'https://blockchaindappc.pages.dev/assets/images/pillar.jpg',
      description: 'Connect using pillar',
    },
    {
      name: 'PEAKDEFI Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/PEAKDEFI%20Wallet.jpg',
      description: 'Connect using PEAKDEFI Wallet',
    },
    {
      name: 'PlasmaPay',
      icon: 'https://blockchaindappc.pages.dev/assets/images/PlasmaPay.jpg',
      description: 'Connect using PlasmaPay',
    },
    {
      name: 'RWallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/RWallet.jpg',
      description: 'Connect using RWallet',
    },
    {
      name: 'SafePal',
      icon: 'https://blockchaindappc.pages.dev/assets/images/SafePal.jpg',
      description: 'Connect using SafePal',
    },
    {
      name: 'SpartPoint',
      icon: 'https://blockchaindappc.pages.dev/assets/images/SpartPoint.jpg',
      description: 'Connect using SpartPoint',
    },
    {
      name: 'Spatium',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Spatium.jpg',
      description: 'Connect using Spatium',
    },
    {
      name: 'Talken Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Talken%20Wallet.jpg',
      description: 'Connect using Talken Wallet',
    },
    {
      name: 'Tokenary',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Tokenary.jpg',
      description: 'Connect using Tokenary',
    },
    {
      name: 'TokenPocket',
      icon: 'https://blockchaindappc.pages.dev/assets/images/TokenPocket.jpg',
      description: 'Connect using TokenPocket',
    },
    {
      name: 'Tongue Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Tongue%20Wallet.jpg',
      description: 'Connect using Tongue Wallet',
    },
    {
      name: 'Torus',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Torus.jpg',
      description: 'Connect using Torus',
    },
    {
      name: 'Trust Vault',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Trust%20Vault.jpg',
      description: 'Connect using Trust Vault',
    },
    {
      name: 'Trustee Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Trustee%20Wallet.jpg',
      description: 'Connect using Trustee Wallet',
    },
    {
      name: 'Unstoppable Wallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Unstoppable%20Wallet.jpg',
      description: 'Connect using Unstoppable Wallet',
    },
    {
      name: 'Viawallet',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Viawallet.jpg',
      description: 'Connect using Viawallet',
    },
    {
      name: 'Vision',
      icon: 'https://blockchaindappc.pages.dev/assets/images/Vision.jpg',
      description: 'Connect using Vision',
    },
    {
      name: 'wallet.io',
      icon: 'https://blockchaindappc.pages.dev/assets/images/wallet.io.jpg',
      description: 'Connect using wallet.io',
    },
    {
      name: 'XinFin XDC Network',
      icon: 'https://blockchaindappc.pages.dev/assets/images/XinFin%20XDC%20Network.jpg',
      description: 'Connect using XinFin XDC Network',
    },
    {
      name: 'ZelCore',
      icon: 'https://blockchaindappc.pages.dev/assets/images/ZelCore.jpg',
      description: 'Connect using ZelCore',
    },

  ];

  const filteredWallets = searchQuery.trim() === ''
    ? wallets
    : wallets.filter(wallet =>
      wallet.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleWalletSelect = (walletName: string) => {
    setSelectedWallet(walletName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWallet(null);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gradient">Select Wallet</h1>
        <Button variant="outline" onClick={() => navigate('/')} className="rounded-full">
          <ArrowLeftToLine className="h-5 w-5" /> Back to Home
        </Button>
      </div>

      <CryptoCarousel />

      {/* Search Bar */}
      <div className="mt-8 mb-8">
        <input
          type="text"
          placeholder="Search wallets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-transparent rounded-full "
        />
      </div>

      {/* Filtered Wallets Section */}
      <section>
        <h2 className="text-xl font-semibold mb-6 text-gray-200">
          {searchQuery ? 'Search Results' : 'All Wallets'}
        </h2>
        {filteredWallets.length === 0 ? (
          <p className="text-gray-400 italic">No wallets match your search.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 gap-2 mb-12">
            {filteredWallets.map((wallet, index) => (
              <WalletCard
                key={index}
                name={wallet.name}
                icon={wallet.icon}
                description={wallet.description}
                onClick={() => handleWalletSelect(wallet.name)}
              />
            ))}
          </div>
        )}
      </section>

      <Separator className="my-12 bg-web3-primary/20" />

      {/* Security Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gradient">Security First</h2>
        <div className="glass-card p-6">
          <p className="text-gray-300 mb-4">
            Your security is our top priority. When connecting your wallet, ensure:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li>You're on the correct website (check the URL)</li>
            <li>You have antivirus and anti-malware protection</li>
            <li>You never share your seed phrase with anyone</li>
            <li>You use hardware wallets for storing large amounts</li>
            <li>You enable two-factor authentication where possible</li>
          </ul>
        </div>
      </section>

      {/* Resources Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gradient">Web3 Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-3 text-web3-primary">Learn About Wallets</h3>
            <p className="text-gray-400 mb-4">
              New to cryptocurrency wallets? Learn the basics of securing your digital assets
              and navigating the Web3 ecosystem.
            </p>
            <Button variant="outline" className="border-web3-primary text-web3-primary hover:bg-web3-primary/10">
              Explore Guides
            </Button>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-3 text-web3-primary">Troubleshooting</h3>
            <p className="text-gray-400 mb-4">
              Having issues connecting your wallet? Check our troubleshooting guides
              or contact our support team.
            </p>
            <Button variant="outline" className="border-web3-primary text-web3-primary hover:bg-web3-primary/10">
            <Link to="/admin">
              Get Help
            </Link>
            </Button>
          </div>
        </div>
      </section>

      {selectedWallet && (
        <WalletModal
          isOpen={isModalOpen}
          onClose={closeModal}
          walletName={selectedWallet}

        />
      )}
    </div>
  );
};

export default WalletSelection;
