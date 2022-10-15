import type { GetStaticProps, GetStaticPropsContext } from "next";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import Link from "next/link";
import { getAllPosts, ReturnedPost } from "../lib/post_helper";

interface Props {
	posts: [ReturnedPost];
}
const Home = (props: Props) => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Stuy Linux</title>
				<meta name="description" content="Stuyvesant Linux club" />
			</Head>

			<main id={styles.main}>
				<h1 className={styles.title}>Stuyvesant Linux Club</h1>
				<div id={styles.content}>
					<p>
						Stuy Linux is a new initiative to promote the use of
						Free/Libre Open Source Software (FLOSS) programs and the
						GNU/Linux projects.
					</p>
					<p>
						This site is still under construction, so check back
						soon!
					</p>
				</div>
				<div id={styles.social_media_links}>
					<p>
						Join us on&nbsp;
						<a href="https://stuyactivities.org/stuylinux">
							StuyActivities
						</a>
					</p>
					<p>
						Chat on&nbsp;
						<a href="https://discord.gg/8pkfP7mU78">Discord</a>
					</p>
					<p>
						IRC bridge&nbsp;
						<a href="ircs://irc.stuylinux.org:6697">
							irc.stuylinux.org:6697
						</a>
					</p>
					<p>
						The posts page (or blog?) is being worked on right now
						and is almost finalized. Check out&nbsp;
						<Link href="/posts/welcome">the welcome post</Link>!
					</p>
				</div>
				<div id={styles.latest_blog_posts}>
					<h2>Our latest posts: </h2>
					{props.posts.map((v) => (
						<div key={v.slug} className={styles.new_blog_post}>
							<h2>{v.title}</h2>
							<p>{v.date_published}</p>
							<span className={styles.post_link}>
								<Link href={"/posts/" + v.slug}>
									{"/posts/" + v.slug}
								</Link>
							</span>
						</div>
					))}
				</div>
			</main>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) => {
	const posts = ((await getAllPosts()) as ReturnedPost[]).slice(0, 5);
	// Only return the last 5 posts
	return {
		props: { posts: posts },
	};
};
export default Home;
