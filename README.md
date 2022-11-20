# Technical test for PhantomBuster

This project is my technical test for PhantomBuster which reproduces a part of the existing dashboard.

https://phantom-buster-technical-test.netlify.app/

Basic feature:
* TypeScript in strict mode
* Tailwind CSS for style
* Only Hooks for states management
* One unitary test
* Load payload like an external API call
* Categories filters
* View of phantoms
  
Bonus Feature: 
* LocalStorage persistance
* Page for detailed phantom
* Search
* Countdown before next auto-launch
* Drag and drop
  
Extra Feature (not asked but very funny):
* Modal
* Themes
* Spine loader
* Animations
* Layout
* Netlify deployment
  
 All bonus features are not perfect but I did my best in the time allotted :blush:  :family:

I set up a trello to distribute my progress :
https://trello.com/b/l9AcMc4z/phantom-buster

## Technologies

This project use :

* Create React App + TypeScript
* Prettier + Eslint setup with airbnb, typescript, tailwind and jest rules
* Tailwind CSS + DaisyUi plugin https://tailwindcss.com/ https://daisyui.com/
* Jest + React testing library https://testing-library.com/docs/react-testing-library/intro/
* DndKit for drag and drop https://dndkit.com/
* React router v6 https://reactrouter.com/en/main
* uuid for generate unique id
* pretty-print-ms for format of timers
  

## Setup

`npm i`

## Starting
`npm start`


## Directory Structure

The library are structured like :

* `src/components` all components
* `src/contexts/phantoms` context, provider, dispatch, reducer and types for phantoms
* `src/contexts/settings` context, provider, dispatch, reducer actions and types for settings (only theme for now)
* `src/data` mocked data
* `src/hooks` custom hooks
* `src/layouts` layout for each pages
* `src/pages` all pages of the app
* `src/router` browser router setup with routes and paths
* `src/style` globals style for inject tailwind

## Available Scripts

In the project directory, you can run:

`npm start`
`npm test`
`npm run build`
`npm run eject`
`npm run format`
`npm run lint`
