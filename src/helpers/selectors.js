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
};

export function getInterview(state, interview) {

    if (!interview) {
      return null;
    } else {
      const interviewer = state.interviewers[interview.interviewer]
      return {
        student: interview.student,
        interviewer: interviewer
      };
    }

};

export function getInterviewersForDay(state, day) {   
    const thatDays = state.days.filter((stateDay) => stateDay.name === day)[0];

    if (!day || !thatDays || !state) {  
        return [];   
    };
        
    const interviewersArray = thatDays.interviewers.map((interviewer) => {     
      return state.interviewers[interviewer];   
    });
        
    return interviewersArray; 
};