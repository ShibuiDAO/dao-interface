import { BigNumber } from 'ethers';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { Form, Formik } from 'formik';
import { useDepositIntoRewardsOnlyGauge } from 'hooks/contracts/rewardsOnlyGauge/useDepositIntoRewardsOnlyGauge';
import useSetTokenAllowance from 'hooks/contracts/useSetTokenAllowance';
import useTokenAllowance from 'hooks/contracts/useTokenAllowance';
import useTokenBalance from 'hooks/contracts/useTokenBalance';
import { useWeb3 } from 'hooks/useWeb3';
import React from 'react';
import { Else, If, Then } from 'react-if';

export interface DepositRewardsOnlyGaugeFormProps {
	gaugeAddress: string;
	lpPairName?: string;
	lpPairAddress: string;
}

const DepositRewardsOnlyGaugeForm: React.FC<DepositRewardsOnlyGaugeFormProps> = ({ gaugeAddress, lpPairName, lpPairAddress }) => {
	const [, , wallet] = useWeb3();
	const signer = wallet ? wallet.provider.getSigner() : undefined;
	const account = wallet ? wallet.account : null;

	const { data: lpPairBalance = 0 } = useTokenBalance(account, lpPairAddress);
	const { data: lpPairAllowance = 0 } = useTokenAllowance(account, gaugeAddress, lpPairAddress);
	const { mutate: approveLpPair, isLoading: approveLpPairLoading } = useSetTokenAllowance(signer, lpPairAddress);
	const { mutate: deposit } = useDepositIntoRewardsOnlyGauge(signer, gaugeAddress);

	return (
		<>
			{/* eslint-disable-next-line no-alert */}
			<Formik
				initialValues={{ amount: 0 }}
				onSubmit={(values) => {
					return deposit([BigNumber.from(parseEther(values.amount.toString())), { gasLimit: 700_000 }]);
				}}
			>
				{(props) => (
					<Form>
						<>
							<div>
								<label htmlFor="amount" className="text-xl font-bold">
									Input the amount of {lpPairName ? lpPairName : 'tokens'} you want to deposit
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
									<button
										type="button"
										className="border-r border-black pr-2 text-xs font-bold"
										onClick={() => props.setFieldValue('amount', Number(formatEther(lpPairBalance)))}
									>
										Max
									</button>
									<span className="pl-2">
										<span className="relative top-[0.05rem] text-xs font-bold">LP-T</span>
									</span>
								</div>
							</div>
							<div className="mt-12">
								<If
									condition={BigNumber.from(lpPairAllowance).gte(BigNumber.from(parseEther((props.values.amount || 0).toString())))}
								>
									<Then>
										<button
											type="submit"
											className="btn border border-white bg-lights-300 font-shibui text-sm lowercase text-white hover:bg-lights-400 disabled:text-darks-200"
										>
											confirm
										</button>
									</Then>
									<Else>
										<button
											type="button"
											onClick={() => {
												return approveLpPair([
													gaugeAddress,
													BigNumber.from(parseEther(props.values.amount.toString())),
													{ gasLimit: 400_000 }
												]);
											}}
											disabled={approveLpPairLoading}
											className="btn border border-white bg-lights-300 font-shibui text-sm lowercase text-white hover:bg-lights-400 disabled:text-darks-200"
										>
											approve
										</button>
									</Else>
								</If>
							</div>
						</>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default DepositRewardsOnlyGaugeForm;
