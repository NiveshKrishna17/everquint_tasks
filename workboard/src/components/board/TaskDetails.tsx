import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Avatar, Tag, Divider, message } from 'antd';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { CloseOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import { formatDistanceToNow } from 'date-fns';
import { useBoardContext } from '../../context/BoardContext';
import { EditableText } from './inline/EditableText';
import { EditableSelect } from './inline/EditableSelect';
import { EditableAssignee } from './inline/EditableAssignee';
import type { Task, TaskStatus, TaskPriority } from '../../types/board';

const priorityLabels: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

const statusLabels: Record<TaskStatus, string> = {
  backlog: 'Backlog',
  in_progress: 'In Progress',
  done: 'Done',
};

// Removed component overrides, relying strictly on imported Presentational subset boundaries.

export const TaskDetails: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { data, updateTask } = useBoardContext();
  const [editingField, setEditingField] = useState<string | null>(null);

  const task = taskId ? data.tasks[taskId] : null;

  if (!task) {
    return (
      <div className="p-6 flex flex-col h-full items-center justify-center text-gray-500">
        <p>Task not found.</p>
        <Button variant="primary" onClick={() => navigate('/')} className="mt-4">Back to Board</Button>
      </div>
    );
  }

  const timeAgo = formatDistanceToNow(new Date(task.updatedAt), { addSuffix: true });

  const handleSave = (field: keyof Task, val: any) => {
    if (field === 'title' && (!val || typeof val !== 'string' || val.trim() === '')) {
       message.error("Task Title cannot be empty!");
       return;
    }
  
    updateTask({ ...task, [field]: val });
    setEditingField(null);
  };

  const wrapDoubleClick = (field: string, children: React.ReactNode) => {
    if (editingField === field) return children;
    return (
      <div 
        role="button"
        tabIndex={0}
        aria-label={`Double click or press enter to edit ${field}`}
        onDoubleClick={() => setEditingField(field)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setEditingField(field);
          }
        }}
        className="cursor-pointer hover:bg-gray-100 p-1.5 -m-1.5 rounded transition-colors border border-transparent hover:border-gray-200 w-full min-h-[28px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {children}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
        <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">
          Task-{task.id.split('-')[1] || task.id}
        </div>
        <Button 
          variant="secondary"
          onClick={() => navigate('/')} 
          className="h-[32px] w-[32px] px-0 border-transparent shadow-none text-gray-400 hover:text-gray-600 hover:bg-gray-100 bg-transparent"
        >
          <CloseOutlined />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto w-full">
        <div className="p-6 w-full">
          <div className="mb-6">
            {editingField === 'title' ? (
              <EditableText 
                value={task.title} 
                onSave={v => handleSave('title', v || 'Untitled Task')} 
                onCancel={() => setEditingField(null)} 
                textClassName="text-xl font-semibold w-full"
              />
            ) : (
              wrapDoubleClick('title', <h2 className="text-xl font-semibold text-gray-900 leading-tight m-0">{task.title}</h2>)
            )}
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] gap-y-4 gap-x-4 text-sm items-start">
              
              <div className="text-gray-500 pt-1.5">Status</div>
              <div className="w-full flex">
                {editingField === 'status' ? (
                  <EditableSelect 
                    value={task.status} 
                    onSave={v => handleSave('status', v)} 
                    onCancel={() => setEditingField(null)}
                    options={[
                      { label: 'Backlog', value: 'backlog' },
                      { label: 'In Progress', value: 'in_progress' },
                      { label: 'Done', value: 'done' },
                    ]}
                  />
                ) : (
                  wrapDoubleClick('status', (
                    <div className="font-medium text-gray-900 bg-gray-100 px-2 py-0.5 rounded-md inline-flex w-fit">
                      {statusLabels[task.status] || task.status}
                    </div>
                  ))
                )}
              </div>

              <div className="text-gray-500 pt-1.5">Priority</div>
              <div className="w-full flex">
                {editingField === 'priority' ? (
                  <EditableSelect 
                    value={task.priority} 
                    onSave={v => handleSave('priority', v)} 
                    onCancel={() => setEditingField(null)}
                    options={[
                      { label: 'Low', value: 'low' },
                      { label: 'Medium', value: 'medium' },
                      { label: 'High', value: 'high' },
                    ]}
                  />
                ) : (
                  wrapDoubleClick('priority', (
                    <Badge variant={
                      task.priority === 'high' ? 'error' : 
                      task.priority === 'medium' ? 'warning' : 'info'
                    } className="m-0 border-0 font-medium font-sans">
                      {priorityLabels[task.priority]}
                    </Badge>
                  ))
                )}
              </div>

              <div className="text-gray-500 pt-1.5">Assignee</div>
              <div className="w-full flex">
                {editingField === 'assignee' ? (
                  <EditableAssignee 
                    value={task.assignee} 
                    onSave={v => handleSave('assignee', v)} 
                    onCancel={() => setEditingField(null)} 
                  />
                ) : (
                  wrapDoubleClick('assignee', (
                    <div className="flex items-center gap-2 font-medium text-gray-900">
                      {task.assignee ? (
                        <>
                          <Avatar size="small" src={task.assignee.avatarUrl} icon={!task.assignee.avatarUrl ? <UserOutlined /> : undefined} />
                          <span>{task.assignee.name}</span>
                        </>
                      ) : (
                        <>
                          <Avatar size="small" icon={<UserOutlined />} className="bg-gray-200" />
                          <span className="text-gray-400 font-normal">Unassigned</span>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="text-gray-500 pt-1.5">Tags</div>
              <div className="w-full flex">
                {editingField === 'tags' ? (
                  <EditableSelect 
                    value={task.tags} 
                    onSave={v => handleSave('tags', v || [])} 
                    onCancel={() => setEditingField(null)}
                    mode="tags"
                    placeholder="Add tags..."
                  />
                ) : (
                  wrapDoubleClick('tags', (
                    <div className="flex flex-wrap gap-1 min-h-[22px] items-center">
                      {task.tags.map(tag => (
                        <Tag key={tag} className="m-0 border border-gray-200 bg-white text-gray-600">
                          {tag}
                        </Tag>
                      ))}
                      {task.tags.length === 0 && <span className="text-gray-400 italic">None</span>}
                    </div>
                  ))
                )}
              </div>
            </div>

            <Divider className="my-2" />

            <div className="w-full pb-8">
              <h3 className="text-base font-semibold text-gray-900 mb-3">Description</h3>
              {editingField === 'description' ? (
                  <EditableText 
                    value={task.description || ''} 
                    onSave={v => handleSave('description', v)} 
                    onCancel={() => setEditingField(null)} 
                    isTextArea
                  />
                ) : (
                  wrapDoubleClick('description', (
                    <div className="text-gray-700 bg-gray-50 p-4 rounded-lg text-sm leading-relaxed border border-gray-100 whitespace-pre-wrap min-h-[100px]">
                      {task.description ? (
                        task.description
                      ) : (
                        <span className="text-gray-400 italic font-mono">Double-click to add a description.</span>
                      )}
                    </div>
                  ))
                )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <ClockCircleOutlined />
          <span>Updated {timeAgo}</span>
        </div>
      </div>
    </div>
  );
};
