import './App.scss';
import HomePage from './pages/HomePage/HomePage';
import WatchListPage from './pages/WatchList/WatchListPage';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header'


export default function App() {
  return (
    <div className="App">
      <Header className="header" />
      {/* Use react-router-dom to manage dynamic routing between pages*/}
      <Switch>
        {/* Route - Renders a UI component by URL*/}
        <Route exact path='/' component={HomePage} />
        <Route path='/watchlist' component={WatchListPage} />
        <Route path='*' component={HomePage} />
      </Switch>
    </div>
  );
}