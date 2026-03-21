import React, { useState } from 'react';
import { Input } from 'antd';
import { Button } from '../../ui/Button';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

export const EditableText: React.FC<{ value: string; onSave: (v: string) => void; onCancel: () => void; isTextArea?: boolean; textClassName?: string; fallback?: string }> = ({ value, onSave, onCancel, isTextArea, textClassName }) => {
  const [localVal, setLocalVal] = useState(value);
  const InputComponent = isTextArea ? Input.TextArea as any : Input;
  return (
    <div className="flex items-start gap-2 w-full animate-in fade-in zoom-in-95 duration-100">
      <div className="flex-1">
        <InputComponent 
          autoFocus 
          value={localVal} 
          aria-label="Edit text content"
          onChange={(e: any) => setLocalVal(e.target.value)} 
          onKeyDown={(e: any) => {
            if (e.key === 'Enter') {
              if (isTextArea && !e.ctrlKey && !e.metaKey) return;
              e.preventDefault();
              onSave(localVal);
            }
            if (e.key === 'Escape') {
              onCancel();
            }
          }}
          rows={isTextArea ? 4 : undefined} 
          className={textClassName}
        />
      </div>
      <div className={`flex shrink-0 ${isTextArea ? 'flex-col gap-1' : 'gap-1'}`}>
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
