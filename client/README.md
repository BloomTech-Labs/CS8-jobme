# General Guidelines
===

* Run ```npm start``` while running the server to test with hot reloading

* Run ```npm build``` to have server host files and see an enviornment similar to production

# React Guidelines
===

* Class components should be written as ```Class App extends Component``` not ```Class App extends react.Component```
  * ```{ Component }``` should be imported to avoid this)

* Containers should hold components, they should be the main routes and their purpose is to "contain" components/act as general views:
  * Generally ccontainers will display components according to the store ex: a card *container* will display a jobseeker or employer card *component* depending on user login status.

* Smaller Functionailty/logic should be kept to components whenever possible.

* Components should do as *little* as possible. If a component is doing two separate things, it should be broken up into smaller components.

* Any action that has a SUCCESSFUL & ERROR version, should have a LOADING/IN_PROGESS action type specific to it:
  * ex: USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, USER_LOGIN_LOADING

# Styling Guidelines
===

* Component styling should be done in `components/styles` as styled-components.
  Example: `components/styles/profileStyles.js` is where profile specific styles go
  Format: ````export const CreditsContainer = [styled.div || Container.extend]`
                min-width: 400px;
                max-width: 800px;
                width: 100%;
                display: flex;
                flex-direction: row;
              `;```

* Check global styles in `components/styles/globalStyles.js` before creating new one.
  This way we won't have to update several files every time there is a style change.

* All styling should originate from `component/styles/index.js`
