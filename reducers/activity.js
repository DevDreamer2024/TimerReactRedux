import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activity : [
        {
            id : 0,
            name : 'Coding',
            timer : 0,
            isAlive : true,
            isRunning : false,
        }
    ],
    timerInterval : {},
}

export const timeManagement = createSlice({
    name : 'timeManagement',
    initialState,
    reducer : {
        addActivity : (state, action) => {
            state.activity.push({
                id : state.activity.length,
                name : action.payload,
                time : 0,
                isAlive : true,
                isRunning : false,
            });
        },
        removeActivity : (state,action) => {
            const idToRemove = action.payload;
            const index = state.activity.findIndex((activity) => activity.id === idToRemove);
            if (index !== -1) {
                state.activity[index].isAlive = false;
            }
        },
        startTimer: (state, action) => {
            const id = action.payload;
            const activity = state.activity.find((act) => act.id === id);
            if (activity) {
              activity.isRunning = true;
            }
          },
          pauseTimer: (state, action) => {
            const id = action.payload;
            const activity = state.activity.find((act) => act.id === id);
            if (activity) {
              activity.isRunning = false;
            }
          },
          incrementTimer: (state, action) => {
            const id = action.payload;
            const activity = state.activity.find((act) => act.id === id);
            if (activity && activity.isRunning) {
              activity.timer += 1;
            }
          },
        },
      });
  
      export const { addActivity, removeActivity, startTimer, pauseTimer, incrementTimer } = timeManagement.actions;
        export default timeManagement.reducer;