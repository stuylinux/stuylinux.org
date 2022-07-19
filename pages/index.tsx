import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Head from "next/head";
const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Stuy WLC</title>
				<meta
					name="description"
					content="Stuyvesant Weightlifting club"
				/>
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Stuyvesant Weightlifting Club</h1>
			</main>
		</div>
	);
};

export default Home;
