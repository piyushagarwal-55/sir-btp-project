import { format } from "date-fns";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Calendar, User, Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogPost {
  title: string;
  date: string;
  author: string;
  summary: string;
  slug: string;
  description?: string;
  image?: string;
  tags?: string[];
  content: string;
}

export default function BlogPost({ post }: { post: BlogPost }) {
  // Remove the useParams and post finding logic
  // const { slug } = useParams<{ slug: string }>();
  // const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Post not found
          </h2>
          <Link
            to="/community"
            className="text-purple-600 dark:text-purple-400 hover:underline"
          >
            Return to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white dark:bg-gray-900"
    >
      <article className="max-w-4xl mx-auto px-4 py-24">
        <Link
          to="/community"
          className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to blog
        </Link>

        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full aspect-video object-cover rounded-xl mb-8"
          />
        )}

        <header className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <time dateTime={post.date}>
                {format(new Date(post.date), "MMMM d, yyyy")}
              </time>
            </div>
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span>
                {Math.ceil(post.content.split(" ").length / 200)} min read
              </span>
            </div>
          </div>
        </header>

        {post.tags && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 text-sm text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-purple-600 dark:prose-a:text-purple-400 prose-img:rounded-xl">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </motion.div>
  );
}
