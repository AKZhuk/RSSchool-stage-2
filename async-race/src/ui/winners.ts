export const renderWinners = (): string => `
<table class="table table-striped table-sm">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Car</th>
      <th scope="col">Name</th>
      <th scope="col" class="sort" data-sort="wins">Wins</th>
      <th scope="col" class="sort" data-sort="time">Time</th>
    </tr>
  </thead>
  <tbody class="table-result">
  </tbody>
</table>`;
