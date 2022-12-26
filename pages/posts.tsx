import type { GetStaticProps, GetStaticPropsContext } from "next";
import styles from "../styles/PostsIndex.module.css";
import Head from "next/head";
import { getAllPosts, ReturnedPost } from "../lib/post_helper";
import PostBubble from "../components/PostBubble";

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

				<section id={styles.posts_display}>
					{props.posts.map((v) => (
						<div key={v.slug} className={styles.blog_post_bubble}>
							<PostBubble post={v} />
						</div>
					))}
				</section>
			</main>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) => {
	const posts = (await getAllPosts()) as ReturnedPost[];
	// Only return the last 5 posts
	return {
		props: { posts: posts },
	};
};
export default Posts;
