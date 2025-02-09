import Cookies from 'js-cookie';
import { useCallback, useState } from 'react';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import { TOKEN } from '@/shared/globals/globalsData';
import { addNotification } from '@/widgets/pop-ups/notifications/model/addNotification';
import {
  addOnePie,
  getPies,
  pieInterface,
} from '@/entities/pies/model/piesSlice';
import { routes } from '@/shared/config/routes';
import { checkUserAuthorization } from '@/entities/user/data-management/shared/checkUserAuthorization';
import { createPieLogic } from '@/entities/pies/createPie';
import { getUserDevice } from '@/entities/user/data-management/shared/UserDeviceSlice';

export const createPieModel = (dispatch: Dispatch<UnknownAction>) => {
  const token = Cookies.get(TOKEN);
  const userDevice = useSelector(getUserDevice);
  const defaultCountOfPies =
    userDevice === 'desktop' ? 10 : userDevice === 'tablet' ? 6 : 3;
  const [pieName, setPieName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const piesAll = useSelector(getPies);
  let pagesAll = 1;
  let pies: pieInterface[] = [];

  const updateIndexOfActivePies = () => {
    if (piesAll) {
      pies = piesAll.slice(
        defaultCountOfPies * page,
        defaultCountOfPies * (page + 1)
      );
      pagesAll = Math.ceil(piesAll.length / defaultCountOfPies);
    }
  };

  const setActivePage = (num: number) => {
    setPage(num);
    updateIndexOfActivePies();
  };

  const getTabulationArray = () => {
    const res = [];
    res.push(0);
    const start = Math.max(1, page - 1);
    const end = Math.min(pagesAll - 2, page + 1);
    if (page > 2) {
      res.push(-1);
    }
    for (let i = start; i <= end; i++) {
      res.push(i);
    }
    if (page < pagesAll - 3) {
      res.push(-1);
    }
    if (pagesAll > 1) {
      res.push(pagesAll - 1);
    }

    return res;
  };

  const createPie = useCallback(async () => {
    if (!loading && token) {
      setLoading(true);
      try {
        const response: any = await createPieLogic(pieName, token);
        const pieData = response.data.data;
        dispatch(
          addOnePie({
            description: pieData.effect.description,
            imgLink: pieData.imgLink,
            name: pieData.name,
            rarity: {
              chance: pieData.rarity.chance,
              rare: pieData.rarity.name,
            },
          })
        );
        addNotification(
          dispatch,
          response.data.messageForUser,
          response.data.statusCode
        );
        setPieName('');
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  }, [pieName]);

  updateIndexOfActivePies();
  checkUserAuthorization(routes.main.home.path);

  return {
    createPie,
    pieName,
    setPieName,
    pies,
    pagesAll,
    page,
    setActivePage,
    getTabulationArray,
  };
};
