import PictureCard from "./PictureCard";
import styled from "styled-components";

const Home = ({ feed, handleLikeUpdate }) => {
  return (
    <Feed>
      {feed.map((post) => {
        return (
          <PictureCard
            key={post.iduser_posts}
            post={post}
            handleLikeUpdate={handleLikeUpdate}
          />
        );
      })}
    </Feed>
  );
};

const Feed = styled.div`
  right: 150px;
  width: auto;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 0;
  margin-top: 120px;
  padding-bottom: 80px;
`;

export default Home;
