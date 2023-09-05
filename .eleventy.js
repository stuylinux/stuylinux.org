const CleanCSS = require("clean-css");
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItAttrs = require('markdown-it-attrs');

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("**/*.jpg");
	eleventyConfig.addPassthroughCopy("**/*.png");
	eleventyConfig.addPassthroughCopy("**/*.svg");

	eleventyConfig.addFilter("cssmin", function (code) {
		return new CleanCSS({}).minify(code).styles;
	});

	// Filters
	eleventyConfig.addFilter("readableDate", (dateObj) => {
		dateObj ??= new Date(); // if null or undefined, then create new obj with current time

		const dateOptions = {
			year: "numeric",
			month: "long",
			day: "numeric",
		};

		// TODO: USE PRETTIER DATE FORMAT
		return dateObj.toLocaleDateString("en-us", {
			timeZone: "utc",
			...dateOptions,
		}); // Use utc tz so that no tz conversion occurs
	});

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		dateObj ??= new Date(); // if null or undefined, then create new obj with current time

		// Use utc tz so that no tz conversion occurs
		// Convert to YYYY/MM/DD, then replace forward slashes with dashes to return YYYY-MM-DD
		return dateObj
			.toLocaleDateString("en-ZA", { timezone: "utc" })
			.replace(/\//g, "-");
	});

	eleventyConfig.addPlugin(EleventyRenderPlugin);

	const markdownItOptions = {
		html: true // you can include HTML tags
	}
	
	const markdownItAnchorOptions = {
		level: 2 // anchors will only be applied to h2 level headers and below but not h1
	}
	
	eleventyConfig.setLibrary("md", markdownIt(markdownItOptions).use(markdownItAnchor, markdownItAnchorOptions).use(markdownItAttrs))

	return {
		dir: {
			input: "content", // default: "."
			includes: "../_includes", // default: "_includes"
			data: "../_data", // default: "_data"
			output: "_site",
		},
	};
};
