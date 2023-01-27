import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import "../assets/styles/home.css";
import useAuth from "../hooks/useAuth";

const HomeLayout = ({ background, children }) => {
  const auth = useAuth();
  const location = useLocation();
  return auth.user ? (
    <Navigate to="/hotels" state={{ from: location }} />
  ) : (
    <div className="main" style={{ backgroundImage: `url(${background})` }}>
      {children}
    </div>
  );
};

export default HomeLayout;

HomeLayout.propTypes = {
  background: PropTypes.string,
  children: PropTypes.node.isRequired
};

HomeLayout.defaultProps = {
  background: 'Button'
};
