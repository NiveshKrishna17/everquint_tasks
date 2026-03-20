import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Avatar, Tooltip } from 'antd';
import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import { formatDistanceToNow } from 'date-fns';
import type { Task } from '../../types/board';

interface TaskCardProps {
  task: Task;
  index: number;
}

const priorityColors = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700',
};

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  const timeAgo = formatDistanceToNow(new Date(task.updatedAt), { addSuffix: true });

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`group bg-white rounded-lg p-4 shadow-sm border ${
            snapshot.isDragging ? 'border-blue-400 shadow-md ring-1 ring-blue-400 opacity-90' : 'border-gray-200 hover:border-gray-300'
          } mb-3 cursor-grab active:cursor-grabbing transition-colors`}
        >
          <div className="flex justify-between items-start mb-2 gap-2">
            <h4 className="text-gray-900 font-medium text-sm leading-snug line-clamp-2">
              {task.title}
            </h4>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${priorityColors[task.priority]}`}>
              {priorityLabels[task.priority]}
            </span>
            {task.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
            <div className="flex items-center text-gray-400 text-xs gap-1.5">
              <ClockCircleOutlined />
              <span>{timeAgo}</span>
            </div>

            <div className="flex -space-x-2 overflow-hidden">
              {task.assignee ? (
                <Tooltip title={task.assignee.name}>
                  <Avatar 
                    size="small" 
                    src={task.assignee.avatarUrl} 
                    icon={!task.assignee.avatarUrl ? <UserOutlined /> : undefined}
                    className="border-2 border-white bg-blue-500"
                  />
                </Tooltip>
              ) : (
                <Tooltip title="Unassigned">
                  <Avatar size="small" icon={<UserOutlined />} className="border-2 border-white bg-gray-200 text-gray-400" />
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
