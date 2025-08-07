import { HiMenu } from 'react-icons/hi'
import { Menu } from '@headlessui/react'
import { FaChevronDown } from 'react-icons/fa'

type HeaderProps = {
  title?: string
  username?: string
  onLogout: () => void
  onToggleSidebar: () => void
}

export default function Header({ title, username = 'Guest', onLogout, onToggleSidebar }: HeaderProps) {
  return (
    <header className="h-16 bg-white shadow px-4 md:px-6 flex items-center justify-between">
      {/* Left: Hamburger + Title */}
      <div className="flex items-center gap-4">
        {/* Hamburger - visible only on mobile */}
        <button
          className="md:hidden text-gray-600 hover:text-black"
          onClick={onToggleSidebar}
        >
          <HiMenu size={24} />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">{title || null}</h1>
      </div>

      {/* Right: Dropdown */}
      <div className="relative">
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black transition">
            {username}
            <FaChevronDown className="h-3 w-3" />
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onLogout}
                    className={`${active ? 'bg-gray-100' : ''} w-full text-left px-4 py-2 text-sm text-gray-700`}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </div>
    </header>
  )
}
