import '../css/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <h4>Copyright © 2026 Movie Library</h4>
      <p>Data from 
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          The Movie Database
        </a>
      </p>
    </footer>
  );
}

export default Footer;
