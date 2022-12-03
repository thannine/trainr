import './App.css';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import Statistics from './components/Statistics';
import {  BrowserRouter,  Routes,  Route,  Link} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/customers">Customers</Link>{' '}
        <Link to="/trainings">Trainings</Link>{' '}
        <Link to="/calendar">Calendar</Link>{' '}
        <Link to="/statistics">Statistics</Link>{' '}
        <Routes>
          <Route exact path="/customers" element={<CustomerList />} />
          <Route exact path="/trainings" element={<TrainingList calendar={false} />} />
          <Route exact path="/calendar" element={<TrainingList calendar={true} />} />
          <Route exact path="/statistics" element={<Statistics />} />
          <Route path="*" element={<CustomerList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
