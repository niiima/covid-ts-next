import Link from 'next/link';
import styled from 'styled-components';
import DarkModeToggle from './DarkModeToggle';
const Navbar = () => (
  <nav className="navbar navbar-expand  mb-4">
    <div className="container">
      <a className="navbar-brand" href="#">Country News</a>
      <DarkModeToggle/>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link href="/"><a className="nav-link">Home</a></Link>
          </li>
          <li className="nav-item">
            <Link href="/about"><a className="nav-link">About</a></Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

const StyledNavbar = styled(Navbar)`
    color: var(--text-primary);
    background-color: var(--background);
    box-shadow: var(--shadow);
`
export default StyledNavbar;//Navbar;