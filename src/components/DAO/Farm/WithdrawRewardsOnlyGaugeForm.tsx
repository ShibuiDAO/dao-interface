import { BigNumber } from 'ethers';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { Form, Formik } from 'formik';
import { useWithdrawFromRewardsOnlyGauge } from 'hooks/contracts/rewardsOnlyGauge/useWithdrawFromRewardsOnlyGauge';
import useTokenBalance from 'hooks/contracts/useTokenBalance';
import { useWeb3 } from 'hooks/useWeb3';
import React from 'react';

export interface WithdrawRewardsOnlyGaugeFormProps {
	gaugeAddress: string;
}

const WithdrawRewardsOnlyGaugeForm: React.FC<WithdrawRewardsOnlyGaugeFormProps> = ({ gaugeAddress }) => {
	const [, , wallet] = useWeb3();
	const signer = wallet ? wallet.provider.getSigner() : undefined;
	const account = wallet ? wallet.account : null;

	const { data: gaugeBalance = 0 } = useTokenBalance(account, gaugeAddress);
	const { mutate: withdraw } = useWithdrawFromRewardsOnlyGauge(signer, gaugeAddress);

	return (
		<>
			{/* eslint-disable-next-line no-alert */}
			<Formik
				initialValues={{ amount: 0 }}
				onSubmit={(values) => {
					return withdraw([BigNumber.from(parseEther(values.amount.toString())), { gasLimit: 600_000 }]);
				}}
			>
				{(props) => (
					<Form>
						<>
							<div>
								<label htmlFor="amount" className="text-xl font-bold">
									Input the amount you want to withdraw from the gauge
								</label>
								<br />
								<div className="w-fit mt-4 inline-block rounded-lg border border-black px-6 py-4 font-inter">
									<input
										name="amount"
										onChange={props.handleChange}
										value={props.values.amount}
										type="number"
										className="bg-transparent"
									/>
									{/* eslint-disable-next-line no-alert */}
									<button
										type="button"
										className="border-r border-black pr-2 text-xs font-bold"
										onClick={() => props.setFieldValue('amount', Number(formatEther(gaugeBalance)))}
									>
										Max
									</button>
									<span className="pl-2">
										<span className="relative top-[0.05rem] text-xs font-bold">G-T</span>
									</span>
								</div>
							</div>
							<div className="mt-12">
								<button
									type="submit"
									className="btn border border-white bg-lights-300 font-shibui text-sm lowercase text-white hover:bg-lights-400 disabled:text-darks-200"
								>
									confirm
								</button>
							</div>
						</>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default WithdrawRewardsOnlyGaugeForm;
