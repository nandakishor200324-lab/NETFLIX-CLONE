import netflixN from '../assets/netflix-N.jpg'
import searchIcon from '../assets/search.png'

import { useState } from 'react'
import { useScrollPosition } from '../hooks/useScrollPosition'


const Navbar = () => {
  const isScrolled = useScrollPosition(100)
  const [showSearch, setShowSearch] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const navLinks = [
    'Home',
    'TV Shows',
    'Movies',
    'New & Popular',
    'My List',
    'Browse by Languages',
  ]

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        backgroundColor: isScrolled ? '#141414' : 'transparent',
        color: '#fff',
        zIndex: 1000,
        transition: 'background-color 0.3s ease',
        borderBottom: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)',
      }}
    >
      {/* Logo */}
      <div
        style={{
          color: '#E50914',
          fontWeight: 'bold',
          fontSize: '24px',
        }}
      >
        NETFLIX
      </div>

      {/* Nav links */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          fontSize: '14px',
        }}
      >
        {navLinks.map((item) => (
          <span
            key={item}
            style={{
              position: 'relative',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              const underline = e.currentTarget.querySelector('span')
              underline.style.width = '100%'
            }}
            onMouseLeave={(e) => {
              const underline = e.currentTarget.querySelector('span')
              underline.style.width = '0'
            }}
          >
            {item}
            <span
              style={{
                position: 'absolute',
                left: 0,
                bottom: -4,
                height: 2,
                width: 0,
                backgroundColor: '#fff',
                transition: 'width 0.2s ease',
              }}
            />
          </span>
        ))}
      </div>

      {/* Right side: search, bell, profile */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
        }}
      >
        {/* Search */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: showSearch ? '#000' : 'transparent',
            border: showSearch ? '1px solid #fff' : 'none',
            borderRadius: 4,
            padding: showSearch ? '4px 8px' : '0',
            transition: 'all 0.3s ease',
          }}
        >
          <span
  style={{ cursor: 'pointer', marginRight: showSearch ? 8 : 0 }}
  onClick={() => setShowSearch((prev) => !prev)}
>
  <img
    src={searchIcon}
    alt="Search"
    style={{ width: 18, height: 18, display: 'block' }}
  />
</span>

          {showSearch && (
            <input
              autoFocus
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Titles, people, genres"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#fff',
                width: 180,
                fontSize: 14,
              }}
            />
          )}
        </div>

        {/* Notification bell */}
        <span style={{ cursor: 'pointer' }}>🔔</span>

        {/* Profile avatar + dropdown */}
        <div
          style={{ position: 'relative' }}
          onMouseEnter={() => setShowProfileMenu(true)}
          onMouseLeave={() => setShowProfileMenu(false)}
        >
          <img
  src={netflixN}
  alt="Profile"
  style={{
    width: 32,
    height: 32,
    borderRadius: '4px',
    objectFit: 'cover',
    cursor: 'pointer',
  }}
/>


          {showProfileMenu && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                marginTop: 8,
                backgroundColor: '#141414',
                border: '1px solid #333',
                borderRadius: 4,
                padding: '8px 0',
                minWidth: 160,
                boxShadow: '0 2px 10px rgba(0,0,0,0.8)',
              }}
            >
              {['Account', 'Help Center', 'Sign Out'].map((item) => (
                <div
                  key={item}
                  style={{
                    padding: '6px 16px',
                    fontSize: 14,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#333'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
