# Online Store Management (Demo) - Angular + Tailwind CSS  

This is a demo project built using Angular and Tailwind CSS for the frontend, which connects to a backend API.  

## Setup Instructions  

### 1. Update API URL  
You need To run ASP.NET API in the Link Down Below 

The API base URL is defined in the `base.service.ts` file. Before running the project  you Need To  update the backend URL in this file.  

- you need to run .Net back-end API [link In github](https://github.com/mark701/BackEnd-NetAPi)  
- Open `src/app/services/base.service.ts`  
- Locate the `apiUrl` variable and update it with your backend URL  

```typescript
export class BaseService {
  protected apiUrl = 'http://your-LocalHost/api'; //Local Host of .Net API
}

```


This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.6.

## Development server

To start a local development server, run:

```bash
npm install  # Install dependencies  
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```
For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
