import "./listItem.scss";
import { useEffect,useState } from "react";
import axios from "axios";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";


export default function ListItem({ index ,item}) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  // const trailer =
  // "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
  useEffect(()=>{
    const getMovie=async()=>{
      try{
        const res = await axios.get("/movies/find/"+item ,{ 
          headers:{
            token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWY2Nzk5YzM0YTE2ZDFmMDg5NGUyYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4NTcxMDE0NSwiZXhwIjoxNjg2MTQyMTQ1fQ.MKLRT6C2mvKv7Ofadz5noATB3S8cOaGSgdkCZ1VcUj4"
          },
        });
        setMovie(res.data);
        
      }catch(err){
        console.log(err)
      }
    };
    getMovie()
  },[item]);
  return (
    <Link to ={{pathname: "/watch",movie:movie}}>
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={movie.img}
        alt=""
      />
      {isHovered && (
        <>
          <video src={movie.trailer} autoPlay={true} loop />
          <div className="itemInfo">
            <div className="icons">
              <PlayArrow className="icon" />
              <Add className="icon" />
              <ThumbUpAltOutlined className="icon" />
              <ThumbDownOutlined className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>{movie.duration}</span>
              <span className="limit">+{movie.limit}</span>
              <span>{movie.year}</span>
            </div>
            <div className="desc">
              {movie.desc}
            </div>
            <div className="genre">{movie.genre}</div>
          </div>
        </>
      )}
    </div>
    </Link>
  );
}
