# Offer configurator for telecommunications service provider company

## Introduction

The configurator guides the user through two steps in which the user selects the services he is interested in and the duration of the contract.

Based on the collected information, the algorithm prepares the most favorable offer, which in the third step presents the user with monthly subscription costs for the selected years.

The user can return to the previous steps at any time, adjusting the criteria of the offer. Then the algorithm will process the information again and propose a new offer taking into account the current criteria.

## Launching the application

The application uses the _pnpm_ package manager. Alternatively, any other e.g. _npm_, _yarn_ etc... can be used for installation and launch.

Dependency installation:

```bash
pnpm install

```

Running the application:

```bash
pnpm run dev
```

Launching the Storybook environment:

```bash
pnpm run storybook

```

## Technologies used

- React
- Vite
- TypeScript
- Styled Components
- Redux
- React Feather
- Mock Service Worker
- Storybook

## Roadmap

- May 5:
  - [x] problem analysis
  - [x] mock-up preparation - [Figma](https://www.figma.com/file/2kv37BvNj3hucj2qLP23fn)
  - [x] project preparation: installation of libraries and configuration
  - [x] data set preparation
- May 6:
  - [x] preparation of components
- May 7 - 10
  - [x] application development
- May 11:
  - [x] testing
  - [x] fixes

## Algorithm to find the most advantageous offer

1. Based on the selected services, compose all the possible offers:
   - from services alone,
   - from a combination of packages and services.
2. For each offer in the pool, add up the monthly subscription costs on a scale of selected years.
3. Add up the monthly costs over the years. <br />
   The sums obtained are **criteria in the evaluation of the favorability** of a given offer.
4. Select the minimum among the obtained criteria. <br />
   The bid represented by the **least criterion** is the **most advantageous offer**.

```

```
