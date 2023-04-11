import update from 'immutability-helper';
import { useCallback, useState } from 'react';
import { Card } from './card.component';

const style: React.CSSProperties = {
  width: 400
};

interface CardType {
  id: number;
  text: string;
}

export const Container: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>([
    {
      id: 1,
      text: 'Write a cool JS library'
    },
    {
      id: 2,
      text: 'Make it generic enough'
    },
    {
      id: 3,
      text: 'Write README'
    },
    {
      id: 4,
      text: 'Create some examples'
    },
    {
      id: 5,
      text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)'
    },
    {
      id: 6,
      text: '???'
    },
    {
      id: 7,
      text: 'PROFIT'
    }
  ]);

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

  const renderCard = useCallback(
    (card: CardType, index: number) => {
      return <Card key={card.id} index={index} id={card.id} text={card.text} moveCard={moveCard} />;
    },
    [moveCard]
  );

  return (
    <>
      <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
    </>
  );
};
