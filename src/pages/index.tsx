import { faDiscord, faGithub, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { DISCORD_LINK, GITHUB_LINK, TELEGRAM_LINK, TWITTER_LINK } from 'constants/links';
import { generateSitemap } from 'core/sitemap';
import { GetStaticProps, NextPage } from 'next';
import path from 'path';
import React from 'react';

const IndexPage: NextPage = () => {
	return (
		<>
			<Parallax pages={1}>
				<ParallaxLayer
					offset={0}
					speed={1}
					factor={1}
					style={{
						backgroundImage: 'url(/assets/misc/background_scenery.svg)',
						backgroundSize: 'auto'
					}}
				>
					<div className="container">
						<div className="hero min-h-screen">
							<div className="hero-content flex-col lg:flex-col-reverse">
								<div className="text-left text-black">
									<h1 className="index-underline relative z-[1] mb-5 inline-block text-5xl font-bold">
										The DAO behind the SHIBUI Marketplace
									</h1>
									<p className="index-underline relative z-[1] mb-5 inline-block">
										ShibuiDAO is the DAO controlling the BOBA-native NFT marketplace - Shibui.
									</p>
									<br />
									<div className="index-underline relative z-[1] mb-5 inline-block">
										<a href={TWITTER_LINK} target="_blank" rel="noopener noreferrer" className="px-1">
											{/* @ts-expect-error This is quite odd */}
											<FontAwesomeIcon icon={faTwitter} />
										</a>
										<a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer" className="px-1">
											{/* @ts-expect-error This is quite odd */}
											<FontAwesomeIcon icon={faGithub} />
										</a>
										<a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" className="px-1">
											{/* @ts-expect-error This is quite odd */}
											<FontAwesomeIcon icon={faDiscord} />
										</a>
										<a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="px-1">
											{/* @ts-expect-error This is quite odd */}
											<FontAwesomeIcon icon={faTelegram} />
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</ParallaxLayer>
			</Parallax>
		</>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const directory = path.join(process.cwd(), 'src');

	await generateSitemap(directory);

	return { props: {} };
};

export default IndexPage;
