import { Route, Routes } from "react-router-dom";
import "./App.css";
import Clothes from "./pages/Clothes";
import Styles from "./pages/Styles";
import Favorites from "./pages/Favorites";
import Share from "./pages/Share";
import Profile from "./pages/Profile";
import { MobileView } from "react-device-detect";

function App() {
  return (
    <div className="App">
      <MobileView>
        MobileView <hr></hr>
        <Routes>
          <Route path="/clothes" component={Clothes} />
          <Route path="/styles" component={Styles} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/share" component={Share} />
          <Route path="/profiles" component={Profile} />
        </Routes>
      </MobileView>
    </div>
  );
}

export default App;
