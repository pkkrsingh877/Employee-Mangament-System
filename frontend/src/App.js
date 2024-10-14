import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Employee from './components/employees/Employee';
import CreateEmployee from './components/employees/CreateEmployee';
import EmployeesList from './components/employees/EmployeeList';
import UpdateEmployee from './components/employees/UpdateEmployee';
import NavbarComponent from './components/utilities/NabvarComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employees" element={<EmployeesList />} />
        <Route path="/employees/add" element={<CreateEmployee />} />
        <Route path="/employees/edit/:id" element={<UpdateEmployee />} />
        <Route path="/employees/:id" element={<Employee />} />
      </Routes>
    </Router>
  );
}

export default App;
