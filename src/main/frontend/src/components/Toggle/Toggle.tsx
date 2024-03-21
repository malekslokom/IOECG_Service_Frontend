import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import "./Toggle.css";
interface Props {
  isChecked: boolean;
  handleChange: (isChecked: boolean) => void;
}
const Toggle = ({ handleChange, isChecked }: Props) => {
  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        id="check"
        className="toggle"
        onChange={(e) => handleChange(e.target.checked)}
        checked={isChecked}
      />
      <label htmlFor="check" className="toggle-label">
        <FontAwesomeIcon icon={isChecked ? faMoon : faSun} />
      </label>
    </div>
  );
};

export default Toggle;
