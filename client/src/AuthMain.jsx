import { Outlet } from "react-router-dom";

const AuthMain = () => {
  return (
    <div>
      <h1 style={{ color: "purple" }}>AuthMain</h1>
      <Outlet />
    </div>
  );
};

export default AuthMain;
