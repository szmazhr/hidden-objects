import Favorite from '@mui/icons-material/Favorite';
import GitHub from '@mui/icons-material/GitHub';

const project = 'hidden-objects'; // change in every project

function Footer() {
  return (
    <footer className="main-footer">
      <FooterText />
      <FooterIcons />
    </footer>
  );
}

export default Footer;

/* ------------- Local Components -------------*/

const name = 'Shahzar Mazhar';
const username = 'szmazhr';
const profileLink = `https://github.com/${username}`;

function FooterText() {
  return (
    <div className="footer-text">
      <p>
        Made with
        <Favorite color="error" />
        by
        <a href={profileLink}>{name}</a>
      </p>
    </div>
  );
}

function FooterIcons() {
  return (
    <div className="footer-icons">
      <a href={`${profileLink}/${project}`}>
        <GitHub />
      </a>
    </div>
  );
}
