import "../styles/globals.css";
import Head from "next/head";
import Script from "next/script";
import type { AppProps } from "next/app";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.png" />
			</Head>
			<Script
				async
				defer
				data-website-id="a437f55a-b94a-4bce-9231-eb4ee3b7d114"
				src="https://umami-fork-alpha.vercel.app/umami.js"
			></Script>
			<div id="navbar_container">
				<Navbar />
			</div>
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
