import { AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, type MenuProps } from 'antd';
import React from 'react';

const Header: React.FC = () => {
  const userMenu: MenuProps = {
    items: [
      { key: 'profile', label: 'Profile' },
      { key: 'settings', label: 'Settings' },
      { type: 'divider' },
      { key: 'logout', label: 'Log Out' },
    ],
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-blue-600 cursor-pointer">
          <AppstoreOutlined className="text-2xl" />
          <span className="text-xl font-bold tracking-tight">Everquint</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <nav className="hidden md:flex items-center gap-1">
          <Button type="primary" className="ml-2 font-semibold shadow-sm">Create</Button>
        </nav>
        <Dropdown menu={userMenu} trigger={['click']} placement="bottomRight">
          <div className="cursor-pointer border-2 border-transparent hover:border-blue-100 rounded-full transition-all">
            <Avatar size="default" icon={<UserOutlined />} className="bg-blue-500" />
          </div>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
