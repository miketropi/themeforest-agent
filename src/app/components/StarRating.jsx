"use client"

import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating = 0 }) => {
  const stars = [];
  const maxStars = 5;

  for (let i = 0; i < maxStars; i++) {
    stars.push(
      <Star
        key={i}
        size={16}
        fill={i < rating ? '#ffd700' : 'none'}
        stroke={i < rating ? '#ffd700' : '#ddd'}
      />
    );
  }

  return <div className="star-rating flex">{stars}</div>;
};

export default StarRating;
