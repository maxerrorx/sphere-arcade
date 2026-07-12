'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { ConnectClient } from '@unicitylabs/sphere-sdk/connect';
import { PostMessageTransport } from '@unicitylabs/sphere-sdk/connect/browser';

export interface SphereUser {
  nametag: string;
  address?: string;
}

export interface SphereContextType {
  isConnected: boolean;
  isConnecting: boolean;
  user: SphereUser | null;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  client: ConnectClient | null;
}

const SphereContext = createContext<SphereContextType | undefined>(undefined);

export const SphereProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [user, setUser] = useState<SphereUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [client, setClient] = useState<ConnectClient | null>(null);

  // Initialize connection on mount
  useEffect(() => {
    const initializeConnection = async () => {
      try {
        // Try silent connection (if already approved)
        const dapp = {
          name: 'Sphere Arcade',
          description: 'Premium web game launcher powered by Sphere',
          icon: 'https://raw.githubusercontent.com/maxerrorx/sphere-arcade/main/public/sphere-arcade-icon.png',
        };

        const walletUrl = 'https://sphere.unicity.network';
        const popup = window.open(walletUrl, 'sphere-wallet', 'width=400,height=600');

        if (popup) {
          const transport = new PostMessageTransport({
            target: popup,
            targetOrigin: walletUrl,
          });

          const newClient = new ConnectClient({
            transport,
            dapp,
            silent: true, // Silent mode: don't show popup if already approved
          });

          setClient(newClient);

          try {
            const identity = await newClient.query.getIdentity();
            if (identity?.nametag) {
              setUser({
                nametag: identity.nametag,
                address: identity.address,
              });
              setIsConnected(true);
            }
          } catch {
            // Silent mode failed, user needs to manually connect
            setIsConnected(false);
          }

          if (popup && !popup.closed) {
            popup.close();
          }
        }
      } catch (err) {
        console.warn('Silent connection failed (expected on first visit):', err);
      }
    };

    initializeConnection();
  }, []);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    setError(null);

    try {
      const dapp = {
        name: 'Sphere Arcade',
        description: 'Premium web game launcher powered by Sphere',
        icon: 'https://raw.githubusercontent.com/maxerrorx/sphere-arcade/main/public/sphere-arcade-icon.png',
      };

      const walletUrl = 'https://sphere.unicity.network';

      // Open popup to Sphere wallet
      const popup = window.open(walletUrl, 'sphere-wallet', 'width=500,height=700');

      if (!popup) {
        throw new Error('Popup blocked. Please allow popups for this site.');
      }

      // Create transport to communicate with popup
      const transport = new PostMessageTransport({
        target: popup,
        targetOrigin: walletUrl,
      });

      // Create client
      const newClient = new ConnectClient({
        transport,
        dapp,
        silent: false, // Show UI in popup
      });

      setClient(newClient);

      // Connect to wallet
      const identity = await newClient.query.getIdentity();

      if (identity?.nametag) {
        setUser({
          nametag: identity.nametag,
          address: identity.address,
        });
        setIsConnected(true);
      } else {
        throw new Error('Failed to retrieve identity from wallet');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Connection failed';
      setError(errorMessage);
      setIsConnected(false);
      console.error('Sphere connection error:', err);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setUser(null);
    setIsConnected(false);
    setError(null);
    setClient(null);
  }, []);

  const value: SphereContextType = {
    isConnected,
    isConnecting,
    user,
    error,
    connect,
    disconnect,
    client,
  };

  return (
    <SphereContext.Provider value={value}>
      {children}
    </SphereContext.Provider>
  );
};

export const useSphereWallet = () => {
  const context = useContext(SphereContext);
  if (!context) {
    throw new Error('useSphereWallet must be used within SphereProvider');
  }
  return context;
};