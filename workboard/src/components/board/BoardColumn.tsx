import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { TaskCard } from './TaskCard';
import type { Task, ColumnType } from '../../types/board';

interface BoardColumnProps {
  column: ColumnType;
  tasks: Task[];
}

const columnColors = {
  backlog: 'bg-gray-100 text-gray-600',
  in_progress: 'bg-blue-50 text-blue-600',
  done: 'bg-green-50 text-green-600',
};

export const BoardColumn: React.FC<BoardColumnProps> = ({ column, tasks }) => {
  return (
    <div className="flex flex-col flex-shrink-0 flex-1 min-w-[300px]">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
          {column.title}
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${columnColors[column.id] || 'bg-gray-100 text-gray-600'}`}>
            {tasks.length}
          </span>
        </h3>
      </div>

      {/* Column Body / Droppable Area */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 rounded-xl p-2 min-h-[500px] transition-colors ${
              snapshot.isDraggingOver ? 'bg-gray-100 border border-dashed border-gray-300' : 'bg-gray-50/50'
            }`}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
