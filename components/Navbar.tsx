import Link from "next/link";
import styles from "../styles/Navbar.module.css";

const Footer = () => {
	return (
		<nav id={styles.nav}>
			<span className={styles.nav_link}>
				<Link href="/posts">/posts</Link>
			</span>
			<span className={styles.nav_link}>
				<Link href="/">/</Link>
			</span>
			<span className={styles.nav_link}>
				<Link href="/about">/about</Link>
			</span>
		</nav>
	);
};

export default Footer;
