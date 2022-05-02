import gnosisModule from '@web3-onboard/gnosis';
import injectedModule from '@web3-onboard/injected-wallets';
import { init } from '@web3-onboard/react';
import walletConnectModule from '@web3-onboard/walletconnect';
import { HEX_CHAIN_IDS, RPC_URLS, SupportedChainId } from 'constants/chains';

const injected = injectedModule();
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
	}
});
