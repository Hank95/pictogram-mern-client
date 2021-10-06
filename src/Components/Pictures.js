import PictureCard from "./PictureCard";
import { Button } from "semantic-ui-react";
const Pictures = ({ feed, userInside, handleDelete }) => {
  const filteredPosts = feed.filter((post) => post.author === userInside);

  return (
    <div className="myPicList">
      <h1>My Art</h1>
      {filteredPosts.map((pic) => {
        console.log(pic);
        return (
          <div>
            <Button
              className="discard"
              onClick={
                pic.author === userInside
                  ? () => handleDelete(pic.iduser_posts)
                  : null
              }
            >
              Discard
            </Button>
            <PictureCard post={pic} />
          </div>
        );
      })}
    </div>
  );
};

export default Pictures;
