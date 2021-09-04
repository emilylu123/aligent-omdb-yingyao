import './App.scss';
// import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage/HomePage';
import WatchListPage from './pages/WatchList/WatchListPage';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header'


export default function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/watchlist' component={WatchListPage} />
      </Switch>
    </div>
  );
}