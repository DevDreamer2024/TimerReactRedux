import styles from '../styles/Activity.module.css';
import { useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import {removeActivity, startTimer, pauseTimer, incrementTimer} from '../reducers/activity';
function Activity(props) {
  
const dispatch = useDispatch();
const activity = useSelector((state) => state.timeManagement.activity.find((act) => act.id === props.id));
useEffect(() => {
  let timerInterval;
  if (activity.isRunning) {
    timerInterval = setInterval(() => {
      dispatch(incrementTimer(props.id));
    }, 1000);
  }
  return () => clearInterval(timerInterval);
}, [activity.isRunning, dispatch , props.id]);
const toRemove = () => {
  dispatch(removeActivity(props.id));
}
const handleStart = () => {
  dispatch(startTimer(props.id));
}
const handlePause = () => {
  dispatch(pauseTimer(props.id));
}
const timer = activity ? new Date(activity.timer * 1000).toISOString().slice(11, 19) : '';
  return (
    <>
      <div className={styles.activityWindow}>
        <div className={styles.activityHeader}>
          {props.name}
          <button className={styles.delete} onClick={toRemove}>X</button>
        </div>
        {timer}
        <div className={styles.buttonSection}>
          <button onClick={handleStart}>Start</button>
          <button onClick={handlePause}>Stop</button>
        </div>
      </div>
    </>
  );
}
export default Activity;