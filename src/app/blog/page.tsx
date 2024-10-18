'use client';

import { format } from 'date-fns';
import Link from 'next/link';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

// Mock data for blog posts
const blogPosts = [
  { id: 1, title: 'Introduction to Next.js', slug: 'intro-to-nextjs', date: '2023-04-15', category: 'Web Development', readingTime: 5 },
  { id: 2, title: 'Advanced React Hooks', slug: 'advanced-react-hooks', date: '2023-04-20', category: 'React', readingTime: 8 },
  { id: 3, title: 'CSS Grid Layout Mastery', slug: 'css-grid-layout', date: '2023-04-25', category: 'CSS', readingTime: 6 },
  { id: 5, title: 'Introduction to Next.js', slug: 'intro-to-nextjs', date: '2023-04-15', category: 'Web Development', readingTime: 5 },
  { id: 6, title: 'Advanced React Hooks', slug: 'advanced-react-hooks', date: '2023-04-20', category: 'React', readingTime: 8 },
  { id: 7, title: 'CSS Grid Layout Mastery', slug: 'css-grid-layout', date: '2023-04-25', category: 'CSS', readingTime: 6 },
    { id: 8, title: 'Introduction to Next.js', slug: 'intro-to-nextjs', date: '2023-04-15', category: 'Web Development', readingTime: 5 },
  { id: 9, title: 'Advanced React Hooks', slug: 'advanced-react-hooks', date: '2023-04-20', category: 'React', readingTime: 8 },
  { id: 10, title: 'CSS Grid Layout Mastery', slug: 'css-grid-layout', date: '2023-04-25', category: 'CSS', readingTime: 6 },
  // Add more mock blog posts here
];

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  date: string;
  category: string;
  readingTime: number;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  // In a real application, you would fetch blog posts from a database or API
  return blogPosts;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getBlogPosts();
      setPosts(data);
      setCategories(Array.from(new Set(data.map((post) => post.category))));
    };
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Educational Blog</h1>
      <ClientSideBlogContent initialPosts={posts} categories={categories} />
    </div>
  );
}

interface ClientSideBlogContentProps {
  initialPosts: BlogPost[];
  categories: string[];
}

function ClientSideBlogContent({ initialPosts, categories }: ClientSideBlogContentProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    setPosts(initialPosts); // Update posts whenever initialPosts changes
  }, [initialPosts]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || post.category === selectedCategory)
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between mb-8">
        <div className="relative mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search blog posts..."
            className="pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="relative">
          <select
            className="pl-10 pr-4 py-2 border rounded-lg appearance-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <FunnelIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPosts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <Link href={`/blog/${post.slug}`}>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 text-sm mb-4">
                  {format(new Date(post.date), 'MMMM d, yyyy')} • {post.readingTime} min read
                </p>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  {post.category}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
}
