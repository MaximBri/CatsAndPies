import styles from './SaveMainSettings.module.scss';

export interface SaveMainSettingsProps {
  needSave: boolean;
  canSave: boolean;
  saveData: () => void;
}

export const SaveMainSettings = ({
  needSave,
  canSave,
  saveData,
}: SaveMainSettingsProps) => {
  return (
    <div
      className={`${styles.save} ${needSave ? '' : styles['save--disabled']}`}
    >
      <button
        onClick={() => saveData()}
        className={`${styles.save__button} ${canSave ? styles['save__button--active'] : ''}`}
        disabled={canSave ? false : true}
      >
        Сохранить
      </button>
    </div>
  );
};
