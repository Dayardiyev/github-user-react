import { useEffect, useState } from "react";

import "./index.css";

const API = "https://api.github.com/users/";

const Profiles = ({
  login,
  name,
  avatar_url,
  public_repos,
  location,
  bio,
  created_at,
  followers,
  following,
  blog,
  html_url,
  company,
}) => {
  let date = new Date(created_at);

  return (
    <>
      <div className="item">
        <div className="item-img">
          <img src={avatar_url} alt="" />
        </div>
        <div className="item-info">
          <div className="title">
            <h2>{name}</h2>{" "}
            <span>
              Joined:{" "}
              {created_at
                ? date.toDateString().slice(4, created_at.length)
                : ""}
            </span>
          </div>
          <a href={html_url} className="login" target="_blank" rel="noreferrer">
            @{login}
          </a>
          <p className="bio">{bio}</p>
          <div className="repo-info">
            <div>
              <p>Repos</p> <span>{public_repos}</span>
            </div>
            <div>
              <p>Followers</p> <span>{followers}</span>
            </div>
            <div>
              <p>Following</p> <span>{following}</span>
            </div>
          </div>
          <p>{location ? "Location: " + location : ""}</p>
          <a href={blog} target="_blank" rel="noreferrer" className="link">
            {blog ? blog : ""}
          </a>
        </div>
      </div>
    </>
  );
};

function App() {
  const [profile, setProfile] = useState([]);
  const [searchTerm, setSearchTerm] = useState();

  useEffect(() => {
    fetch(API + "dayardiyev")
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const searchProfile = (url) => {
    fetch(url + searchTerm)
      .then((res) => res.json())
      .then((data) => {
        if (searchTerm.length > 0) {
          setProfile(data);
        }
        return;
      })
      .catch((err) => console.log(err));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    searchProfile(API);
    console.log();
    setSearchTerm("");
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="wrapper">
        <form onSubmit={handleOnSubmit}>
          <input
            placeholder="Search Github Username..."
            type="text"
            value={searchTerm}
            onChange={handleOnChange}
          />
          <button type="submit">Search</button>
        </form>
        <Profiles key={profile.id} {...profile} />
      </div>
    </>
  );
}

export default App;
