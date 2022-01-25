import React, { useState } from "react";
//import classNames from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewList(props) {
    console.log(props);
    return (
        <section className="interviewers"  >
            <h4 className="interviewers__header text--light">Interviewer</h4>
            <ul className="interviewers__list">
                {
                    props.interviewers.map((interviewer) =>
                        <InterviewerListItem
                            key={interviewer.id}
                
                            name={interviewer.name}
                            avatar={interviewer.avatar}
                            selected={interviewer.id === props.value}
                            setInterviewer={() => props.onChange(interviewer.id)}
                        />
                    )
                }
            </ul>
        </section>
    )
}