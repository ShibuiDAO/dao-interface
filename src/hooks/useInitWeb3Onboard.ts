import { onboard } from 'core/wallet/onboard';
import { useEffect, useState } from 'react';

export default function useInitWeb3Onboard() {
	const [, setWeb3Onboard] = useState<typeof onboard | null>(null);

	useEffect(() => {
		setWeb3Onboard(onboard);
	}, []);
}
