import React from "react";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-black p-4 flex items-center justify-between fixed w-full top-0 z-10">
      <h1 className="text-white text-2xl font-bold hover:text-blue-500 transition duration-1000">
        <a href="/">T-STONK PLAYS</a>
      </h1>
      <ul className="flex space-x-12 mr-20">
        <li>
          <a
            href="/"
            className="text-white text-lg hover:text-blue-500 transition duration-1000"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/about"
            className="text-white text-lg hover:text-blue-500 transition duration-1000"
          >
            About
          </a>
        </li>
        {/* <li>
          <a
            href="/buy-the-dip-calculator"
            className="text-white text-lg hover:text-blue-500 transition duration-1000"
          >
            BTD-Calc
          </a>
        </li> */}
      </ul>
    </nav>
  );
};

export default NavBar;
