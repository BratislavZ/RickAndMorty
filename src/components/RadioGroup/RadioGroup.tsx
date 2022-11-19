import React, { useState } from "react";
import styles from "./RadioGroup.module.css";

type Props = {
  onSelect: (checkedBtn: string) => void;
};

const RadioGroup: React.FC<Props> = (props) => {
  const [checked, setChecked] = useState("any");

  const selectHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.name);
    props.onSelect(e.target.name);
  };

  return (
    <div className={styles["character-status"]}>
      <span>Character status:</span>
      <div className={styles.fieldset}>
        <div className={styles["button-container"]}>
          <input
            id="radio-button-any"
            type="radio"
            name="any"
            checked={checked === "any"}
            onChange={selectHandler}
          />
          <label htmlFor="radio-button-any">Any</label>
        </div>
        <div className={styles["button-container"]}>
          <input
            id="radio-button-alive"
            type="radio"
            name="alive"
            checked={checked === "alive"}
            onChange={selectHandler}
          />
          <label htmlFor="radio-button-alive">Alive</label>
        </div>
        <div className={styles["button-container"]}>
          <input
            id="radio-button-dead"
            type="radio"
            name="dead"
            checked={checked === "dead"}
            onChange={selectHandler}
          />
          <label htmlFor="radio-button-dead">Dead</label>
        </div>
        <div className={styles["button-container"]}>
          <input
            id="radio-button-unknown"
            type="radio"
            name="unknown"
            checked={checked === "unknown"}
            onChange={selectHandler}
          />
          <label htmlFor="radio-button-unknown">Unknown</label>
        </div>
      </div>
    </div>
  );
};

export default RadioGroup;
