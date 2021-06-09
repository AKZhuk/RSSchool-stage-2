import { state } from '.';
import { Car, Winner } from './interfaces';

const baseUrl: RequestInfo = 'http://127.0.0.1:3000';
const garage: RequestInfo = `${baseUrl}/garage`;
const engine: RequestInfo = `${baseUrl}/engine`;
const winners: RequestInfo = `${baseUrl}/winners`;
export const getCars = async (page: number, limit: number) => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count'),
  };
};

export const getCar = async (id: number) =>
  (await fetch(`${garage}/${id}`)).json();

export const createCar = async (body: Car): Promise<void> => {
  (
    await fetch(garage, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/JSON',
      },
    })
  ).json();
};

export const updateCar = async (id: number, body: Car): Promise<void> => {
  (
    await fetch(`${garage}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/JSON',
      },
    })
  ).json();
};

export const deleteCar = async (id: number): Promise<void> => {
  (await fetch(`${garage}/${id}`, { method: 'DELETE' })).json();
  await deleteWinner(id);
};

export const toggleEngine = async (id: number, status: string) => {
  const response = await fetch(`${engine}?id=${id}&status=${status}`);
  return response.json();
};

export const drive = async (id: number) => {
  const response = await fetch(`${engine}?id=${id}&status=drive`).catch();
  return response.status !== 200
    ? { success: false }
    : { ...(await response.json()) };
};

export const getWinners = async (
  page: number,
  limit: number,
  sort: 'id' | 'wins' | 'time' = 'id'
) => {
  const response = await fetch(
    `${winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=ASC`
  );
  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count'),
  };
};

export const getWinner = async (id: number) =>
  (await fetch(`${winners}/${id}`)).json();

export const isInWinner = async (id: number) =>
  (await fetch(`${winners}/${id}`)).status;

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

export const saveWinner = async (id: number, time: string) => {
  const status = await isInWinner(id);

  if (status === 404) {
    await createWinner({ id: id, wins: 1, time: time });
  } else {
    const winner = await getWinner(id);
    await updateWinner(id, {
      id: id,
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time,
    });
  }
};

export const deleteWinner = async (id: number) => {
  const status = await isInWinner(id);
  if (status != 404) {
    await fetch(`${winners}/${id}`, { method: 'DELETE' });
  }
};
