import Main from "../components/body/Main";
import Header from "../components/header/Header";
import { Outlet, Link } from "react-router-dom";
const Layout = () => {
    return (
        <>
            <img id="background_image" src="https://static.wixstatic.com/media/c91840_32d61b2f5bc2412996c7fbeb31c18024f000.jpg/v1/fill/w_1810,h_1080,al_c,q_85,usm_0.33_1.00_0.00,enc_auto/c91840_32d61b2f5bc2412996c7fbeb31c18024f000.jpg" alt="" />
            <Header></Header>
<Outlet />
            {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <Outlet /> */}
        </>
    )
};

export default Layout;