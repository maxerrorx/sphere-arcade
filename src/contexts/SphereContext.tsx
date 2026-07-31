'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface SphereContextType {
  isConnected: boolean;
  userNametag: string | null;
  connectWallet: () => void;
  disconnectWallet: () => void;
}

const SphereContext = createContext<SphereContextType | undefined>(undefined);

export function SphereProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [userNametag, setUserNametag] = useState<string | null>(null);

  // Check if already connected on mount
  useEffect(() => {
    const savedNametag = localStorage.getItem('sphereNametag');
    if (savedNametag) {
      setIsConnected(true);
      setUserNametag(savedNametag);
    }
  }, []);

  const connectWallet = () => {
    // Open Sphere wallet connection
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const walletUrl = `https://sphere.unicity.network/connect?origin=${encodeURIComponent(origin)}`;
    
    const popup = window.open(walletUrl, 'SphereWallet', 'width=500,height=600');

    if (popup) {
      // Wait for popup to close
      const checkPopup = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkPopup);
          
          // Assume connection successful when popup closes
          const nametag = `@user_${Date.now()}`;
          localStorage.setItem('sphereNametag', nametag);
          setUserNametag(nametag);
          setIsConnected(true);
        }
      }, 500);
    }
  };

  const disconnectWallet = () => {
    localStorage.removeItem('sphereNametag');
    setUserNametag(null);
    setIsConnected(false);
  };

  return (
    <SphereContext.Provider value={{ isConnected, userNametag, connectWallet, disconnectWallet }}>
      {children}
    </SphereContext.Provider>
  );
}

export function useSphereWallet() {
  const context = useContext(SphereContext);
  if (!context) {
    throw new Error('useSphereWallet must be used within SphereProvider');
  }
  return context;
}