import React from "react";
import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Navbar className="bg-gray-800 sticky top-0 text-white bg-opacity-90" fluid>
      <Navbar.Brand href="https://ashabb.netlify.app/">
        <img
          src="/FoodieeDelight.png"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold">
          FOODIEDELIGHT
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar className="bg-opacity-0 bg-gray-800">
          <Link to={"./"}>Home</Link>
        </Navbar>
        <Navbar className="bg-opacity-0 bg-gray-800">
          <Link to={"./add"}>Add</Link>
        </Navbar>
        <Navbar className="bg-opacity-0 bg-gray-800">
          <Link to={"./report"}>Report</Link>
        </Navbar>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
