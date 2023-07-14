import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import UserList from './Components/UserList';
import CreateUser from './Components/CreateUser';
import ViewUser from './Components/ViewUser';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<UserList/>}></Route>
        <Route exact path="/add-user" element={<CreateUser/>}></Route>
        <Route exact path="/:id" element={<CreateUser/>}></Route>
        <Route exact path="users/:id" element={<ViewUser/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;