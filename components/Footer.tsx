import styles from "../styles/Footer.module.css";
import Image from "next/image";
import github_logo from "../public/img/github.png";
const Footer = () => {
	return (
		<div id={styles.footer}>
			<p>
				Made with &lt;3 by&nbsp;
				<a href="https://github.com/leomet07">Lenny</a>
			</p>

			<a href="https://github.com/leomet07/stuywlc">
				<Image
					id={styles.github_logo}
					alt="Github Logo"
					src={github_logo}
					height={28}
					width={28}
				/>
			</a>
		</div>
	);
};

export default Footer;
