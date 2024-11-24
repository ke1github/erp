import { useState } from 'react'
import { Bars3Icon, XMarkIcon, ChevronDownIcon, PlayCircleIcon, PhoneIcon, RectangleGroupIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

const products = [
  { name: 'Analytics', description: 'Get a better understanding where your traffic is coming from', href: '#' },
  { name: 'Engagement', description: 'Speak directly to your customers with our engagement tool', href: '#' },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#' },
  { name: 'Integrations', description: 'Integrate your data with other services', href: '#' },
]

const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
  { name: 'View all products', href: '#', icon: RectangleGroupIcon },
]

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [productDropdownOpen, setProductDropdownOpen] = useState(false)

  return (
    <header className="relative bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6">
        {/* Logo */}
        <div className="flex">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image 
              alt="Logo"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              width={32}  // Adjust width according to your design
              height={32} // Adjust height according to your design
            />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          {/* Product Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProductDropdownOpen(!productDropdownOpen)}
              className="flex items-center gap-x-1 text-sm font-semibold text-gray-900"
            >
              Product
              <ChevronDownIcon className="w-5 h-5 text-gray-400" />
            </button>

            {productDropdownOpen && (
              <div className="absolute bg-white shadow-lg mt-2 rounded-md py-4 px-6 w-56">
                {products.map((item) => (
                  <a key={item.name} href={item.href} className="block text-sm text-gray-900 hover:bg-gray-50 py-2">
                    {item.name}
                    <p className="text-xs text-gray-600">{item.description}</p>
                  </a>
                ))}
                <div className="mt-4">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-x-2.5 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                    >
                      <item.icon className="w-5 h-5 text-gray-400" />
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a href="#" className="text-sm font-semibold text-gray-900">Features</a>
          <a href="#" className="text-sm font-semibold text-gray-900">Marketplace</a>
          <a href="#" className="text-sm font-semibold text-gray-900">Company</a>
        </div>

        {/* Login Button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm font-semibold text-gray-900">Log in &rarr;</a>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-10 bg-white px-6 py-6">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image 
                alt="Logo"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                width={32}
                height={32}
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-6">
            <a href="#" className="block py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Product</a>
            <a href="#" className="block py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Features</a>
            <a href="#" className="block py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Marketplace</a>
            <a href="#" className="block py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Company</a>

            <div className="mt-6">
              <a href="#" className="block py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50">Log in</a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
