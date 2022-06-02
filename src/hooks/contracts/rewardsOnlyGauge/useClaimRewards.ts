import { useSmartContractTransaction } from '@elementfi/react-query-typechain';
import { externalLPPairsRewardsOnlyGaugeContracts } from 'core/contracts';
import { ContractReceipt, Signer } from 'ethers';
import { UseMutationResult } from 'react-query';
import { RewardsOnlyGauge } from 'types/contracts/veShibui';

export function useClaimRewards(
	signer: Signer | undefined,
	gauge: string
): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<RewardsOnlyGauge['claim_rewards(address,address)']>> {
	return useSmartContractTransaction(externalLPPairsRewardsOnlyGaugeContracts.get(gauge), 'claim_rewards(address,address)', signer);
}
