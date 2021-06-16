export const renderForm = (): string => `
  <form id="formCreateCar" class="form-create input-group-sm">
    <input type="text" class="form-control"
      id="inputCarName" placeholder="Car name"
      required/>
    <input type="color" class="form-control form-control-color"
      id="ColorInput" value="#563d7c"
      title="Choose your color"
      required
    />
    <button id="buttonCreate" type="submit" class="btn btn-primary">Create</button>
  </form>
  <form id="formUpdateCar" class="form-create input-group-sm">
    <input
      type="text"
      class="form-control"
      id="updateName"
      placeholder="New car name"
      disabled
    />
    <input
      type="color"
      class="form-control form-control-color"
      id="updateColor"
      value="#563d7c"
      title="Choose your color"
      disabled
    />
    <button type="submit" class="btn btn-primary" disabled>
      Update
    </button>
  </form>
  <div class = "btn-group garage__control"></div>
  `;
