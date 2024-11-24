const clockState = { logicalClock: 0 }; // Wrap logicalClock in an object
const lockState = { lock: false }; // Global lock variable

//-------------------------------------------------------------------------
const incrementClock = () => {
  clockState.logicalClock += 1; // Increment the logical clock by 1
};
//-------------------------------------------------------------------------
const acquireLock = () => {
  if (lockState.lock === false) {
    lockState.lock = true; // Acquire the lock
    return true;
  }
  return false; // Lock already acquired
};

const releaseLock = () => {
  lockState.lock = false; // Release the lock
};

//--------------------------------------------------------------------------
module.exports = { acquireLock, releaseLock , clockState, incrementClock };