import update from 'immutability-helper';
import { FC, useCallback, useState } from 'react';
import { MovieCard } from './card.component';
import { movieCardList } from '../constants';
import { Box } from '@mui/material';
import { TCard } from '../types';

export const CardContainer: FC = (): JSX.Element => {
  const [cards, setCards] = useState<TCard[]>(movieCardList);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]]
        ]
      })
    );
  }, []);

  const memoizedRenderCard = useCallback(
    (card: TCard, index: number) => (
      <MovieCard key={card.id} index={index} id={card.id} text={card.text} moveCard={moveCard} />
    ),
    [moveCard]
  );

  return (
    <Box display='flex' flexDirection='column' mt='1rem'>
      {cards.map((card, i) => memoizedRenderCard(card, i))}
    </Box>
  );
};
