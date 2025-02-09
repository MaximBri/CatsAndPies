import { NavigateFunction } from 'react-router-dom';
import { useRef, useState } from 'react';

import { createCatThunk } from '@/entities/cat/model/catThunks';
import { CatLogic } from '@/entities/cat/catLogic';
import { setCatWindow } from '@/app/store/slices/WindowsSlice';
import { addNotification } from '../../notifications/model/addNotification';
import { routes } from '@/shared/config/routes';
import { AppDispatch } from '@/app/store';
import styles from '../CreateCat.module.scss';

export const createCatModel = (
  dispatch: AppDispatch,
  navigate: NavigateFunction
) => {
  const [name, setName] = useState('');
  const [error, setError] = useState<string>('');
  const popUpRef = useRef<HTMLElement>(null);
  const background = useRef<HTMLDivElement>(null);

  const toCreateCat = async () => {
    try {
      const result = await dispatch(createCatThunk(name));
      if (createCatThunk.fulfilled.match(result)) {
        const response = result.payload;
        CatLogic(response.data, dispatch);
        dispatch(setCatWindow(false));
        addNotification(dispatch, response.messageForUser, response.statusCode);
        navigate(routes.main.cat.path);
      }
    } catch (error) {
      setError('Произошла ошибка при создании кота');
    }
  };

  const onCloseWindow = () => {
    if (popUpRef.current && background.current) {
      popUpRef.current.classList.remove(styles['cat--animation']);
      background.current.classList.remove(styles['cat__background--animation']);
      popUpRef.current.classList.add(styles['cat--closed']);
      background.current.classList.add(styles['cat__background--closed']);
    }
    setTimeout(() => {
      dispatch(setCatWindow(false));
    }, 250);
  };

  return {
    name,
    setName,
    error,
    setError,
    toCreateCat,
    onCloseWindow,
    popUpRef,
    background,
  };
};
