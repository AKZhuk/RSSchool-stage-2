import { Car } from './interfaces';

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

export const getCar = async (id: number) => (await fetch(`${garage}/${id}`)).json();

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
};

export const toggleEngine = async (id: number, status: string) => {
  const response = await fetch(`${engine}?id=${id}&status=${status}`);
  return response.json();
};

export const enableDriveMode = async (id: number) => {
  await fetch(`${engine}?id=${id}$status='drive'`);
};
