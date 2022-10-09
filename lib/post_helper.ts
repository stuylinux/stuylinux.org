import fs from "fs";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

export async function getPostSlugs() {
	return await fs.promises.readdir(postsDirectory);
}

export async function getPostBySlug(slug: string) {
	const realSlug = slug.replace(/\.md$/, "");
	const fullPath = join(postsDirectory, `${realSlug}.md`);
	const fileContents = await fs.promises.readFile(fullPath, "utf8");

	return fileContents;
}

export async function getAllPosts() {
	const slugs = await getPostSlugs();
	const promise_array = slugs.map((slug) => getPostBySlug(slug));
	const posts = Promise.all(promise_array);

	return posts;
}
