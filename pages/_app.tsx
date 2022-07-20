import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import Footer from "../components/Footer";
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />;
			</Head>
			<div id="page">
				<Component {...pageProps} />
			</div>
			<section id="footer_container">
				<Footer />
			</section>
		</>
	);
}

export default MyApp;
