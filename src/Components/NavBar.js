import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
const NavBar = ({ user, handleLogout }) => {
  return (
    <Bar>
      <Link to="/">
        {/* <Icon name="camera" /> */}
        <Logo>pictogram</Logo>
      </Link>
      <Welcome>Welcome {user}</Welcome>
      <Nav>
        <Button as={NavLink} to="/">
          Home
        </Button>
        <Button as={NavLink} to="/sketch-pad">
          Sketch Pad
        </Button>
        <Button as={NavLink} to="/my-sketchs">
          My Sketches
        </Button>
        <Button onClick={handleLogout}>Log Out</Button>
      </Nav>
    </Bar>
  );
};

const Bar = styled.div`
  background: linear-gradient(
    40deg,
    #f17c58,
    #e94584,
    #985eb9,
    #24aadb,
    #27dbb1,
    #ffdc18,
    #b4c00c,
    #ff3706
  );
  background-size: 1000% 100%;
  animation: gradient 20s linear infinite;
  animation-direction: alternate;
  background-repeat: repeat;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 10px;
  border-bottom: solid;
  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 2rem;
  display: flex;
  flex-direction: row;
  margin-left: 10%;
  align-self: center;
`;
const Nav = styled.nav`
  align-items: center;
  display: flex;
  flex-direction: row;
`;
const Button = styled.div`
  border: solid black 2px;
  border-radius: 50px;
  padding: 1rem;
  text-align: center;
  color: black;
  font-size: 1.2rem;
  &:hover {
    color: orangered;
  }
`;
const Welcome = styled.div`
  font-size: 1rem;
  margin-left: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

export default NavBar;
