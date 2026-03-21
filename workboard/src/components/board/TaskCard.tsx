import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Avatar, Tooltip } from 'antd';
import { Badge } from '../ui/Badge';
import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import { formatDistanceToNow } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import type { Task } from '../../types/board';

interface TaskCardProps {
  task: Task;
  index: number;
}

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  const navigate = useNavigate();
  const timeAgo = formatDistanceToNow(new Date(task.updatedAt), { addSuffix: true });

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef as any}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          role="button"
          tabIndex={0}
          aria-label={`View task ${task.title}`}
          onClick={() => navigate(`/task/${task.id}`)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              navigate(`/task/${task.id}`);
            }
          }}
          className={`block group bg-white rounded-lg p-4 shadow-sm border ${
            snapshot.isDragging ? 'border-blue-400 shadow-md ring-1 ring-blue-400 opacity-90' : 'border-gray-200 hover:border-gray-300'
          } mb-3 cursor-grab active:cursor-grabbing transition-colors outline-none focus:ring-2 focus:ring-blue-500`}
        >
          <div className="flex justify-between items-start mb-2 gap-2">
            <Link 
              to={`/task/${task.id}`}
               onPointerDown={(e) => e.stopPropagation()} 
               onMouseDown={(e) => e.stopPropagation()}
               onClick={(e) => e.stopPropagation()}
               className="text-gray-900 font-medium text-sm leading-snug line-clamp-2 hover:text-blue-600 hover:underline"
            >
              {task.title}
            </Link>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3">
            <Badge variant={
                task.priority === 'high' ? 'error' : 
                task.priority === 'medium' ? 'warning' : 'info'
            }>
              {priorityLabels[task.priority]}
            </Badge>
            {task.tags.map((tag) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
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
