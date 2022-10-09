import Head from "next/head";
import styles from "../../styles/Slug.module.css";
import { getPostBySlug, getPostSlugs } from "../../lib/post_helper";
import markdownToHtml from "../../lib/markdownToHtml";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface Props {
	post_html: string;
	slug: string;
	title: string;
}

interface IParams extends ParsedUrlQuery {
	slug: string;
}

export default function ArticleComponent(props: Props) {
	return (
		<div>
			<Head>
				<title>{props.title}</title>
				<meta name="description" content={props.title} />
			</Head>

			<main id={styles.main}>
				<div
					dangerouslySetInnerHTML={{
						__html: props.post_html,
					}}
				/>
			</main>
		</div>
	);
}
export const getStaticProps: GetStaticProps = async (context) => {
	const { slug: post_slug } = context.params as IParams;

	const response = await getPostBySlug(post_slug);

	const title = response.split("\n")[0].split("# ")[1];
	const post_html = await markdownToHtml(response);
	return {
		props: {
			post_html: post_html,
			slug: post_slug,
			title: title,
		},
	};
};
export const getStaticPaths: GetStaticPaths = async () => {
	const raw_files = await getPostSlugs();

	const paths = raw_files.map((v) => {
		return {
			params: {
				slug: v.split(".")[0],
			},
		};
	});
	return {
		paths: paths,
		fallback: false,
	};
};
