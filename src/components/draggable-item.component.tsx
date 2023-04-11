import { useDrag, DragSourceMonitor } from 'react-dnd';

type Props = {
  id: string;
  left: number;
  top: number;
  children: React.ReactNode;
};

const ItemTypes = {
  BOX: 'box'
};

export const DraggableBox: React.FC<Props> = ({ id, left, top, children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { id, left, top },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  return (
    <div ref={drag} style={{ left, top, opacity: isDragging ? 0.5 : 1, position: 'absolute' }}>
      {children}
    </div>
  );
};
