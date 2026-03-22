import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Events from './pages/Events';
import Offerings from './pages/Offerings';
import Attendance from './pages/Attendance';
import Prayers from './pages/Prayers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="members" element={<Members />} />
          <Route path="events" element={<Events />} />
          <Route path="offerings" element={<Offerings />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="prayers" element={<Prayers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;