import {FaStar} from "react-icons/fa";
import {useState} from "react";

const StarRating = ({ rating, onRatingChange }) => {
    const [hover, setHover] = useState(null);

    return (
        <div>
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;

                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => onRatingChange(ratingValue)}
                            style={{ display: 'none' }}
                        />
                        <FaStar
                            size={30}
                            color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                            style={{ cursor: 'pointer', marginRight: '5px' }}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;