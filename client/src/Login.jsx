import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import FAQ from "./FAQ";

const Home = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [mobiles, setMobiles] = useState([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [location]);

  useEffect(() => {
    const fetchMobiles = async () => {
      try {
        const response = await axios.get("http://localhost:8081/mobiles");
        setMobiles(response.data);
        setResults(response.data); 
      } catch (error) {
        console.log(error);
      }
    };
    fetchMobiles();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === '') {
      setResults(mobiles); 
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8081/mobiles/search?q=${query}`);
      console.log('Search results:', response.data); 
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteMobile = async (id) => {
    await axios.delete(`http://localhost:8081/mobiles/${id}`);
    const updatedMobiles = mobiles.filter((mobile) => mobile.id !== id);
    setMobiles(updatedMobiles);
    setResults(updatedMobiles);
  };

  const renderMobiles = () => {
    return results.map((mobile) => (
      <div key={mobile.id} className="col-4 mb-3">
        <div className="card shadow-lg">
          <img
            src={mobile.imageURL}
            className="card-img-top"
            style={{ height: "300px", cursor: "pointer" }}
            alt="..."
            onClick={() => history(`/home/${mobile.id}`)}
          />
          <div className="card-body">
            <h4 className="card-title">{mobile.title}</h4>
            <h4 className="card-title">{mobile.price}</h4>
            <div className="">
              {user?.role === "admin" && (
                <>
                  <button
                    className="btn btn-outline-primary buttons"
                    onClick={() => history(`/home/edit/${mobile.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteMobile(mobile.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };

    try {
      const user = await axios.post("http://localhost:8081/user/login", data);
      if (user.data.status === "aktivan") {
        localStorage.setItem("user", JSON.stringify(user.data));
        history("/home");
      } else {
        alert(
          "You are not an active user! Please contact admin to activate your account."
        );
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.log(error);
      alert("Incorrect username or password!");
    }
  };

  const handleReservationClick = () => {
    history('/reservation');
  };

  return (
    <>
      <div className="container mt-5 card shadow-lg" style={{border: '1px solid gray', backgroundColor: 'rgb(243, 240, 240)'}}>
        <div className="row">
          <div className="col-sm-8 col-md-6 col-lg-4 mx-auto my-auto">
            <div className="card rounded-3" style={{ opacity: 0.9, border: '2px solid #FFD700'}}>
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-4 fw-light fs-5">
                  Sign In
                </h5>
                <form onSubmit={submitForm}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingInput">Username...</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingPassword">Password...</label>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-1">
                      <button
                        className="btn btn-primary btn-login text-uppercase fw-bold w-100"
                        type="submit"
                      >
                        Sign in
                      </button>
                    </div>
                    <div className="col-md-6 mb-1">
                      <button
                        className="btn btn-primary btn-login text-uppercase fw-bold w-100"
                        onClick={() => history("/register")}
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div 
            style={{backgroundImage: `url('/img/background.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'right',
            height: '80vh',
            width: '50%',
          }}>
          </div>
        </div>
      </div>

      <div className="paragraph">
        <p>Most popular products</p>
      </div>
      
      <form onSubmit={handleSearch} className="search-form mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control rounded-pill"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products..."
          />
          <button type="submit" className="btn btn-primary ms-2 rounded-pill">Search</button>
        </div>
      </form>

      <div className="container mobiles w-75">
        <div className="row">
          {renderMobiles()}
        </div>
      </div>


      <div className="container  mt-5 p-5 d-flex flex-column align-items-center" style={{backgroundColor: "#0e10114f"}}>
            <h2 className="mb-4">Would you like to schedule a repair?</h2>
            <p className="mb-4">We are here to help you! Schedule your phone repair appointment with us.</p>
            <button
                className="btn btn-primary btn-lg"
                style={{ borderRadius: '20px', padding: '10px 30px', fontSize: '1.2rem', backgroundColor: '#007bff',  }}
                onClick={handleReservationClick}
            >
                Schedule
            </button>
        </div>

      <FAQ />

    </>
  );
};

export default Home;
