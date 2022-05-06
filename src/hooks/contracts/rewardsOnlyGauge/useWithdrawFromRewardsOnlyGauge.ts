import { useSmartContractTransaction } from '@elementfi/react-query-typechain';
import { externalLPPairsRewardsOnlyGaugeContracts } from 'core/contracts';
import { ContractReceipt, Signer } from 'ethers';
import { UseMutationResult } from 'react-query';
import { RewardsOnlyGauge } from 'types/contracts/veShibui';

export function useWithdrawFromRewardsOnlyGauge(
	signer: Signer | undefined,
	gauge: string
): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<RewardsOnlyGauge['withdraw(uint256)']>> {
	return useSmartContractTransaction(externalLPPairsRewardsOnlyGaugeContracts.get(gauge), 'withdraw(uint256)', signer);
}
