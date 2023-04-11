import { FC, useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor, XYCoord } from 'react-dnd';
import { ITEM_TYPES } from '../constants';
import { Box, Typography } from '@mui/material';

export const MovieCard: FC<Props> = ({ id, text, index, moveCard }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ITEM_TYPES.CARD,
    collect: (monitor: DropTargetMonitor) => ({
      handlerId: monitor.getHandlerId()
    }),
    hover: (item: any, monitor: DropTargetMonitor) => {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPES.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <Box
      ref={ref}
      my='1rem'
      py='2rem'
      textAlign='left'
      borderRadius='0.25rem'
      px='1rem'
      sx={{ border: '2px solid green', cursor: 'move', opacity }}
      data-handler-id={handlerId}
    >
      <Typography>Rank: {index + 1}</Typography>
      <Typography>Movie: {text}</Typography>
    </Box>
  );
};

type Props = {
  id: number;
  text: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
};
