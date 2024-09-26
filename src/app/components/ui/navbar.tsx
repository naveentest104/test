"use client"

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation' // For navigation
import { motion } from 'framer-motion' // For animation
import { Home, BookOpen, FileQuestion, User, Menu } from 'lucide-react'
import { Button } from "./button"

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: BookOpen, label: 'Courses', href: '/courses' },
  { icon: FileQuestion, label: 'Quizzes', href: '/quizzes' },
  { icon: User, label: 'Profile', href: '/profile' },
]

const Navbar = ({ isExpanded, toggleNavbar }) => {
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Ensure router is only available after component is mounted
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleNavigation = (href) => {
    if (isMounted) {
      router.push(href)
    }
  }

  if (!isMounted) return null

  return (
    <motion.nav
      initial={false}
      animate={{ width: isExpanded ? 260 : 64 }} // Smooth width animation
      className="bg-gradient-to-b from-[#1D2B64] to-[#F8CDDA] h-screen fixed left-0 top-0 z-10 shadow-2xl border border-[#ffffff22]"
    >
      <div className="p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleNavbar}
          className="w-full justify-start text-white relative"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="text-white"
          >
            <Menu className="h-6 w-6" />
          </motion.div>
          {isExpanded && <span className="ml-2 text-lg font-bold">Menu</span>}
        </Button>
      </div>
      <ul className="space-y-3 mt-6">
        {navItems.map((item, index) => (
          <motion.li
            key={index}
            whileHover={{
              scale: 1.1,
              background: "linear-gradient(90deg, rgba(135,182,255,1) 0%, rgba(255,175,189,1) 100%)",
              boxShadow: "0px 0px 15px rgba(255, 182, 193, 0.4)",
              transition: { duration: 0.4 },
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigation(item.href)}
            className="rounded-lg overflow-hidden"
          >
            <Button
              variant="ghost"
              className={`w-full flex items-center justify-start text-white py-3 px-4 transition-all duration-500 ${
                pathname === item.href ? 'bg-[#F39C12] shadow-lg shadow-[#F39C12]/50' : ''
              }`}
            >
              <motion.div
                animate={{
                  rotate: pathname === item.href ? 360 : 0,
                  opacity: pathname === item.href ? 1 : 0.7,
                }}
                transition={{ duration: 0.5 }}
              >
                <item.icon className="h-6 w-6 text-white" />
              </motion.div>
              {isExpanded && <span className="ml-4 text-lg">{item.label}</span>}
            </Button>
          </motion.li>
        ))}
      </ul>
      <motion.div
        className="absolute bottom-0 left-0 w-full flex justify-center p-4"
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={{ delay: 0.2 }}
      >
        <Button
          variant="ghost"
          size="lg"
          className="bg-gradient-to-r from-[#36D1DC] to-[#5B86E5] text-white"
          onClick={() => handleNavigation("/profile")}
        >
          {isExpanded ? "My Profile" : <User className="h-6 w-6" />}
        </Button>
      </motion.div>
    </motion.nav>
  )
}

export { Navbar }
