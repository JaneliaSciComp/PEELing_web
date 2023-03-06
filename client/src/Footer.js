import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import './Footer.css'


export default function Footer() {
  return (
    <footer className="footer">
      <a className='link'><GitHubIcon fontSize='small'/>&nbsp;Github</a>
      <p className='mb-0 pb-1'>v1.0.0</p>
      <a className='link' href="mailto:peeling@janelia.hhmi.org"><EmailIcon fontSize='small' />&nbsp;Contact us</a>
    </footer>
  );
}
