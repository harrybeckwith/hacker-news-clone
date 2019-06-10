This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Start the project

### `npm intall`

Run npm install in the root of the project to install node modules.

### `npm start`

Run npm start in the root of the project to star the project.

### overview

To get the hackernews api data, axios is used to fetch and store the ids. Once the id's are available within the state, another call using axios is used which loops through the ids and passes them so the new stories can be retrieved. The newsItem component gets passed the news stories and is looped over to create each news story from the state. More can be clicked to move through the data up until the max number of stories.
