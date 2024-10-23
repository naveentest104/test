'use client';
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  PlayIcon,
  MagnifyingGlassIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/solid';
import PopularTracks from '@/components/PopularTracks';
import Courses   from '@/app/courses/page'

// Mock data (in a real app, this would come from an API)
const featuredVideo = {
  thumbnail: '/featured-video-thumbnail.jpg',
  title: 'Introduction to Machine Learning',
  description:
    'Learn the basics of machine learning in this comprehensive overview.',
};



const latestVideos = [
  {
    thumbnail: '/video1.jpg',
    title: 'Understanding Photosynthesis',
    link: '/videos/1',
  },
  { thumbnail: '/video2.jpg', title: 'Algebra Basics', link: '/videos/2' },
  {
    thumbnail: '/video3.jpg',
    title: 'World War II Overview',
    link: '/videos/3',
  },
];


const communityDiscussions = [
  {
    title: 'Tips for Effective Studying',
    snippet: 'Share your best study techniques...',
    link: '/discussions/1',
  },
  {
    title: 'Career Paths in Data Science',
    snippet: 'Exploring various roles in the data science field...',
    link: '/discussions/2',
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>EduHub - Learn. Practice. Connect.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="relative h-96 rounded-xl overflow-hidden">
            <Image
              src={featuredVideo.thumbnail}
              alt={featuredVideo.title}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-4">
                  {featuredVideo.title}
                </h1>
                <p className="mb-6">{featuredVideo.description}</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full inline-flex items-center">
                  <PlayIcon className="h-5 w-5 mr-2" />
                  Watch Now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Search Bar */}
        <section className="mb-16">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for videos, quizzes, or discussions..."
              className="w-full py-3 px-4 pr-10 rounded-full border-2 border-gray-300 focus:outline-none focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-16">
          <Courses />
        </section>

        {/* Latest Videos */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Latest Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestVideos.map((video) => (
              <Link
                key={video.title}
                href={video.link}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{video.title}</h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              href="/videos"
              className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center"
            >
              View All Videos
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </section>

        {/* Popular Quizzes and Coding Challenges */}
        <div >
         <PopularTracks />
        </div>

        {/* Community Discussions */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Community Discussions</h2>
          <div className="space-y-4">
            {communityDiscussions.map((discussion) => (
              <Link
                key={discussion.title}
                href={discussion.link}
                className="block bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold mb-2">{discussion.title}</h3>
                <p className="text-sm text-gray-600">{discussion.snippet}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-blue-600 text-white rounded-xl p-8 text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="mb-6">
            Join thousands of students and start your learning journey today!
          </p>
          <button className="bg-white text-blue-600 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition-colors">
            Sign Up Now
          </button>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">About</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="hover:text-gray-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-gray-300">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-gray-300">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="hover:text-gray-300">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-gray-300">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-gray-300">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="hover:text-gray-300">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-gray-300">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-2xl hover:text-gray-300">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-2xl hover:text-gray-300">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-2xl hover:text-gray-300">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-2xl hover:text-gray-300">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p>&copy; 2023 EduHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
