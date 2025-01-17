import PropTypes from "prop-types";

export const BookReview = ({ title, url, review, reviewer }) => {
  return (
    <div className="border-b border-gray-300 py-2 w-11/12 mx-auto">
      <div className="flex items-center">
        <div className="ml-4">
          <h3 className="text-lg font-semibold">
            {title.slice(0, 20) + (title.length > 20 ? "..." : "")}
          </h3>
          <a href={url} className="text-blue-400 text-xs" target="_blank">
            {url.slice(0, 30) + (url.length > 30 ? "..." : "")}
          </a>
          <p className="text-sm text-gray-500 mb-5">レビュワー:{reviewer}</p>
          <p>{review}</p>
        </div>
      </div>
    </div>
  );
};

BookReview.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
  reviewer: PropTypes.string.isRequired,
};
