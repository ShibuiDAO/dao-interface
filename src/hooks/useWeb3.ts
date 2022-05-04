import { Web3Provider } from '@ethersproject/providers';
import type { WalletState } from '@web3-onboard/core';
import { useConnectWallet } from '@web3-onboard/react';

export function useWeb3(): [connecting: boolean, walletRaw: WalletState | null, wallet: { account: string; provider: Web3Provider } | null] {
	const [{ wallet, connecting }] = useConnectWallet();

	return [
		connecting,
		wallet,
		wallet && wallet.accounts.length !== 0 && wallet.provider
			? {
					account: wallet.accounts[0].address,
					provider: new Web3Provider(wallet.provider, 'any')
			  }
			: null
	];
}
