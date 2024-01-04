import "./App.css";
import { Link, Outlet } from "react-router-dom";
export default function Home() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Outlet />
      <Link to="/auth">
        <button>Login</button>
      </Link>
      <Link to="/MongoDb">
        <button style={{ margin: 30, height: 150, width: 150 }}>MongoDB</button>
      </Link>
      <Link to="/PSQL">
        <button style={{ margin: 30, height: 150, width: 150 }}>
          PostgreSql
        </button>
      </Link>
      <Link to="/Firestore">
        <button style={{ margin: 30, height: 150, width: 150 }}>
          CloudFirestore
        </button>
      </Link>
    </div>
  );
}
