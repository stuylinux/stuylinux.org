import Link from "next/link";
import { ReturnedPost } from "../lib/post_helper";
import styles from "../styles/PostBubble.module.css";

const PostBubble = (props: { post: ReturnedPost }) => {
	const post = props.post;
	return (
		<div id={styles.post}>
			<h2>{post.title}</h2>
			<p>{post.date_published}</p>
			<span className={styles.post_link}>
				<Link href={"/posts/" + post.slug}>
					{"/posts/" + post.slug}
				</Link>
			</span>
		</div>
	);
};

export default PostBubble;
