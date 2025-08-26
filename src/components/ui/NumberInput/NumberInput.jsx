import styles from "./NumberInput.module.css";



export default function NumberInput({ value, setValue, min = 0 }) {
  return (
    <div className={styles.stepper}>
      <button type="button" onClick={() => setValue(Math.max(min, (value || 0) - 1))}>−</button>
      <input
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        step={1}
        min={min}
        value={value}
        onChange={(e) => setValue(Math.max(min, parseInt(e.target.value || "0", 10)))}
        onWheel={(e) => e.currentTarget.blur()}  
      />
      <button type="button" onClick={() => setValue((value || 0) + 1)}>+</button>
    </div>
  );
}