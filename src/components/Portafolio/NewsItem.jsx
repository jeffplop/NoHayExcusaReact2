import React from 'react';

const NewsItem = ({ title, date, content }) => {
  return (
    <div className="mb-4 p-3 border-start border-3 border-danger">
      <h5>{title}</h5>
      <p className="text-muted small">{date}</p>
      <p>{content}</p>
    </div>
  );
};

export default NewsItem;