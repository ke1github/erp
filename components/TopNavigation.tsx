'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineSearch, AiOutlineBell } from 'react-icons/ai';

type Notification = {
  id: string;
  message: string;
  read: boolean;
};

type UserProfile = {
  name: string;
  avatar: string;
};

export default function TopNavigation() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch notifications from API
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('/api/notifications', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data: Notification[] = await response.json();
        setNotifications(data);
        setHasUnreadNotifications(data.some((notification) => !notification.read));
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  // Fetch user profile from API
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data: UserProfile = await response.json();
        setUserProfile(data);
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  // Fetch notifications and user profile on component mount
  useEffect(() => {
    fetchNotifications();
    fetchUserProfile();
  }, []);

const handleLoginRedirect = () => {
    router.push('/login');
  };

  // Log notifications to avoid TypeScript errors
  useEffect(() => {
    if (notifications.length > 0) {
      console.log('Fetched Notifications:', notifications);
    }
  }, [notifications]);

  // Handle closing the dropdown when clicking outside
  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isDropdownOpen]);

  return (
    <div className="flex items-center justify-between bg-white shadow-sm rounded-lg px-6 py-3 mb-6">
      {/* Dashboard Title */}
      <h1 className="text-xl text-gray-700 font-semibold">LET&apos;S DO SOLARPANTI </h1>

      {/* Right Side: Search, Notification, Profile */}
      <div className="flex items-center space-x-5">
        {/* Search Bar */}
<div className="relative w-64">
  <label htmlFor="search-field" className="sr-only">Search</label>
  <AiOutlineSearch 
    aria-hidden="true" 
    className="pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
  />
  <input
    id="search-field"
    name="search"
    type="search"
    placeholder="Search..."
    className="block w-full border border-gray-300 py-2 pl-10 pr-4 rounded-full text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
  />
</div>


        {/* Notification Icon with Dropdown */}
        <div className="relative cursor-pointer dropdown">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="focus:outline-none">
            <AiOutlineBell className="text-xl" />
            {hasUnreadNotifications && (
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600"></span>
            )}
          </button>
          {isDropdownOpen && notifications.length > 0 && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-64 z-10">
              <h3 className="text-gray-800 px-4 py-2 font-semibold">Notifications</h3>
              <ul className="max-h-48 overflow-y-auto">
                {notifications.map((notification) => (
                  <li key={notification.id} className="px-4 py-2 border-b hover:bg-gray-100">
                    {notification.message}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Profile Avatar with Dropdown */}
        <div className="relative dropdown">
          {loading ? (
            <span>Loading...</span>
          ) : userProfile ? (
            <>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="focus:outline-none"
              >
                <Image
                  src={userProfile.avatar || '/default-avatar.jpg'}
                  alt="User Avatar"
                  width={36}
                  height={36}
                  className="rounded-full cursor-pointer"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-48 z-10">
                  <p className="block px-4 py-2 text-gray-800">{userProfile.name}</p>
                  <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
             <>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="focus:outline-none"
              >
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Guest Avatar"
                  width={36}
                  height={36}
                  className="rounded-full cursor-pointer"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-48 z-10">
                  <button
                    onClick={handleLoginRedirect}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Login
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
