import fs from "fs";
import { join } from "path";
import markdownToHtml from "./markdownToHtml";

const postsDirectory = join(process.cwd(), "_posts");
export interface ReturnedPost {
	post_html: string;
	slug: string;
	title: string;
	date_published: string;
	authors: string[];
}

export async function getPostSlugs() {
	const fileNames = await fs.promises.readdir(postsDirectory);
	const slugs = fileNames.map((fname) => fname.replace(/\.md$/, ""));
	return slugs;
}

async function getPostMarkdownBySlug(slug: string) {
	const fullPath = join(postsDirectory, `${slug.replace(/\.md$/, "")}.md`);
	const fileContents = await fs.promises.readFile(fullPath, "utf8");

	return fileContents;
}

function parseDate(str: any) {
	if (!/^(\d){8}$/.test(str)) {
		throw new Error("invalid date of " + str);
	}
	var y = str.substr(0, 4),
		m = str.substr(4, 2) - 1,
		d = str.substr(6, 2);
	return new Date(y, m, d);
}

function convert_date_to_number(d: string) {
	const split_date = d.split("_"); // Split the YYYY_MM_DD date by underscore
	return (
		Number(split_date[0]) * 10000 +
		Number(split_date[1]) * 100 +
		Number(split_date[2])
	); // convert each value of the date to a number (so that 01 is still evaluated to 1) and create corresponding YYYYMMDD number
}

export async function getPostBySlug(slug: string) {
	const response = await getPostMarkdownBySlug(slug);

	const response_lines = response.split("\n");
	const title = response_lines[0].split("# ")[1];
	const raw_date_published =
		response_lines
			.find((line) => line.startsWith("### Date Published:"))
			?.split("### Date Published: ")[1]
			.split(" ")[0] || "1970_1_1";

	const date = parseDate(raw_date_published.replace(/_/g, ""));
	const formattedDate = new Intl.DateTimeFormat("en-US").format(date);
	const author_promises = response_lines
		.filter((line) => line.startsWith("### Written by:"))
		.map((line): Promise<string> => {
			return markdownToHtml(line.split("### Written by:")[1].trim());
		});

	let authors = await Promise.all(author_promises);
	if (authors.length == 0) {
		authors = ["Stuy Linux"];
	}

	const post_html = await markdownToHtml(response);
	return {
		post_html: post_html,
		slug: slug,
		title: title,
		date_published: formattedDate,
		authors: authors,
	} as ReturnedPost;
}

export async function getAllPosts() {
	const slugs = await getPostSlugs();
	// Create an array of promises that return the fetched markdown
	const promise_array = slugs.map((slug) => getPostBySlug(slug));
	let posts = await Promise.all(promise_array);

	posts = posts.sort(
		(a, b) =>
			convert_date_to_number(b.date_published) -
			convert_date_to_number(a.date_published)
	); // Converting the YYYY_MM_DD date to a number makes sorting very simple

	return posts;
}
