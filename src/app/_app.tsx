// src/app/components/Layout.tsx
"use client";

import { usePathname } from 'next/navigation';
import Navbar from './components/ui/navbar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <>
      {/* Conditionally render Navbar based on the pathname */}
      {pathname !== '/login' && <Navbar />}
      <main>{children}</main>
    </>
  );
};
