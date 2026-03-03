import '../css/Banner.css';

interface BannerProps {
  children?: React.ReactNode;
}

function Banner({ children }: BannerProps) {
  return (
    <header className="banner">
      <div className="banner__marquee">
        <div className="banner__marquee-inner">
          <h1 className="banner__brand">Movie Library</h1>
          <p className="banner__now">NOW SHOWING</p>
          <p className="banner__title">★ Popular Movies ★</p>
          <p className="banner__desc">Browse & discover from The Movie Database</p>
        </div>
      </div>
      {children}
    </header>
  );
}

export default Banner;
