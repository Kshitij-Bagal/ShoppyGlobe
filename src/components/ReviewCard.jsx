import PropTypes from 'prop-types';
import { format } from 'date-fns';
import '../styles/ReviewCard.css';

const ReviewCard = ({ reviews }) => {
  return (
    <div className="review-section">
      <h2>Customer Reviews</h2>
      {reviews.map((review, index) => (
        <div key={index} className="review-card">
          <div className="review-header">
            <h3>{review.reviewerName}</h3>
            <span className="review-email">{review.reviewerEmail}</span>
          </div>

          <div className="review-rating">
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={i < review.rating ? 'star filled' : 'star'}
              >
                ★
              </span>
            ))}
          </div>

          <p className="review-comment">"{review.comment}"</p>

          <div className="review-date">
            {format(new Date(review.date), 'MMMM dd, yyyy')}
          </div>
        </div>
      ))}
    </div>
  );
};

ReviewCard.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      rating: PropTypes.number.isRequired,
      comment: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      reviewerEmail: PropTypes.string.isRequired,
      reviewerName: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ReviewCard;
