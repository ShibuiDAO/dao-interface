import { useSmartContractReadCall } from '@elementfi/react-query-typechain';
import { shibuiTokenContract } from 'core/contracts';
import { BigNumberish } from 'ethers';
import { QueryObserverResult } from 'react-query';

export default function useShibuiBalance(account: string | null | undefined): QueryObserverResult<BigNumberish> {
	return useSmartContractReadCall(shibuiTokenContract, 'balanceOf', {
		callArgs: [account as string],
		enabled: Boolean(account)
	});
}
