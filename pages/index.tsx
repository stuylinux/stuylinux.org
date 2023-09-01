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
						<a href="https://stuyactivities.org/linux">
							StuyActivities
						</a>
					</p>
					<p>
						Chat on the&nbsp;
						<a href="https://irc.stuylinux.org">
							Internet
						</a> (irc.stuylinux.org:6697)
					</p>
					<p>
						Join our&nbsp;
						<a href="https://discord.gg/8pkfP7mU78">Discord</a>
					</p>
					<p>
						The posts page (or blog?) is functioning! Check out our <Link href="/posts">many blog posts</Link>!
					</p>
				</div>
				<section id={styles.latest_blog_posts}>
					<h2>Our latest 3 posts: </h2>
					<div>
						{props.posts.map((v) => (
							<div key={v.slug} className={styles.new_blog_post}>
								<p className={styles.post_link}>
									<Link href={"/posts/" + v.slug}>
										{v.title}
									</Link>
								</p>
							</div>
						))}
					</div>
					<h2 id={styles.see_more_link}>
						<Link href="/posts">See more posts</Link>
					</h2>
				</section>
			</main>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) => {
	const posts = ((await getAllPosts()) as ReturnedPost[]).slice(0, 3);
	// Only return the last 3 posts
	return {
		props: { posts: posts },
	};
};
export default Home;
