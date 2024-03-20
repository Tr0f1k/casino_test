# Kanon Gaming Test - Frontend

In this folder, you can find the frontend for solving the test assignment

## Stack

- React
- Redux
- React-Router
- TypeScript
- eslint and prettier

## Setup

This backend application was deployed on 'Vercel' cloud service and is accessible via this link: https://casino-test-pearl.vercel.app/ , so there is no need to set up anything to work with this application. But, if you want to try running the frontend locally, it is possible. In order to do so, you need to run usual commands for running a React app:

```
npm i --force
npm run start
```

### Explanation

Because of some version conflicts, you need to use the 'force' flag. Unfortunately, I was not able to resolve those exact dependency issues without losing functionality of my project.

## Description

To solve all three questions efficiently, I have decided to make two separate pages for each of them. Solution for question 1 and 2 can be found on '/gamelist' page, and solution for question 3 can be found on '/slot' page. In order to achieve this page separation, I have utilised React-Router. On my last day of working with this project, I have decided to add additional functionality that was not listed in the requirements but sounded reasonable to have in such application. I will go over my additions at each component description 

## Project Structure

- src
  - components
    - GameList
      - GameCard
      - SearchBar
      - GameList
      - GameListSlice
    - Shared
      - AppNavBar
      - AppTitle
    - Slot
      - RewardList
      - SpinLogic
      - Slot
      - SlotSlice
    - Store
  - img
  - App
  - Index

## Shared

'Shared' folder contains components that I import on both of my pages. 'AppNavBar' component is responsible for the buttons used to navigate from one page to another, and 'AppTitle' is responsible for outputting the title of the page by passing the desired title as a prop

### Additions

Both of these components were not listed as requirements, but it makes sense to have them in this application based on my approach, because it is easier and more optimal to import the same component twice rather than writing the same code twice

## GameList

'GameList' folder contains solution to the first two questions from the assignment. In the parent component of the page ('GameList'), alongside imports from the 'Shared' folder, the imported 'GameCard' component displays all the game data fetched from the backend, and the imported 'SearchBar' component handles the search functionality. 'GameListSlice' component is used for Redux state management.

### Additions

- A placeholder picture in case if the game does not have a 'thumb.url' property
- Ability to access the game by pressing on its' card if it has a 'startUrl' property (These game cards have green background instead of brown)
- Very basic styling

## Slot

'Slot' folder contains solution for the third question from the assignment. In the parent component of the page ('Slot'), alongside imports from the 'Shared' folder, the imported 'SpinLogic' component displays results of the spin, amount of coins that user won, and the amount of coins that user currently has, and the imported 'RewardList' component displays basic rules of the game and which combinations reward the user. 'SlotSlice' component is used for Redux state management.

### Additions

- Outputting the spin result as pictures of corresponding fruits
- In case if user runs out of coins, the 'Add Coins' button will appear and user can get extra 20 coins (I am aware that in the real online casino you have to pay money to get extra coins, but it is still possible, so I've decided to add this)
- List with all combinations that result in a coin reward
- Very basic styling

## img

'img' folder contains five images that are used on the frontend: four png's of fruits used in SpinLogic and a placeholder for the game picture that says 'No Image Found'