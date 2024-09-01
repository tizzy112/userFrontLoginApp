import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import "./App.css";
import {
  SignupForm,
  LoginForm,
  PasswordResetForm,
  LogoutButton,
  useUserfront,
} from "@userfront/react";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/reset">Password Reset</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<PasswordReset />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <h1>Welcome to Home</h1>
    <SignupForm />
  </div>
);

const Login = () => (
  <div>
    <h1>Welcome to Login</h1>
    <LoginForm />
  </div>
);

const PasswordReset = () => (
  <div>
    <h1>Welcome to Password Reset</h1>
    <PasswordResetForm />
  </div>
);

const Dashboard = () => {
  const [privateData, setPrivateData] = useState<{
    someSecretData: string;
  }>();
  const { accessToken, isAuthenticated, logout } = useUserfront();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:3010/data", {
          headers: {
            Authorization: `Bearer ${accessToken()}`,
          },
        });
        const result = await response.json();
        setPrivateData(result);
      } catch (error) {
        console.error("Error fetching private data:", error);
      }
    })();
  }, [accessToken]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const getUserData = () => {
    if (accessToken()) {
      try {
        const tokenParts = accessToken().split(".");
        if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]));
          return payload;
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    return null;
  };

  const userData = getUserData();

  return (
    <div>
      <h2>Welcome to Dashboard</h2>
      <h3>User Data</h3>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
      <h3>Private Data</h3>
      <pre>{JSON.stringify(privateData, null, 2)}</pre>
      <LogoutButton onClick={logout} />
    </div>
  );
};

export default App;
