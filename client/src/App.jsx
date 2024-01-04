import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Form from "./Form";
import Error from "./Error";
import Auth from "./Auth";
import AuthMain from "./AuthMain";
function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/auth" element={<AuthMain />}>
          <Route index element={<Auth mode="signIn" />} />
          <Route path="signin" element={<Auth mode="signIn" />} />
          <Route path="signup" element={<Auth mode="signUp" />} />
        </Route>
        <Route path="/MongoDb" element={<Form />} errorElement={<Error />} />
        <Route path="/PSQL" element={<Form />} />
        <Route path="/Firestore" element={<Form />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
