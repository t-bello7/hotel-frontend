import PropTypes from 'prop-types';
import '../assets/styles/button.css';

const Button = ({ title }) => (
  <button className="button" type="button">
    {title}
  </button>
);

export default Button;

Button.propTypes = {
  title: PropTypes.string
};

Button.defaultProps = {
  title: 'Button'
};
