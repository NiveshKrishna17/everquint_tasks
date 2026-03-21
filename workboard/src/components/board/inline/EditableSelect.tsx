import React, { useState } from 'react';
import { Select } from 'antd';
import { Button } from '../../ui/Button';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

export const EditableSelect: React.FC<{ value: any; options?: any[]; onSave: (v: any) => void; onCancel: () => void; mode?: 'tags' | 'multiple'; placeholder?: string }> = ({ value, options, onSave, onCancel, mode, placeholder }) => {
  const [localVal, setLocalVal] = useState(value);
  return (
    <div className="flex items-center gap-2 w-full animate-in fade-in zoom-in-95 duration-100">
      <div className="flex-1">
        <Select 
          aria-label={placeholder || "Select option"}
          autoFocus 
          mode={mode} 
          className="w-full min-w-[120px]" 
          value={localVal} 
          onChange={val => setLocalVal(val)} 
          options={options} 
          placeholder={placeholder}
          dropdownStyle={{ minWidth: 150 }}
        />
      </div>
      <div className="flex gap-1 shrink-0">
        <Button size="sm" variant="secondary" onClick={() => onSave(localVal)} className="h-[28px] w-[28px] px-0 shadow-sm border-green-200 text-green-600 hover:bg-green-50">
          <CheckOutlined />
        </Button>
        <Button size="sm" variant="secondary" onClick={onCancel} className="h-[28px] w-[28px] px-0 shadow-sm border-red-200 text-red-600 hover:bg-red-50">
          <CloseOutlined />
        </Button>
      </div>
    </div>
  );
};
