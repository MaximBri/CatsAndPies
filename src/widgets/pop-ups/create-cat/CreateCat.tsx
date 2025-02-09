import { useNavigate } from 'react-router-dom';

import { createCatModel } from './model/createCatModel';
import { useAppDispatch } from '@/app/store';
import attentionSvg from '/img/attention.svg';
import styles from './CreateCat.module.scss';

export const CreateCat = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    error,
    name,
    setName,
    toCreateCat,
    onCloseWindow,
    popUpRef,
    background,
  } = createCatModel(dispatch, navigate);
  return (
    <>
      <section
        ref={popUpRef}
        className={`${styles.cat} ${styles['cat--animation']}`}
      >
        <h2 className={styles.cat__title}>Создай своего кота</h2>
        <div className={styles.cat__attention}>
          <img src={attentionSvg} alt="Attention" />
          <h3>Кота можно создать только 1 раз</h3>
          {error && <h3>{error}</h3>}
        </div>
        <h3 className={styles.cat__name}>Придумай имя для кота</h3>
        <input
          className={styles['cat__name-input']}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Имя кота"
        />
        {name && (
          <button
            className={styles['cat__create-btn']}
            onClick={() => toCreateCat()}
          >
            Создать кота
          </button>
        )}
      </section>
      <div
        ref={background}
        className={`${styles.cat__background} ${styles['cat__background--animation']}`}
        onClick={() => onCloseWindow()}
      ></div>
    </>
  );
};
