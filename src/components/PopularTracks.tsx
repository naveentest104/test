// app/components/PopularTracks.tsx
'use client';

import React from 'react';

const tracks = [
  {
    title: 'Programming',
    problems: 615,
    color: 'bg-blue-500',
    icon: 'fas fa-code',
  },
  {
    title: 'Data Science',
    problems: 77,
    color: 'bg-orange-400',
    icon: 'fas fa-atom',
  },
  {
    title: 'System Design',
    problems: 8,
    color: 'bg-purple-500',
    icon: 'fas fa-project-diagram',
  },
  {
    title: 'Databases',
    problems: 45,
    color: 'bg-teal-400',
    icon: 'fas fa-database',
  },
  {
    title: 'Puzzle',
    problems: 54,
    color: 'bg-yellow-400',
    icon: 'fas fa-puzzle-piece',
  },
  {
    title: 'Scripting',
    problems: 12,
    color: 'bg-blue-400',
    icon: 'fas fa-terminal',
  },
];

const PopularTracks: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Popular Tracks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {tracks.map((track, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-md ${track.color} text-white`}
          >
            <div className="flex items-center mb-2">
              <i className={`${track.icon} text-3xl`}></i>
            </div>
            <h2 className="text-lg font-semibold">{track.title}</h2>
            <p className="text-sm">
              <i className="fas fa-code"></i> {track.problems} Problems
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularTracks;