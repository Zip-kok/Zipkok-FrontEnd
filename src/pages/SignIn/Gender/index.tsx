import styles from "./Gender.module.css";
export default function Gender() {
  function handleSubmit() {}

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1>
          성별을
          <br />
          알려주세요.
        </h1>
      </div>
    </div>
  );
}
