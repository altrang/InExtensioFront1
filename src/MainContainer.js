import React, { useState, useEffect } from "react";

import UserDisplay from "./UserDisplay";

const MainContainer = () => {
  // Declaring state for input value and result
  const [gitResults, setGitResult] = useState({});
  const [searchValue, setSearchValue] = useState("");

  // Declaring state for error handling
  const [error, setError] = useState({});
  const [errorDisplay, setErrorDisplay] = useState(false);

  // Declaring state for timer handling
  const [timer, setTimer] = useState(60);
  const [timerActive, setTimerActive] = useState(false);

  // Handler for input value
  const onChangeValue = value => {
    // if timer is active and user closed error display error
    if (timerActive && !errorDisplay) {
      setErrorDisplay(true);
    }
    if (value === "") {
      setGitResult({});
    }
    setSearchValue(value);
  };

  // Handler for error close button
  const onErrorClose = () => {
    setErrorDisplay(false);
  };

  // useEffect to handle end of timer
  useEffect(() => {
    if (timer === 0) {
      setErrorDisplay(false);
      setTimerActive(false);
    }
  }, [timer]);

  // useEffect to start / stop the timer
  useEffect(() => {
    let interval = null;
    // An error on fetch will set timerActive to true
    if (timerActive) {
      interval = setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
    } else {
      // Reset timer
      setTimer(60);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  // useEffect to fetch data when user types
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.github.com/search/users?q=${searchValue}`
      );
      // For this app 403 status will be rate-limit error only
      if (res.status === 403) {
        // Start timer, display/set error
        setTimerActive(true);
        setErrorDisplay(true);
        setError({
          status: 403,
          message: `Too many calls, next call available in `
        });
      } else {
        // Reset timer, hide error and handle response
        setTimerActive(false);
        setErrorDisplay(false);
        res
          .json()
          .then(res => {
            if (res.total_count === 0) {
              // if no result display error
              setErrorDisplay(true);
              setError({ status: 200, message: "No result found !" });
            }
            setGitResult(res);
          })
          .catch(err => setError(err));
      }
    };
    /*
    Fetch data only if searchValue is not empty and timer is not active
    to prevent useless fetch
    */
    if (searchValue !== "" && !timerActive) {
      /*
      Here we should use a lodash debounce to let the user types before fetching
      and prevent problem during fetch like concurrency
      */
      fetchData();
    }
  }, [searchValue, timerActive]);

  return (
    <div>
      <input
        type="text"
        value={searchValue}
        onChange={e => onChangeValue(e.target.value)}
      />
      <UserDisplay
        error={error}
        timer={timer}
        gitResults={gitResults}
        errorDisplay={errorDisplay}
        onErrorClose={onErrorClose}
      />
    </div>
  );
};

export default MainContainer;
