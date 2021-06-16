import {
  Car,
  Winner,
  Sort,
  GetsCarsResponse,
  GetsWinnerssResponse,
  CarParam,
} from './interfaces';

const baseUrl: RequestInfo = 'http://127.0.0.1:3000';
const garage: RequestInfo = `${baseUrl}/garage`;
const engine: RequestInfo = `${baseUrl}/engine`;
const winners: RequestInfo = `${baseUrl}/winners`;

export const getCars = async (
  page: number,
  limit: number,
): Promise<GetsCarsResponse> => {
  try {
    const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
    return {
      items: await response.json(),
      count: <string>response.headers.get('X-Total-Count'),
    };
  } catch (error) {
    return {
      items: [],
      count: '0',
    };
  }
};

export const getCar = async (id: number): Promise<Car> => (await fetch(`${garage}/${id}`)).json();

export const createCar = async (body: Car): Promise<boolean> => {
  try {
    (
      await fetch(garage, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/JSON',
        },
      })
    ).json();
    return true;
  } catch (error) {
    return false;
  }
};

export const updateCar = async (id: number, body: Car): Promise<boolean> => {
  try {
    (
      await fetch(`${garage}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/JSON',
        },
      })
    ).json();
    return true;
  } catch (error) {
    return false;
  }
};

export const toggleEngine = async (
  id: number,
  status: string,
): Promise<void> => {
  await fetch(`${engine}?id=${id}&status=${status}`);
};

export const startEngine = async (id: number): Promise<CarParam> => {
  (<HTMLElement>document.getElementById(`engine-${id}`)).setAttribute(
    'disabled',
    '',
  );
  const response = await fetch(`${engine}?id=${id}&status=started`);
  (<HTMLElement>document.getElementById(`resetCar-${id}`)).removeAttribute(
    'disabled',
  );
  return response.json();
};

export const stopEngine = async (id: number): Promise<void> => {
  (<HTMLElement>document.getElementById(`resetCar-${id}`)).setAttribute(
    'disabled',
    '',
  );
  await fetch(`${engine}?id=${id}&status=stoppeded`);
  (<HTMLElement>document.getElementById(`engine-${id}`)).removeAttribute(
    'disabled',
  );
};

export const drive = async (id: number): Promise<{ success: boolean }> => {
  const response = await fetch(`${engine}?id=${id}&status=drive`);
  return response.status !== 200
    ? { success: false }
    : { ...(await response.json()) };
};

export const getWinners = async (
  page: number,
  limit: number,
  sort: Sort = 'id',
  order: 'DESC' | 'ASC',
): Promise<GetsWinnerssResponse> => {
  try {
    const response = await fetch(
      `${winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
    );
    return {
      items: await response.json(),
      count: <string>response.headers.get('X-Total-Count'),
    };
  } catch (error) {
    return {
      items: [],
      count: '0',
    };
  }
};

export const getWinner = async (id: number): Promise<Winner> => (await fetch(`${winners}/${id}`)).json();

export const isInWinner = async (id: number): Promise<number> => (await fetch(`${winners}/${id}`)).status;

export const createWinner = async (body: Winner): Promise<void> => {
  (
    await fetch(winners, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/JSON',
      },
    })
  ).json();
};

export const updateWinner = async (id: number, body: Winner): Promise<void> => {
  (
    await fetch(`${winners}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/JSON',
      },
    })
  ).json();
};

export const saveWinner = async (id: number, time: string): Promise<void> => {
  const status = await isInWinner(id);

  if (status === 404) {
    await createWinner({ id, wins: 1, time });
  } else {
    const winner = await getWinner(id);
    await updateWinner(id, {
      id,
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time,
    });
  }
};

export const deleteWinner = async (id: number): Promise<void> => {
  const status = await isInWinner(id);
  if (status !== 404) {
    await fetch(`${winners}/${id}`, { method: 'DELETE' });
  }
};

export const deleteCar = async (id: number): Promise<void> => {
  (await fetch(`${garage}/${id}`, { method: 'DELETE' })).json();
  await deleteWinner(id);
};
