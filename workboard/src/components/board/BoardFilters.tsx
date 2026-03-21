import React, { useEffect, useState } from 'react';
import { Input, Select } from 'antd';
import { Button } from '../ui/Button';
import { ClearOutlined, FilterOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';

const { Option } = Select;

export const BoardFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Local state for debounced search
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  // Debounce text search update to URL
  useEffect(() => {
    const handler = setTimeout(() => {
      updateParam('search', searchTerm);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const updateParam = (key: string, value: string | string[]) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      if (!value || (Array.isArray(value) && value.length === 0)) {
        params.delete(key);
      } else if (Array.isArray(value)) {
        params.set(key, value.join(','));
      } else {
        params.set(key, value);
      }
      return params;
    });
  };

  const getParamArray = (key: string) => {
    const val = searchParams.get(key);
    return val ? val.split(',') : [];
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
    setSearchTerm('');
  };

  const hasFilters = searchParams.toString() !== '';

  return (
    <div className="bg-white px-2 py-3 mb-2 border-b border-gray-100 flex flex-wrap items-center gap-3 w-full shrink-0 animate-in fade-in slide-in-from-top-2">
      <div className="flex items-center gap-2 text-gray-500 mr-2 border-r border-gray-200 pr-4">
        <FilterOutlined />
        <span className="font-semibold text-sm tracking-wide uppercase">Filters</span>
      </div>

      <Input.Search
        placeholder="Search tasks..."
        allowClear
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: 220 }}
      />
      
      <Select
        mode="multiple"
        placeholder="Status"
        allowClear
        style={{ minWidth: 160 }}
        value={getParamArray('status')}
        onChange={(val) => updateParam('status', val)}
        maxTagCount="responsive"
      >
        <Option value="backlog">Backlog</Option>
        <Option value="in_progress">In Progress</Option>
        <Option value="done">Done</Option>
      </Select>

      <Select
        mode="multiple"
        placeholder="Priority"
        allowClear
        style={{ minWidth: 160 }}
        value={getParamArray('priority')}
        onChange={(val) => updateParam('priority', val)}
        maxTagCount="responsive"
      >
        <Option value="low">Low</Option>
        <Option value="medium">Medium</Option>
        <Option value="high">High</Option>
      </Select>

      <div className="flex-1 min-w-[20px]" />

      <Select
        placeholder="Sort..."
        allowClear
        style={{ minWidth: 180 }}
        value={searchParams.get('sort')}
        onChange={(val) => updateParam('sort', val || '')}
      >
        <Option value="createdAt:desc">Created: Newest First</Option>
        <Option value="createdAt:asc">Created: Oldest First</Option>
        <Option value="updatedAt:desc">Updated: Last Modified</Option>
        <Option value="updatedAt:asc">Updated: Least Modified</Option>
        <Option value="priority:desc">Priority: High to Low</Option>
        <Option value="priority:asc">Priority: Low to High</Option>
      </Select>

      {hasFilters && (
        <Button variant="secondary" onClick={clearFilters} className="text-gray-500 hover:text-gray-900 border-none bg-transparent shadow-none ml-2 gap-1.5 h-auto py-1 px-3">
          <ClearOutlined /> Clear
        </Button>
      )}
    </div>
  );
};
