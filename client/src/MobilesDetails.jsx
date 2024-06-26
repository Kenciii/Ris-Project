
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const MobilesDetails = () => {
  const [mobiles, setMobiles] = useState({});
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState("");
  const { id } = useParams();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")) || {});
  }, [location]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/mobiles/${id}`);
        setMobiles(response.data[0]);

        const com = await axios.get(`http://localhost:8081/mobiles/comments/${id}`);
        setComments(com.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);

  const postComment = async (e) => {
    e.preventDefault();
    const data = {
      comment: formData,
      userId: user.id,
      mobilesId: id,
    };

    await axios.post(`http://localhost:8081/mobiles/comments`, data);

    const com = await axios.get(`http://localhost:8081/mobiles/comments/${id}`);
    setComments(com.data);

    setFormData("");
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <h1 className="my-4">{mobiles.title}</h1>
          <h2>{mobiles.price}</h2>
          <img className="img-fluid" src={`/${mobiles.imageURL}`} alt="" />
        </div>

        <div className="col-md-6">
          <div className="travel-summary">
            <h3 className="my-3">Mobile summary</h3>
            <p>{mobiles.description}</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="comments-section mt-4">
            <h3 className="my-3">Comments</h3>
            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment">
                  {user.role === "admin" && (
                    <button
                      className="btn btn-danger delete-btn"
                      onClick={async () => {
                        await axios.delete(`http://localhost:8081/mobiles/comments/${comment.id}`);
                        const com = await axios.get(
                          `http://localhost:8081/mobiles/comments/${id}`
                        );
                        setComments(com.data);
                      }}
                    >
                      &#10060;
                    </button>
                  )}
                  <p>
                    <b>{comment.username}:</b> {comment.comment}
                  </p>
                </div>
              ))}
            </div>

            {user.role === "user" && (
              <form onSubmit={postComment} className="mt-3">
                <input 
                  type="text"
                  value={formData}
                  onChange={(e) => setFormData(e.target.value)}
                  placeholder="Add Comment"
                />
                <button className="btn btn-secondary m-3" type="submit">
                  Submit Comment
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilesDetails;
