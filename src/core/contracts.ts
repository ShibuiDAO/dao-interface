import { Shibui__factory } from 'types/contracts/shibui/index';
import { bobaProvider } from 'hooks/useProviders';

export const shibuiTokenContract = Shibui__factory.connect('0xF08AD7C3f6b1c6843ba027AD54Ed8DDB6D71169b', bobaProvider);
