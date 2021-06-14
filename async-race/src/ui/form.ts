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
        <button type="submit" class="btn btn-primary">Create</button>
      </form>
      <form id="formUpdateCar" class="form-create input-group-sm">
        <input
          type="text"
          class="form-control"
          id="updateCarName "
          placeholder="New car name"
          disabled
        />
        <input
          type="color"
          class="form-control form-control-color"
          id="ColorUpdate"
          value="#563d7c"
          title="Choose your color"
          disabled
        />
        <button type="submit" class="btn btn-primary" disabled>
          Update
        </button>
      </form>
      <div class = "btn-group"><button  id="startRace" type="button" class="btn btn-danger">Race</button>
      <button  id="resetRace" type="button" class="btn btn-info" disabled>Reset</button>
      <button  id="generateCars" type="button" class="btn btn-success">Generate Cars</button></div>

      `;
