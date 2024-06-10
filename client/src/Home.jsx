import axios from "axios";
import { useEffect, useState } from "react";
import Mobiles from "./Mobiles";

const Home = () =>{
  const [mobiles, setMobile] = useState([]);

  useEffect(() =>{
    const getData = async () =>{
      try{
        const response = await axios.get("http://localhost:8081/mobiles");
        setMobile(response.data);
      }catch(error){
        console.log(error);
      }
    };
    getData();
  }, []);

  if(mobiles.length===0){
    return(
      <div className="mx-auto mt-5 text-center">
          No posts to show! Please contact admin to add post!
      </div>
    );
  }

  return (

    
    <div className="container m-auto row row-cols-1 row-cols-md-3 g-4 mt-2 w-100">
      {mobiles.map((n) =>(
        <div key={n.id}>
          <Mobiles data={n} />
        </div>
      ))}
    </div>
  );
};

export default Home;