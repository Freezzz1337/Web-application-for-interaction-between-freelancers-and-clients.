import "./spinner.css";

const Spinner = ({ size = '2.8rem', color = '#183153', speed = '1s' }) => {
    const spinnerStyle = {
        '--uib-size': size,
        '--uib-speed': speed,
        '--uib-color': color
    };

    return (
        <div className="dot-spinner" style={spinnerStyle}>
            {[...Array(8)].map((_, index) => (
                <div className="dot-spinner__dot" key={index}></div>
            ))}
        </div>
    );
};
export default Spinner;