import React from 'react';
import { Form, Formik } from 'formik';
import DatePickerFormik from 'components/forms/fields/DatePickerFormik';

const WEEK_MS = 604800000;

const LockForm: React.FC = () => {
	return (
		<>
			{/* eslint-disable-next-line no-alert */}
			<Formik initialValues={{ amount: 0, duration: new Date() }} onSubmit={(values) => alert(values)}>
				{(props) => (
					<Form>
						<>
							<div>
								<label htmlFor="amount" className="text-xl font-bold">
									Input the amount of Shibui you want to lock
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
									<button type="button" className="border-r border-black pr-2 text-xs font-bold" onClick={() => alert('hi')}>
										Max
									</button>
									<span className="pl-2">
										<span className="text-xs" role="img" aria-label="$SHIBUI">
											🌊{' '}
										</span>
										<span className="relative top-[0.05rem] text-xs font-bold">SHIBUI</span>
									</span>
								</div>
							</div>
							<div className="mt-12">
								<label htmlFor="duration" className="text-xl font-bold">
									Select the lock duration (cannot be unlocked)
								</label>
								<div className="inline-block pl-4">
									<DatePickerFormik
										name="duration"
										onChange={props.handleChange}
										value={props.values.duration}
										className="inline-block rounded-lg border border-black bg-transparent text-center"
										dateFormat="dd/MM/yyyy"
									/>
								</div>
								<div>
									<button type="button" onClick={() => props.setFieldValue('duration', new Date(new Date().getTime() + WEEK_MS))}>
										1 week
									</button>
								</div>
							</div>
							<div className="mt-12">
								<button
									type="submit"
									className="btn border border-white bg-lights-300 font-shibui text-sm lowercase text-white hover:bg-lights-400"
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

export default LockForm;
