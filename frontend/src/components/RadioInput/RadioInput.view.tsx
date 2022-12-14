import "./RadioInput.css";

type RadioInputProps = {
  label: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  onSelect: (value: string) => void;
};

const RadioInput = (props: RadioInputProps) => {
  const { label, value, onSelect, checked = false, disabled = false } = props;
  return (
    <div
      className={`radioInput ${disabled ? "disabled-button" : ""}`}
      data-testid="radio-input-container">
      <label>
        <input
          data-testid="radio-input-control"
          className="radio-input-button"
          type="radio"
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={() => onSelect(value)}
        />
        {label}
      </label>
    </div>
  );
};

export default RadioInput;
