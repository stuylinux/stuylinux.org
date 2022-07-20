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

			<main id={styles.main}>
				<h1 className={styles.title}>Stuyvesant Weightlifting Club</h1>
				<div id={styles.social_media_links}>
					<p>
						Join us on&nbsp;
						<a href="https://stuyactivities.org/stuyweightlifting">
							StuyActivities
						</a>
					</p>
					<p>
						<a href="https://docs.google.com/document/d/10uNOTJSbDxd0RMBXnJfBv84a4d5IFZwnDJd-WdruwwQ/edit?usp=sharing">
							Exercises + Workout Split
						</a>
					</p>
					<p>
						Email us at&nbsp;
						<a href="mailto:stuywlc@gmail.com">stuywlc@gmail.com</a>
					</p>
					<p>
						Follow our instagram, @
						<a href="https://www.instagram.com/stuyweightlifting/">
							stuyweightlifting
						</a>
					</p>
				</div>
			</main>
		</div>
	);
};

export default Home;
