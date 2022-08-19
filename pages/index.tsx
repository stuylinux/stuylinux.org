import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Head from "next/head";

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Stuy Linux</title>
				<meta name="description" content="Stuyvesant Linux club" />
			</Head>

			<main id={styles.main}>
				<h1 className={styles.title}>Stuyvesant Linux Club</h1>
				<div id={styles.social_media_links}>
					<p>
						Join us on&nbsp;
						<a href="https://stuyactivities.org/stuylinux">
							StuyActivities
						</a>
					</p>
				</div>
			</main>
		</div>
	);
};

export default Home;
