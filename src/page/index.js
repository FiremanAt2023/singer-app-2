import React, { useState } from 'react';
import SingerList from './SingerList';
import Songs from './Songs';
import SongList from './SongList';

const Navbar = () => {
  const [currentPage, setCurrentPage] = useState('Home');
  const songManagement = [
    { label: '歌手管理', page: 'Singers' },
    { label: '歌曲管理', page: 'Songs' },
  ];
  const songList = [
    { label: '歌单管理', page: 'SongList' },

  ];
  const [menu, setMenu] = useState([
    { label: '歌曲管理', items: songManagement, expanded: true },
    { label: '歌单管理', items: songList, expanded: true },
  ]);

  const handleLinkClick = page => {
    setCurrentPage(page);
  };
  const toggleMenu = index => {
    setMenu(prevMenu => {
      const newMenu = [...prevMenu];
      newMenu[index].expanded = !newMenu[index].expanded;
      return newMenu;
    });
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'Singers':
        return <SingerList />;
      case 'Songs':
        return <Songs />;
      case 'SongList':
        return <SongList />;
      default:
        return <SingerList />;
    }
  };

  return (
    <div className='container'>
      <div className='navbar'>
        <nav>
          <ul>
            {menu.map((item, index) => (
              <li key={index} className="menuItem">
                <div onClick={() => toggleMenu(index)}>
                  {item.label} ({item.expanded ? '^' : '>'})
                </div>
                {item.expanded && (
                  <ul>
                    {item.items.map((subitem, subindex) => (
                      <li key={subindex}
                        className={currentPage === subitem.page ? 'active' : ''}
                        onClick={() => handleLinkClick(subitem.page)}
                      >{subitem.label}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default Navbar;