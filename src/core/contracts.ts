import { Shibui__factory } from 'types/contracts/shibui/index';
import { bobaProvider } from 'hooks/useProviders';
import { VotingEscrow__factory } from 'types/contracts/veShibui';

export const shibuiTokenContract = Shibui__factory.connect('0xF08AD7C3f6b1c6843ba027AD54Ed8DDB6D71169b', bobaProvider);

export const votingEscrowContract = VotingEscrow__factory.connect('0xabAF0A59Bd6E937F852aC38264fda35EC239De82', bobaProvider);
