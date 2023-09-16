import { Fragment, useState, MouseEvent } from "react";

interface Game {
  id: number;
  name: string;
  year_release: string;
}

interface ListProps {
  label: string;
  items: Game[];
  onSelectItem: (item: Game) => void;
}

function List({ items: games, label, onSelectItem }: ListProps) {
  // create a hook, param 1 is name of var, param 2 is a handler for name (updater)
  const [selectedCard, setCard] = useState(-1);

  return (
    <>
      <h1>{label} </h1>
      {games.length === 0 && <p>No games found.</p>}
      {games.map((game, i) => {
        return (
          <div
            className={
              i === selectedCard ? "card bg-primary text-light" : "card"
            }
            key={i}
            onClick={(event) => {
              setCard(i);
              onSelectItem(game);
            }}
          >
            <div className="card-body">
              {game.name} {selectedCard}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default List;
