import Link from 'next/link';
import styled from 'styled-components';
import DarkModeToggle from './DarkModeToggle';
const Navbar = () => (
  <nav className="navbar navbar-expand  mb-4">
    <div className="container">
      <a className="navbar-brand" href="#">Country News</a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <ul className="navbar-nav ml-auto float-left">
            <li className="nav-item" >
              <DarkModeToggle />
            </li>
          </ul>
          <li className="nav-item">
            <Link href="/" shallow={true}><a className="nav-link">Home</a></Link>
          </li>
          <li className="nav-item">
            <Link href="/about" shallow={true}><a className="nav-link">About</a></Link>
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