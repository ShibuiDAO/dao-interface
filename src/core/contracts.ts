import { bobaProvider } from 'hooks/useProviders';
import { Shibui__factory } from 'types/contracts/shibui/index';
import { RewardsOnlyGauge, RewardsOnlyGauge__factory, VotingEscrow__factory } from 'types/contracts/veShibui';

export const shibuiTokenContract = Shibui__factory.connect('0xF08AD7C3f6b1c6843ba027AD54Ed8DDB6D71169b', bobaProvider);

export const votingEscrowContract = VotingEscrow__factory.connect('0xabAF0A59Bd6E937F852aC38264fda35EC239De82', bobaProvider);

export const externalLPPairsRewardsOnlyGauges: Map<string, string> = new Map([
	['SHIBUI-USDT<>WAGMIv3', '0x6b8f4Fa6E44e923f5A995A87e4d79B3Bb9f8aaa3']
]);
export const externalLPPairsRewardsOnlyGaugeContracts: Map<string, RewardsOnlyGauge> = new Map(
	[...externalLPPairsRewardsOnlyGauges.entries()].map(([_, pair]) => [pair, RewardsOnlyGauge__factory.connect(pair, bobaProvider)])
);
