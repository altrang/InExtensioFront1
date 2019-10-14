import React from "react";

// For this test we will use inline Css
const closeBtnStyle = {
  marginLeft: "15px",
  fontWeight: "bold",
  float: "right",
  fontSize: "22px",
  lineHeight: "20px",
  cursor: "pointer",
  transition: " 0.3s"
};
const alertStyle = {
  padding: "20px",
  backgroundColor: "#FFAA2C",
  color: "white"
};

const UserDisplay = ({
  gitResults,
  onErrorClose,
  errorDisplay,
  error,
  timer
}) => {
  const { items, total_count: totalCount } = gitResults;
  const { status, message } = error;

  return (
    <div>
      <h4>Total: {totalCount}</h4>
      {errorDisplay && (
        <div style={alertStyle}>
          <span
            style={closeBtnStyle}
            className="closebtn"
            onClick={onErrorClose}
          >
            &times;
          </span>
          {/* Here 403 status will be rate-limit error*/}
          {status === 403 ? `${message}${timer}s` : `${message}`}
        </div>
      )}
      <ul>
        {items &&
          items.map(user => (
            <li key={user.id}>
              {/*Link to user github profile*/}
              <a href={user.html_url}>{user.login}</a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UserDisplay;
