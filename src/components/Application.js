
import DayList from "./Daylist";
import "components/Application.scss";
import React, { useState, useEffect } from "react";
import Appointment from "./Appointment";
import axios from "axios";
import getAppointmentsForDay from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = (day => 
    setState({ ...state, day })
  );
  
  const dailyAppoinments = getAppointmentsForDay(state, state.day);

  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments")
    ])
      .then(response => {
        console.log(response);
        setState(prev => ({
          ...prev,
          days: response[0].data,
          appointments: response[1].data
        }));
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />
      </section>
      <section className="schedule">
        {dailyAppoinments.map((appointment) => 
        <Appointment 
        key={appointment.id} {...appointment}>
        </Appointment>)}
      </section>
    </main>
  );
}
