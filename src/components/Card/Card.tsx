import React from "react";
import { CartoonCharacter } from "../../models/interface";
import styles from "./Card.module.css";

type Props = {
  character: CartoonCharacter;
};

const Card = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <div className={styles.card} ref={ref}>
      <img src={props.character.image} alt={props.character.name} />
      <div className={styles.name}>{props.character.name}</div>
    </div>
  );
});

export default Card;
