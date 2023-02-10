import "./App.scss";
import { Router } from "./routes/Router";
import { Provider } from 'react-redux'
import { store } from './store'
//bootstrapの設定}
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={ store }>
      <div className="App">
        <Router />
      </div>
    </Provider>
  );
}

export default App;
