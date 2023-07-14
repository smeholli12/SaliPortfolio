import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar/Navbar";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import dynamic from "next/dynamic";
import HomePage from "../components/HomePage/HomePage";
import Experience from "../components/Experience/Experience";
import Contact from "../components/contact/Contact";
import Footer from "../components/Footer/Footer";
import BlogSection from "../components/BlogSection/BlogSection";

export default function Home({ BlogsContent }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <HomePage />

      <BlogSection blogs={BlogsContent} />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const BlogFiles = fs.readdirSync(path.join("content/Posts"));

  const BlogsContent = BlogFiles.map((BlogFilename) => {
    const markDownBlog = fs.readFileSync(
      path.join("content/Posts", BlogFilename),
      "utf-8"
    );
    const { data: frontmatter, content: markdownContent } =
      matter(markDownBlog);

    return {
      frontmatter,
      markdownContent,
    };
  }).slice(0, 3);

  return {
    props: {
      BlogsContent,
    },
  };
}
