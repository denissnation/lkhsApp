
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Regis from './pages/Regis'
import Lkhs from './pages/Lkhs'
import RegisAdm from './pages/RegisAdm'
import Alat from './pages/Alat'
import store from './redux/store'
import { Provider } from 'react-redux'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Verifikasi from "./pages/Verifikasi";
import VerifikasiRegis from "./pages/VerifikasiRegis";
import Json from "./pages/Json";
function App() {
  return (
    <Provider store={store}>

      <Router>
        <Routes>
          <Route path="/" element={<Regis />}></Route>
          <Route path="/lkhs" element={<Lkhs />}></Route>
          <Route path="/regadm" element={<RegisAdm />}></Route>
          <Route path="/alat" element={<Alat />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/verifikasi" element={<Verifikasi />}></Route>
          <Route path="/verify" element={<VerifikasiRegis />}></Route>
          <Route path="/json" element={<Json />}></Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
