import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Details from './pages/Details/Details';
import './styles.css';
import 'react-datepicker/dist/react-datepicker.css';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/details/:id" exact={true} component={Details} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
