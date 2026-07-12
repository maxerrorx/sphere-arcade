'use client';

import React from 'react';
import { Wallet, LogOut, Loader } from 'lucide-react';
import PrimaryButton from './PrimaryButton';
import { useSphereWallet } from '@/contexts/SphereContext';
import { formatNametag } from '@/lib/sphere-utils';

interface ConnectButtonProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showNametag?: boolean;
}

const ConnectButton = ({
  size = 'md',
  className = '',
  showNametag = true,
}: ConnectButtonProps) => {
  const { isConnected, isConnecting, user, connect, disconnect, error } = useSphereWallet();

  const handleClick = async () => {
    if (isConnected) {
      disconnect();
    } else {
      await connect();
    }
  };

  // Connected state: show nametag
  if (isConnected && user) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {/* Nametag display */}
        {showNametag && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
            <Wallet className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-semibold text-orange-400">
              {formatNametag(user.nametag)}
            </span>
          </div>
        )}

        {/* Disconnect button */}
        <PrimaryButton
          size={size}
          variant="secondary"
          icon={LogOut}
          onClick={handleClick}
          disabled={false}
          ariaLabel="Disconnect Sphere Wallet"
        >
          Disconnect
        </PrimaryButton>
      </div>
    );
  }

  // Connecting state: show loading
  if (isConnecting) {
    return (
      <PrimaryButton
        size={size}
        disabled={true}
        icon={Loader}
        className={className}
        ariaLabel="Connecting wallet..."
      >
        <span className="flex items-center gap-2">
          Connecting<span className="animate-spin">↻</span>
        </span>
      </PrimaryButton>
    );
  }

  // Error state: show error message
  if (error) {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <PrimaryButton
          size={size}
          onClick={handleClick}
          disabled={false}
          icon={Wallet}
          ariaLabel="Try connecting again"
        >
          Connect Sphere
        </PrimaryButton>
        <p className="text-xs text-red-400 text-center">
          {error}
        </p>
      </div>
    );
  }

  // Disconnected state: show connect button
  return (
    <PrimaryButton
      size={size}
      onClick={handleClick}
      disabled={false}
      icon={Wallet}
      className={className}
      ariaLabel="Connect your Sphere Wallet"
    >
      Connect Sphere
    </PrimaryButton>
  );
};

export default ConnectButton;