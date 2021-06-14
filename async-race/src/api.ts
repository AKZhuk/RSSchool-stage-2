import {
  Car, Winner, Sort, GetsCarsResponse,
} from './interfaces';

const baseUrl: RequestInfo = 'http://127.0.0.1:3000';
const garage: RequestInfo = `${baseUrl}/garage`;
const engine: RequestInfo = `${baseUrl}/engine`;
const winners: RequestInfo = `${baseUrl}/winners`;

export const getCars = async (
  page: number,
  limit: number,
): Promise<GetsCarsResponse> => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  return {
    items: await response.json(),
    count: <string>response.headers.get('X-Total-Count'),
  };
};

export const getAllCars = async (): Promise<GetsCarsResponse> => {
  const response = await fetch(`${garage}?`);
  return {
    items: await response.json(),
    count: <string>response.headers.get('X-Total-Count'),
  };
};

export const getCar = async (id: number): Promise<Car> => (await fetch(`${garage}/${id}`)).json();

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

export const toggleEngine = async (id: number, status: string) => {
  const response = await fetch(`${engine}?id=${id}&status=${status}`);
  return response.json();
};

export const startEngine = async (id: number) => {
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

export const stopEngine = async (id: number) => {
  (<HTMLElement>document.getElementById(`resetCar-${id}`)).setAttribute(
    'disabled',
    '',
  );
  const response = await fetch(`${engine}?id=${id}&status=stoppeded`);
  (<HTMLElement>document.getElementById(`engine-${id}`)).removeAttribute(
    'disabled',
  );
  return response.json();
};

export const drive = async (id: number): Promise<any> => {
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
) => {
  const response = await fetch(
    `${winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
  );
  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count'),
  };
};

export const getWinner = async (id: number): Promise<Winner> => (await fetch(`${winners}/${id}`)).json();

export const isInWinner = async (id: number) => fetch(`${winners}/${id}`)
  .then((response) => response.status)
  .catch((err) => {
    throw new Error(`not in winner, ${err}`);
  });

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
