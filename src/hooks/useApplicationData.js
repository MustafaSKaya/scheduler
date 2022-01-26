import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day => 
    setState({ ...state, day })
  );

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    //console.log(appointment)

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //console.log(appointments)

    return (
      axios.put(`/api/appointments/${id}`, appointment)
        .then((res) => setState((prev) => ({ ...prev, appointments, days: updateSpots(appointments) })))
    );
  };

  const cancelInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return (
      axios.delete(`/api/appointments/${id}`)
        .then((res) => setState((prev) => ({ ...prev, appointments, days: updateSpots(appointments) })))
    );
  };

  const editInterview = () => {
  };

  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers")
    ])
      .then(response => {
        //console.log(response);
        setState(prev => ({
          ...prev,
          days: response[0].data,
          appointments: response[1].data,
          interviewers: response[2].data
        }));
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const updateSpots = (appointments) => {

    const targetedDay = state.day;
    const daysArray = [...state.days];
    const targetedDaysIndexVal = daysArray.findIndex((day) => day.name === targetedDay);
    const theDaysObject = daysArray[targetedDaysIndexVal];
    const targetedDaysAppointments = theDaysObject.appointments;
    let availableSpots = 0;
    for (const currentDayAppointment of targetedDaysAppointments) {
      if (appointments[currentDayAppointment].interview === null) {
          availableSpots++;
      }
    };
    daysArray[targetedDaysIndexVal].spots = availableSpots;
    
    return daysArray;
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    editInterview
  };

};