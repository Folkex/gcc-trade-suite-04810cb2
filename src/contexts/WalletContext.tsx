import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { useAccount, useBalance, useChainId, useDisconnect, useReadContracts } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';
import { formatUnits } from 'viem';

// Token contract addresses on Ethereum Mainnet
const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' as const;
const USDT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7' as const;

// ERC20 ABI for balanceOf
const erc20Abi = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
] as const;

// Mock ETH price for USD conversion (in production, fetch from API)
const ETH_PRICE_USD = 3500;

export interface TokenBalance {
  symbol: string;
  name: string;
  balance: string;
  balanceRaw: bigint;
  decimals: number;
  valueUsd: number;
  icon?: string;
}

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
  // New portfolio data
  tokenBalances: TokenBalance[];
  externalWalletValue: number;
  portfolioLoading: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Mock internal balance (will be replaced with database in future)
export const INTERNAL_BALANCE = 0;

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const { address, isConnected, isConnecting, isReconnecting } = useAccount();
  const chainId = useChainId();
  const { open } = useAppKit();
  const { disconnect: wagmiDisconnect } = useDisconnect();
  
  // Fetch ETH balance
  const { data: ethBalanceData, isLoading: ethLoading } = useBalance({
    address: address,
  });

  // Fetch ERC20 token balances using multicall
  const { data: tokenData, isLoading: tokensLoading } = useReadContracts({
    contracts: address ? [
      {
        address: USDC_ADDRESS,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [address],
      },
      {
        address: USDT_ADDRESS,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [address],
      },
    ] : [],
  });

  const shortAddress = address 
    ? `${address.slice(0, 6)}...${address.slice(-4)}` 
    : '';

  // Format balance using viem's formatUnits
  const balance = ethBalanceData 
    ? parseFloat(formatUnits(ethBalanceData.value, ethBalanceData.decimals)).toFixed(4) 
    : '0.0000';

  const balanceSymbol = ethBalanceData?.symbol || 'ETH';

  // Calculate token balances and portfolio value
  const { tokenBalances, externalWalletValue } = useMemo(() => {
    const balances: TokenBalance[] = [];
    let totalValue = 0;

    // ETH Balance
    if (ethBalanceData) {
      const ethAmount = parseFloat(formatUnits(ethBalanceData.value, ethBalanceData.decimals));
      const ethValueUsd = ethAmount * ETH_PRICE_USD;
      balances.push({
        symbol: 'ETH',
        name: 'Ethereum',
        balance: ethAmount.toFixed(6),
        balanceRaw: ethBalanceData.value,
        decimals: ethBalanceData.decimals,
        valueUsd: ethValueUsd,
        icon: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
      });
      totalValue += ethValueUsd;
    }

    // USDC Balance (6 decimals)
    if (tokenData?.[0]?.result !== undefined) {
      const usdcBalance = tokenData[0].result as bigint;
      const usdcAmount = parseFloat(formatUnits(usdcBalance, 6));
      const usdcValueUsd = usdcAmount; // USDC is 1:1 with USD
      balances.push({
        symbol: 'USDC',
        name: 'USD Coin',
        balance: usdcAmount.toFixed(2),
        balanceRaw: usdcBalance,
        decimals: 6,
        valueUsd: usdcValueUsd,
        icon: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
      });
      totalValue += usdcValueUsd;
    }

    // USDT Balance (6 decimals)
    if (tokenData?.[1]?.result !== undefined) {
      const usdtBalance = tokenData[1].result as bigint;
      const usdtAmount = parseFloat(formatUnits(usdtBalance, 6));
      const usdtValueUsd = usdtAmount; // USDT is 1:1 with USD
      balances.push({
        symbol: 'USDT',
        name: 'Tether',
        balance: usdtAmount.toFixed(2),
        balanceRaw: usdtBalance,
        decimals: 6,
        valueUsd: usdtValueUsd,
        icon: 'https://assets.coingecko.com/coins/images/325/small/Tether.png',
      });
      totalValue += usdtValueUsd;
    }

    return { tokenBalances: balances, externalWalletValue: totalValue };
  }, [ethBalanceData, tokenData]);

  const openConnectModal = () => {
    open();
  };

  const disconnect = () => {
    wagmiDisconnect();
  };

  const portfolioLoading = ethLoading || tokensLoading;

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
        tokenBalances,
        externalWalletValue,
        portfolioLoading,
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
