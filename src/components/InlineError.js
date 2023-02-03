import PropType from 'prop-types';

const InlineError = ({ error }) => (
  <p>
    {error}
  </p>
);

export default InlineError;

InlineError.propTypes = {
  error: PropType.string.isRequired,
};
