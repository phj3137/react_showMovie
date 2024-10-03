import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setLoading(false);
    setDetail(json.data.movie);
  };
  console.log(detail);
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <img src={detail.large_cover_image} />
          <h1>{detail.title_long}</h1>
          <h2>
            Genre:{" "}
            {detail.genres.map((g) => (
              <li>{g}</li>
            ))}
          </h2>
          <p> Like count 👍: {detail.like_count}</p>
          <p> Rating ⭐: {detail.rating}</p>
          <h3>{detail.description_full}</h3>
        </div>
      )}
    </div>
  );
}
export default Detail;
