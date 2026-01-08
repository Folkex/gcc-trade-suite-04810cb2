import React, { createContext, useContext, ReactNode } from 'react';
import { useAccount, useBalance, useChainId, useDisconnect } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';
import { formatUnits } from 'viem';

interface WalletContextType {
  isConnected: boolean;
  address: string | undefined;
  chainId: number | undefined;
  balance: string;
  balanceSymbol: string;
  shortAddress: string;
  openConnectModal: () => void;
  disconnect: () => void;
  isLoading: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const { address, isConnected, isConnecting, isReconnecting } = useAccount();
  const chainId = useChainId();
  const { open } = useAppKit();
  const { disconnect: wagmiDisconnect } = useDisconnect();
  
  // Fetch ETH balance
  const { data: balanceData } = useBalance({
    address: address,
  });

  const shortAddress = address 
    ? `${address.slice(0, 6)}...${address.slice(-4)}` 
    : '';

  // Format balance using viem's formatUnits
  const balance = balanceData 
    ? parseFloat(formatUnits(balanceData.value, balanceData.decimals)).toFixed(4) 
    : '0.0000';

  const balanceSymbol = balanceData?.symbol || 'ETH';

  const openConnectModal = () => {
    open();
  };

  const disconnect = () => {
    wagmiDisconnect();
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        chainId,
        balance,
        balanceSymbol,
        shortAddress,
        openConnectModal,
        disconnect,
        isLoading: isConnecting || isReconnecting,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
