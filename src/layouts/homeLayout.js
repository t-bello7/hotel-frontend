import PropTypes from 'prop-types';
import "../assets/styles/home.css";

const HomeLayout = ({ background, children }) => (
  <div className="main" style={{ backgroundImage: `url(${background})` }}>
    {children}
  </div>
);

export default HomeLayout;

HomeLayout.propTypes = {
  background: PropTypes.string,
  children: PropTypes.node.isRequired
};

HomeLayout.defaultProps = {
  background: 'Button'
};
