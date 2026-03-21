import React, { useState } from 'react';
import { TextInput } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import type { Task } from '../../../types/board';

export const EditableAssignee: React.FC<{ value: Task['assignee']; onSave: (v: Task['assignee']) => void; onCancel: () => void }> = ({ value, onSave, onCancel }) => {
  const [localName, setLocalName] = useState(value?.name || '');
  const [localAvatar, setLocalAvatar] = useState(value?.avatarUrl || '');
  return (
     <div className="flex items-start gap-2 w-full animate-in fade-in zoom-in-95 duration-100">
        <div className="flex-1 flex flex-col gap-2">
           <TextInput aria-label="Assignee Name" placeholder="Assignee Name" value={localName} onChange={e => setLocalName(e.target.value)} autoFocus />
           <TextInput aria-label="Assignee Avatar URL" placeholder="Avatar URL (Optional)" value={localAvatar} onChange={e => setLocalAvatar(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1 shrink-0">
          <Button size="sm" variant="secondary" onClick={() => onSave(localName ? { name: localName, avatarUrl: localAvatar || undefined } : undefined)} className="h-[28px] w-[28px] px-0 shadow-sm border-green-200 text-green-600 hover:bg-green-50">
            <CheckOutlined />
          </Button>
          <Button size="sm" variant="secondary" onClick={onCancel} className="h-[28px] w-[28px] px-0 shadow-sm border-red-200 text-red-600 hover:bg-red-50">
            <CloseOutlined />
          </Button>
        </div>
     </div>
  );
};
