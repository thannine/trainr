import './App.css';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import {  BrowserRouter,  Routes,  Route,  Link} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/customers">Customers</Link>{' '}
        <Link to="/trainings">Trainings</Link>{' '}
        <Routes>
          <Route exact path="/customers" element={<CustomerList />} />
          <Route exact path="/trainings" element={<TrainingList />} />
          <Route path="*" element={<CustomerList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
