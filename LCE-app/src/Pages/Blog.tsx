import { allPosts } from "content-collections";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function BlogList() {
  return (
    <div className="min-h-screen bg-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white text-center mb-4">
          Our <span className="text-blue-600">Blog</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-16 max-w-2xl mx-auto">
          Discover insights, strategies, and practical guides for scaling your
          startup
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts
            .sort(
              (a: { date: string }, b: { date: string }) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .map(
              (post: {
                slug: string;
                image?: string;
                date: string;
                author: string;
                title: string;
                description?: string;
                summary?: string;
                tags?: string[];
              }) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <Link to={`/blog/${post.slug}`} className="block">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-r from-blue-500 to-blue-500" />
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </time>
                        </div>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          <span>{post.author}</span>
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {post.description || post.summary}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {post.tags?.map((tag: string) => (
                            <span
                              key={tag}
                              className="px-3 py-1 text-sm text-black dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="pt-4">
                        <Button className="flex w-full justify-center dark:text-blue-400 font-medium">
                          Read more
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              )
            )}
        </div>
      </div>
    </div>
  );
}
