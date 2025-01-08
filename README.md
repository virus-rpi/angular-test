# Angular Test

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.3.
The code is based on the angular tutorial from the official docs.
I use this project to learn Angular.

## Development server

To start a local development server, run:

```bash
json-server --watch db.json
```
```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Added beyond the tutorial

- More filters
- Favorite button (saves state with `@ngrx/store`)
- Improved the house card UX (whole card is clickable)
- Added life views counter (saves state in `json-server` and uses a service to subscribe to an observable)
- Added input validation to the form on the detail page
- Added a test page
  - Added small angular animation test
  - Added alternative view for the house list (using `ag-grid-angular`)
  - Added custom field to the `ag-grid` table for the favorite button (including posibity to sort and filter by favorite)
  - Made custom field for the location combining city and state

## Screenshots
![image](https://github.com/user-attachments/assets/ff9ac513-69c1-413f-a45d-205e4b79fbb8)
![image](https://github.com/user-attachments/assets/b6fb2e2f-e904-4636-afaf-15e15b1f95a0)
![image](https://github.com/user-attachments/assets/df95f7d9-69d0-4a4b-95be-f99b9af831b4)

