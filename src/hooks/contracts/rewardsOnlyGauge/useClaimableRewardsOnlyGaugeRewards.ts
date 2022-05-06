import { useSmartContractReadCall } from '@elementfi/react-query-typechain';
import { externalLPPairsRewardsOnlyGaugeContracts } from 'core/contracts';
import { BigNumberish } from 'ethers';
import { QueryObserverResult } from 'react-query';

export default function useClaimableRewardsOnlyGaugeRewards(
	account: string | null | undefined,
	reward: string | null | undefined,
	gauge: string
): QueryObserverResult<BigNumberish> {
	const gaugeContract = externalLPPairsRewardsOnlyGaugeContracts.get(gauge);

	return useSmartContractReadCall(gaugeContract, 'claimable_reward_write', {
		callArgs: [account as string, reward as string],
		enabled: Boolean(account && reward && gaugeContract)
	});
}
