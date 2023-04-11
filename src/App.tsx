import { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { CardContainer } from './components/card-container.component';
import { Box, Typography } from '@mui/material';

export const App: FC = (): JSX.Element => (
  <>
    <Typography variant='h5' mt='2rem' textAlign='center' color='green'>
      Drag and drop to rank your favourite movies
    </Typography>

    <Box display='flex' justifyContent='center'>
      <DndProvider backend={HTML5Backend}>
        <CardContainer />
      </DndProvider>
    </Box>
  </>
);
