import React, { useState } from "react";
import { Card, Image } from "semantic-ui-react";
import Heart from "react-animated-heart";

const PictureCard = ({ post }) => {
  let clickcount = post.likeCount;
  const [isClick, setClick] = useState(false);
  const [count, setCount] = useState(clickcount);

  function handleClick() {
    if (isClick) return;
    setCount((previousCount) => previousCount + 1);
    setClick(!isClick);
  }

  return (
    <Card className="Card">
      <Image src={post.image} wrapped ui={false} />
      <Card.Content className="CardContent">
        <Card.Header>{post.title}</Card.Header>
        <Card.Meta>{post.author}</Card.Meta>
        <Card.Meta>{post.datePosted}</Card.Meta>
        <div className="Appz">
          <p className="Counter">{count}</p>
          <Heart
            className="Heart"
            isClick={isClick}
            onClick={() => {
              console.log("button");
              handleClick();
            }}
          />
        </div>
      </Card.Content>
    </Card>
  );
};

export default PictureCard;
