import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS } from "../components/constants";
import { bake_cookie, read_cookie } from 'sfcookies';
import '../App.css'

const reminder = (action) => {
    let { text, dueDate } = action;
    return {
        id: Math.random(),
        text,
        dueDate
    }
}

const removedById = (state = [], id) => {
    const reminders = state.filter(reminder => reminder.id !== id);
    console.log('new reduced reminders', reminders);
    return reminders;
}

const reminders = (state = [], action) => {
    let reminders = null;
    state = read_cookie('reminders');
    switch(action.type) {
        case ADD_REMINDER:
            reminders = [...state, reminder(action)];
            bake_cookie('reminders', reminders);
            return reminders;
        case DELETE_REMINDER:
            reminders = removedById(state, action.id);
            bake_cookie('reminders', reminders);
            return reminders;
        case CLEAR_REMINDERS:
            reminders = [];
            bake_cookie('reminders', reminders);
            return reminders;
            default:
                return state;
    }
}

export default reminders;