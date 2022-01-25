import react, { useState, useEffect } from "react";
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
        .then((res) => setState((prev) => ({ ...prev, appointments })))
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
        .then((res) => setState((prev) => ({ ...prev, appointments })))
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

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    editInterview
  };

};