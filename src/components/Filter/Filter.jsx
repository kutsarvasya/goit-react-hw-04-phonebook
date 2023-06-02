import { LabelFilter } from './Filter.styled';
import PropTypes from 'prop-types';

export function Filter({ value, changeFilter }) {
  return (
    <>
      <LabelFilter>
        Find contacts by name
        <input type="text" value={value} onChange={changeFilter} />
      </LabelFilter>
    </>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
};
