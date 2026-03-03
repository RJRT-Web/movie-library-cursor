import '../css/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>Copyright © 2026 Movie Library</p>
      <span>Data from </span>
      <a
        href="https://www.themoviedb.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        The Movie Database
      </a>
    </footer>
  );
}

export default Footer;
