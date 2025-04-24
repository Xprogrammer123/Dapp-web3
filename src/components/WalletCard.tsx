
import React from 'react';

interface WalletCardProps {
  name: string;
  icon: string;
  description: string;
  onClick: () => void;
}

const WalletCard: React.FC<WalletCardProps> = ({ name, icon, description, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="glass-card p-5 transition-all duration-300 hover:bg-web3-primary/10 
                cursor-pointer hover:scale-105 flex flex-col items-center text-center"
    >
      <div className="mb-4 h-16 w-16 flex items-center justify-center rounded-full overflow-hidden">
        <img src={icon} alt={name} className="w-full h-full object-contain" />
      </div>
      <h3 className="text-lg font-bold mb-2 text-web3-primary">{name}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
};

export default WalletCard;
