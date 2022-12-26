import type { GetStaticProps, GetStaticPropsContext } from "next";
import styles from "../styles/PostsIndex.module.css";
import Head from "next/head";
import Link from "next/link";
import { getAllPosts, ReturnedPost } from "../lib/post_helper";

interface Props {
	posts: [ReturnedPost];
}
const Posts = (props: Props) => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Stuy Linux Posts</title>
				<meta name="description" content="Stuy Linux Posts" />
			</Head>

			<main id={styles.main}>
				<h1 className={styles.title}>Stuy Linux Posts</h1>

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
export default Posts;
