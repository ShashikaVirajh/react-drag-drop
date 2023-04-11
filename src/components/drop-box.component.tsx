import React, { ReactNode } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';

type Props = {
  onDrop: (item: DragItem, monitor: DropTargetMonitor) => void;
  children: ReactNode;
};

type DragItem = {
  id: string;
  left: number;
  top: number;
  type: string;
};

const ItemTypes = {
  BOX: 'box'
};

export const DropBox: React.FC<Props> = ({ onDrop, children }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: (item: DragItem, monitor: DropTargetMonitor) => onDrop(item, monitor),
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }));

  const isActive = canDrop && isOver;
  const backgroundColor = isActive ? 'blue' : 'green';

  return (
    <div ref={drop} style={{ backgroundColor, height: '100%', width: '100%' }}>
      {children}
    </div>
  );
};
