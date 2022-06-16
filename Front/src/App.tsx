import MyRoutes from "./routes";
import "./globals/style";
import { Provider } from "react-redux";
import { store }  from "./store";

function App() {

  return (
    <Provider store={store}>
    <MyRoutes />
    </Provider>
  );
};

export default App