import type { EIP1193Provider } from '@web3-onboard/common';
import gnosisModule from '@web3-onboard/gnosis';
import injectedModule from '@web3-onboard/injected-wallets';
import { CustomWindow, InjectedNameSpace, InjectedWalletModule } from '@web3-onboard/injected-wallets/dist/types';
import { init } from '@web3-onboard/react';
import walletConnectModule from '@web3-onboard/walletconnect';
import { HEX_CHAIN_IDS, RPC_URLS, SupportedChainId } from 'constants/chains';

declare const window: CustomWindow;

function getInjectedInterface(identity: string): () => Promise<{ provider: EIP1193Provider }> {
	// eslint-disable-next-line @typescript-eslint/require-await
	return async () => ({
		provider: (window.ethereum.providers && Array.isArray(window.ethereum.providers)
			? window.ethereum.providers.find((provider) => Boolean(provider[identity]))
			: window.ethereum) as EIP1193Provider
	});
}

const onto: InjectedWalletModule = {
	label: 'Onto',
	injectedNamespace: InjectedNameSpace.Ethereum,
	checkProviderIdentity: ({ provider }) => Boolean(provider) && Boolean(provider.isONTO),
	getIcon: async () => (await import('./icons/onto')).default,
	getInterface: getInjectedInterface('isONTO'),
	platforms: ['mobile']
};

const injected = injectedModule({
	custom: [onto]
});
const gnosis = gnosisModule();
const walletConnect = walletConnectModule({
	bridge: 'https://bridge.walletconnect.org',
	qrcodeModalOptions: {
		mobileLinks: ['rainbow', 'metamask', 'safepal']
	}
});

export const onboard = init({
	wallets: [injected, gnosis, walletConnect],
	chains: [
		{
			id: HEX_CHAIN_IDS[SupportedChainId.BOBA],
			token: 'ETH',
			label: 'Boba Network',
			rpcUrl: RPC_URLS[SupportedChainId.BOBA]
		}
	],
	appMetadata: {
		name: 'Shibui',
		icon: '/logo.svg',
		logo: '/wide.svg',
		description: 'Hello'
	},
	accountCenter: {
		desktop: {
			enabled: false
		}
	}
});
