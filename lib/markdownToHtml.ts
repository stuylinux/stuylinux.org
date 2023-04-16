import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import {remarkHeadingId} from 'remark-custom-heading-id';

export default async function markdownToHtml(markdown: string) {
	const result = await remark().use(remarkHeadingId).use(remarkGfm).use(html).process(markdown);
	return result.toString();
}
