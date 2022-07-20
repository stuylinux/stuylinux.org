import Link from "next/link";
import styles from "../styles/404.module.css";
export default function Custom404() {
	return (
		<main id={styles.main}>
			<h1>404 - Page Not Found</h1>
			<p className={styles.link}>
				<Link href="/">Head home :)</Link>
			</p>
		</main>
	);
}
