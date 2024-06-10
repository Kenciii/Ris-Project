import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './index.css';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const history = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [location]);

  const logout = () => {
    localStorage.clear();
    history("/");
  };


  return (
    <nav className="navbar navbar-expand-lg" style={{background: '#FFD700'}}>
      <div className="container-fluid">
        <span
          className="navbar-brand"
          style={{ cursor: "pointer" }}
          onClick={() => {
            user ? history("/home") : history("/");
          }}
        >
          <div className="navbar-logo">
            <img src="img/Logo.png" alt="Mobilko" className="custom-logo"/>
          </div>
        </span>
        <div>
          {user?.role === "admin" && (
            <>
              <button
                className="btn btn-outline-primary"
                onClick={() => {
                  history("/users");
                }}
              >
                Edit Users
              </button>
              <button
                className="btn btn-outline-primary mx-2"
                onClick={() => {
                  history("/home/add");
                }}
              >
                Add Mobile
              </button>
            </>
          )}

          {!user ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                history("/");
              }}
            >
              LOG IN
            </button>
          ) : (
            <button type="button" className="btn btn-danger" onClick={logout}>
              LOG OUT
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
