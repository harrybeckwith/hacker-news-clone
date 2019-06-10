import React from "react";
import "./styles/App.scss";
import NewsItem from "./components/NewsItem";
import axios from "axios";

class App extends React.Component {
  state = {
    newsIds: [],
    stories: [],
    newsStart: 0,
    newsEnd: 30,
    counter: 0
  };

  componentDidMount() {
    // gather story ids
    // call to get new stories with ids passed in
    axios
      .get(`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`)
      .then(res => {
        const newsIds = res.data;
        this.setState({ newsIds });
        this.getStories(this.state.newsIds);
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  getStories = storyId => {
    // pass in storie id
    // call to api with ids
    // update state with new stories
    const stories = [];

    for (let i = 0; i < storyId.length; i++) {
      axios
        .get(
          `https://hacker-news.firebaseio.com/v0/item/${
            storyId[i]
          }.json?print=pretty`
        )

        .then(res => {
          const newsTop = res.data;

          stories.push(newsTop);

          this.setState({
            stories
          });
        })
        .catch(error => console.error(error));
    }
  };

  loadMore = () => {
    const totalItems = this.state.stories.length;
    let newsStart = this.state.newsStart;
    let newsEnd = this.state.newsEnd;
    const perPage = 30;
    let counter = this.state.counter;

    // calc number pages
    const totalPages = Math.floor(totalItems / perPage);

    this.setState({
      counter: counter + 1
    });

    // check more btn total clicks
    // update range of stories to show
    if (counter < totalPages) {
      newsStart += perPage + 1;
      newsEnd += perPage + 1;

      this.setState({
        newsStart,
        newsEnd
      });
    } else {
      // end reached - reset to start
      this.setState({
        newsStart: 0,
        newsEnd: perPage,
        counter: 0
      });
    }
  };

  render() {
    // get section of stories
    const indexOfStories = this.state.stories.slice(
      this.state.newsStart,
      this.state.newsEnd
    );
    // loop through stories
    // pass data to child
    // keep track of index for story count
    let count = this.state.newsStart - 1;
    const news = Object.keys(indexOfStories).map(
      (item, index) => (
        count++,
        <NewsItem newsInfo={indexOfStories[item]} key={index} index={count} />
      )
    );

    return (
      <div className="top-stories">
        <div className="top-stories__header">
          <h2 className="top-stories__header__title">Hacker News</h2>
        </div>
        <div className="top-stories__news">{news}</div>
        <div className="top-stories__more" onClick={this.loadMore}>
          More
        </div>
      </div>
    );
  }
}

export default App;
