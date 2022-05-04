import { useSmartContractReadCall } from '@elementfi/react-query-typechain';
import { votingEscrowContract } from 'core/contracts';
import { BigNumberish } from 'ethers';
import { QueryObserverResult } from 'react-query';

export default function useVeShibuiBalance(account: string | null | undefined): QueryObserverResult<BigNumberish> {
	return useSmartContractReadCall(votingEscrowContract, 'balanceOf(address)', {
		callArgs: [account as string],
		enabled: Boolean(account)
	});
}
