import { useWallet } from '@/contexts/WalletContext';
import { toast } from 'sonner';

export const useRequireWallet = () => {
  const { isConnected, openConnectModal } = useWallet();

  const requireWallet = (action: string = 'perform this action'): boolean => {
    if (!isConnected) {
      toast.error(`Please connect your wallet to ${action}`, {
        action: {
          label: 'Connect',
          onClick: () => openConnectModal(),
        },
      });
      return false;
    }
    return true;
  };

  return { requireWallet, isConnected };
};
