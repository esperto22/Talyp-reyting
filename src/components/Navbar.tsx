
import { Link } from 'react-router-dom';
import { GraduationCap,} from 'lucide-react';



const goToHome = () => {
      window.location.href = '/';}
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link onClick={goToHome} to="/" className="nav-logo">
          <GraduationCap size={24} />
          Talyp Reýting
        </Link>
        <Link to="/FacultyGrafics" className="nav-admin">
          {/* <Shield size={20} /> */}
          Fakultetler boýunça statistika
        </Link>
      </div>
    </nav>
  );


    

};

export default Navbar;