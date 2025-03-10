import PropTypes from 'prop-types';
import { format } from 'date-fns';
import '../styles/ReviewCard.css';

const ReviewCard = ({ reviews }) => {
  return (
    <div className="review-section">
      <h2>Customer Reviews</h2>
      {reviews && reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-header">
              <h3>{review.reviewerName || 'Anonymous'}</h3>
              <span className="review-email">
                {review.reviewerEmail || 'Anonymous'}
              </span>
            </div>

            <div className="review-rating">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={i < (review.rating || 0) ? 'star filled' : 'star'}
                >
                  ★
                </span>
              ))}
            </div>

            <p className="review-comment">"{review.comment || 'No comment provided'}"</p>

            <div className="review-date">
              {review.date
                ? format(new Date(review.date), 'MMMM dd, yyyy')
                : 'Date not available'}
            </div>
          </div>
        ))
      ) : (
        <p>No reviews yet. Be the first to review!</p>
      )}
    </div>
  );
};

ReviewCard.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      rating: PropTypes.number.isRequired,
      comment: PropTypes.string,
      date: PropTypes.string,
      reviewerEmail: PropTypes.string,
      reviewerName: PropTypes.string,
    })
  ).isRequired,
};

export default ReviewCard;
