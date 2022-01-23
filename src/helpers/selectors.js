export default function getAppointmentsForDay(state, day) {

    let selectedDay = state.days.filter(theDays => theDays.name === day)[0];
    let result = [];

    if(!state.days){
        return [];
      };

    if (!selectedDay) {
        return [];
    };

    for (const id of selectedDay.appointments) {
        const appointmentObject = state.appointments[id];
        result.push(appointmentObject);
    };

    return result;
}