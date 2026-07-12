/**
 * Sphere Wallet Utilities
 * Helper functions for Sphere SDK integration
 */

export const SPHERE_WALLET_URL = 'https://sphere.unicity.network';
export const SPHERE_TESTNET = 'testnet';
export const SPHERE_MAINNET = 'mainnet';

/**
 * Format nametag for display (add @ if needed)
 */
export const formatNametag = (nametag: string | null | undefined): string => {
  if (!nametag) return '';
  return nametag.startsWith('@') ? nametag : `@${nametag}`;
};

/**
 * Check if popup is blocked
 */
export const isPopupBlocked = (popup: Window | null): boolean => {
  return !popup || popup.closed;
};

/**
 * Get user-friendly error messages
 */
export const getUserFriendlyError = (error: unknown): string => {
  if (error instanceof Error) {
    if (error.message.includes('popup')) {
      return 'Please enable popups for this site to connect your wallet.';
    }
    if (error.message.includes('not found')) {
      return 'Sphere Wallet not accessible. Please try again.';
    }
    return error.message;
  }
  return 'An unknown error occurred. Please try again.';
};

/**
 * Truncate address/nametag for display
 */
export const truncateAddress = (address: string | null | undefined, chars = 6): string => {
  if (!address) return '';
  if (address.length <= chars * 2) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};

/**
 * Check if wallet is installed/available
 * For Sphere, we always assume it's available via web URL
 */
export const isSphereAvailable = (): boolean => {
  return true; // Sphere web wallet is always accessible
};

/**
 * Validate nametag format
 */
export const isValidNametag = (nametag: string): boolean => {
  // Nametags are typically alphanumeric with optional hyphens
  const nametagRegex = /^[a-z0-9-]+$/i;
  return nametag.length > 0 && nametag.length <= 50 && nametagRegex.test(nametag);
};

/**
 * Storage helpers for wallet state persistence
 */
export const StorageKeys = {
  WALLET_CONNECTED: 'sphere_arcade_wallet_connected',
  USER_NAMETAG: 'sphere_arcade_user_nametag',
  USER_ADDRESS: 'sphere_arcade_user_address',
};

export const saveWalletState = (nametag: string, address?: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(StorageKeys.WALLET_CONNECTED, 'true');
    localStorage.setItem(StorageKeys.USER_NAMETAG, nametag);
    if (address) {
      localStorage.setItem(StorageKeys.USER_ADDRESS, address);
    }
  }
};

export const getWalletState = (): { nametag: string; address?: string } | null => {
  if (typeof window !== 'undefined') {
    const isConnected = localStorage.getItem(StorageKeys.WALLET_CONNECTED);
    if (isConnected) {
      const nametag = localStorage.getItem(StorageKeys.USER_NAMETAG);
      const address = localStorage.getItem(StorageKeys.USER_ADDRESS);
      if (nametag) {
        return { nametag, address: address || undefined };
      }
    }
  }
  return null;
};

export const clearWalletState = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(StorageKeys.WALLET_CONNECTED);
    localStorage.removeItem(StorageKeys.USER_NAMETAG);
    localStorage.removeItem(StorageKeys.USER_ADDRESS);
  }
};