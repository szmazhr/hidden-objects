/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';

function OptionList({ optionsBox, objectives, validateCord }) {
  return (
    <ul ref={optionsBox} className="objectives">
      {objectives
        ? objectives
            .filter((o) => !o.found)
            .map((o) => (
              <li
                key={o.id}
                onClick={(e) => {
                  e.stopPropagation();
                  validateCord(o.id);
                }}
              >
                <img src={o.imgUrl} alt={o.name} />
                <span>{o.name}</span>
              </li>
            ))
        : ''}
    </ul>
  );
}
export default OptionList;

/* ------------- Prop Validation -------------*/
OptionList.propTypes = {
  optionsBox: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }).isRequired,
  objectives: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      name: PropTypes.string,
      imgUrl: PropTypes.string,
      found: PropTypes.bool,
    }).isRequired
  ).isRequired,
  validateCord: PropTypes.func.isRequired,
};
