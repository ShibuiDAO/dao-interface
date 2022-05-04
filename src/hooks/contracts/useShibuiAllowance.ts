import { useSmartContractReadCall } from '@elementfi/react-query-typechain';
import { shibuiTokenContract } from 'core/contracts';
import { BigNumberish } from 'ethers';
import { QueryObserverResult } from 'react-query';

export default function useShibuiAllowance(
	account: string | null | undefined,
	spender: string | null | undefined
): QueryObserverResult<BigNumberish> {
	return useSmartContractReadCall(shibuiTokenContract, 'allowance', {
		callArgs: [account as string, spender as string],
		enabled: Boolean(account && spender)
	});
}
