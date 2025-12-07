import React from 'react';

interface RatingDisplayProps {
  score: number;
  votes: number;
  maxScore?: number;
  className?: string;
}

export default function RatingDisplay({ score, votes, maxScore = 5, className = '' }: RatingDisplayProps) {
  // Calculate percentage for star filling
  const percentage = (score / maxScore) * 100;

  // Generate star elements
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;
    const emptyStars = maxScore - fullStars - (hasHalfStar ? 1 : 0);

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="text-yellow-400">
          ★
        </span>
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="relative text-yellow-400">
          <span className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
            ★
          </span>
          <span className="text-gray-300">★</span>
        </span>
      );
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <div className={`rating-display ${className}`}>
      {/* Stars */}
      <div className="rating-stars">
        {renderStars()}
      </div>

      {/* Score */}
      <div className="rating-score">
        <span className="font-semibold text-gray-700 dark:text-gray-300">{score.toFixed(1)}</span>
        <span className="text-gray-500 dark:text-gray-400">/ {maxScore}</span>
      </div>

      {/* Votes */}
      <div className="rating-votes">
        ({votes.toLocaleString()} votes)
      </div>
    </div>
  );
}