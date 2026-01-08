import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { mainnet, bsc, arbitrum, polygon } from '@reown/appkit/networks';

// Get projectId from environment or use a placeholder for development
// You can get a free project ID at https://cloud.reown.com
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'c4f79cc661bb73c9f9ed164dd88e2da3';

// Metadata for your app
const metadata = {
  name: 'Arbah.co',
  description: 'Elite Crypto Trading Platform',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://arbah.co',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

// Define the networks
const networks = [mainnet, bsc, arbitrum, polygon] as const;

// Create Wagmi Adapter with explicit config
export const wagmiAdapter = new WagmiAdapter({
  networks: networks as any,
  projectId,
  ssr: false,
});

// Get wagmi config before creating AppKit
export const wagmiConfig = wagmiAdapter.wagmiConfig;

// Create the modal - must be called after wagmiAdapter is fully initialized
let appKitInstance: ReturnType<typeof createAppKit> | null = null;

export const getAppKit = () => {
  if (!appKitInstance) {
    appKitInstance = createAppKit({
      adapters: [wagmiAdapter],
      networks: networks as any,
      projectId,
      metadata,
      features: {
        analytics: true,
        email: false,
        socials: false,
      },
      themeMode: 'dark',
      themeVariables: {
        '--w3m-color-mix': '#00ff88',
        '--w3m-color-mix-strength': 20,
        '--w3m-accent': '#00ff88',
        '--w3m-border-radius-master': '8px',
      },
    });
  }
  return appKitInstance;
};

// Initialize immediately
export const appKit = getAppKit();
