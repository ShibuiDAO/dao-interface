import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from '@ethersproject/providers';
import { config } from '@fortawesome/fontawesome-svg-core';
import { Web3ReactProvider } from '@web3-react/core';
import Footer from 'components/Footer/Footer';
import Navbar from 'components/Navbar/Navbar';
import PinnedComponents from 'components/PinnedComponents';
import DefaultSeoProps from '../DefaultSeoProps';
import type { NextPage } from 'next';
import PlausibleProvider from 'next-plausible';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import useInitWeb3Onboard from 'hooks/useInitWeb3Onboard';
import 'styles/_App.css';

config.autoAddCss = false;

const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc) => {
	return new Web3Provider(provider);
};

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
	useInitWeb3Onboard();

	return (
		<>
			<React.StrictMode>
				<PlausibleProvider domain="shibuidao.com">
					<Web3ReactProvider getLibrary={getLibrary}>
						<Head>
							<meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
							<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
							<meta httpEquiv="Expires" content="1y" />
							<meta httpEquiv="Pragma" content="1y" />
							<meta httpEquiv="Cache-Control" content="1y" />

							<meta httpEquiv="Page-Enter" content="RevealTrans(Duration=2.0,Transition=2)" />
							<meta httpEquiv="Page-Exit" content="RevealTrans(Duration=3.0,Transition=12)" />

							<link rel="shortcut icon" href="/favicon.ico" />
						</Head>
						<DefaultSeo {...DefaultSeoProps} />

						<>
							<PinnedComponents>
								<div className="min-h-screen">
									<Navbar />

									<main className="min-h-screen dark:bg-darks-400 dark:text-white">
										<Component {...pageProps} />
									</main>

									<footer>
										<Footer />
									</footer>
								</div>
							</PinnedComponents>
						</>
					</Web3ReactProvider>
				</PlausibleProvider>
			</React.StrictMode>
		</>
	);
};

export default App;
