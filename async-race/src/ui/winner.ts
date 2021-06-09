import { renderCarImage } from './carImage';
import { Car, Winner } from '../interfaces';

export const renderWinner = (winner: Winner, car: Car): string => `
    <tr>
      <th scope="row">1</th>
      <td>${renderCarImage(car)}</td>
      <td>${car.name}</td>
      <td>${winner.wins}</td>
      <td>${winner.time}</td>
    </tr>
`;
