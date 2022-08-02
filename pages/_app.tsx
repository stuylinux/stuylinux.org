import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import Footer from "../components/Footer";
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<script
					async
					defer
					data-website-id="532b1bdf-a105-4c35-a9aa-c5c57ab6b3bf"
					src="https://umami-fork-alpha.vercel.app/umami.js"
				></script>
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
