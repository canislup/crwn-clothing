import "./form-input.styles.scss";

const FormInput = ({ label, otherClases, ...otherProps }) => {
  return (
    <div className="group">
      <input className={`form-input ${otherClases}`} {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
