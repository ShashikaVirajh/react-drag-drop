import React, { useState } from 'react';
import { DropBox } from './components/drop-box.component';
import { DraggableBox } from './components/draggable-item.component';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const App: React.FC = () => {
  const [boxes, setBoxes] = useState<{ id: string; left: number; top: number }[]>([
    { id: 'box1', left: 0, top: 0 },
    { id: 'box2', left: 200, top: 0 }
  ]);

  const handleDrop = (item: { id: string; left: number; top: number }) => {
    console.log('hehe');
    const newBoxes = boxes.map((box) => {
      if (box.id === item.id) {
        return { ...box, left: item.left, top: item.top };
      } else {
        return box;
      }
    });
    setBoxes(newBoxes);
  };

  return (
    <div style={{ height: '100vh', display: 'flex' }}>
      <DndProvider backend={HTML5Backend}>
        <DropBox onDrop={handleDrop}>
          {boxes.map((box) => (
            <DraggableBox key={box.id} id={box.id} left={box.left} top={box.top}>
              Box {box.id}
            </DraggableBox>
          ))}
        </DropBox>
      </DndProvider>
    </div>
  );
};
