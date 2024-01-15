import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const githubLink = "https://github.com/Valx01P";

  return (
    <footer className="bg-black p-4 text-white text-center">
      <p>&copy; {currentYear} T-STONK PLAYS</p>
      <p>
        Code available on{" "}
        <a
          href={githubLink}
          className="text-red-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
};

export default Footer;
