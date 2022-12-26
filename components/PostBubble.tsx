import Link from "next/link";
import { ReturnedPost } from "../lib/post_helper";
import styles from "../styles/PostBubble.module.css";

const PostBubble = (props: { post: ReturnedPost }) => {
	const post = props.post;
	let authors = post.authors.map((author, index) => {
		return (
			<div
				key={index}
				dangerouslySetInnerHTML={{
					__html: author,
				}}
			/>
		);
	});

	return (
		<div id={styles.post}>
			<p id={styles.post_title} className={styles.post_link}>
				<Link href={"/posts/" + post.slug}>{post.title}</Link>
			</p>
			<p>{post.date_published}</p>

			<div>{authors}</div>
		</div>
	);
};

export default PostBubble;
