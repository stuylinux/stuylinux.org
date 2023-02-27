import styles from "../styles/Footer.module.css";
import Image from "next/image";
import github_logo from "../public/img/github.png";
import instagram_logo from "../public/img/instagram.png";

const Footer = () => {
	return (
		<div id={styles.footer}>
			<p>
				Made with &lt;3 by&nbsp;
				<a href="https://github.com/stuylinux">Stuy Linux</a>
			</p>

			<a href="https://github.com/stuylinux/site">
				<Image
					alt="Github Logo"
					src={github_logo}
					height={28}
					width={28}
				/>
			</a>
			<a href="https://www.instagram.com/stuylinux/">
				<Image
					alt="Instagram Logo"
					src={instagram_logo}
					height={28}
					width={28}
				/>
			</a>
		</div>
	);
};

export default Footer;
