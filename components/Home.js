import Activity from './Activity';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import {addActivity} from '../reducers/activity';
function Home() {
  const [activityName, setActivityName] = useState('');
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.timeManagement.activity);
  console.log(activities)

  const addAnActivity = () => {
    if (!activityName) {
      return;
    }
    dispatch(addActivity(activityName));
    setActivityName('');
    };
    console.log('this is the current list of activities');
    console.log(activities);
  
  const filteredActivities  = activities.filter((data) => data.isAlive);
  
  const activitiesComponents = filteredActivities.map((data, i) => {
    return <Activity key={i} id={data.id} name={data.name} timer={data.timer} isAlive={true}/>;
  });

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.trackerWindow}>
          <div className={styles.trackerHeader}>
            Time tracker
          </div>
          <div className={styles.addSection}>
            <input type="text" 
            placeholder="Activity name" 
            id="activityName" 
            onChange={(e) => setActivityName(e.target.value)} 
            value={activityName}
            />
            <button id="add" onClick={addAnActivity}>Add activity</button>
          </div>
        </div>
      </div>
      <div className={styles.bottomSection}>
        {activitiesComponents}
      </div>
    </div>
  );
}
export default Home;
