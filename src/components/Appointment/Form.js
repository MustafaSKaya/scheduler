import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function (props) {

    const [student, setStudent] = useState(props.student || "");
    const [interviewer, setInterviewer] = useState(props.interviewer || null);

    const cancel = function () {
        setStudent("");
        setInterviewer(null);
        props.onCancel();
    };

    console.log(props.interviewers);

    return (
        <main className="appointment__card appointment__card--create" onSubmit={event => event.preventDefault()}>
            <section className="appointment__card-left">
                <form autoComplete="off">
                    <input
                        className="appointment__create-input text--semi-bold"
                        name="name"
                        type="text"
                        placeholder="Enter Student Name"
                        onChange={(event) => setStudent(event.target.value)}
                        value={student}
                    />
                </form>
                <InterviewerList
                    interviewers={props.interviewers}
                    value={interviewer}
                    onChange={setInterviewer}
                />
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                    <Button danger onClick={() => cancel()}>Cancel</Button>
                    <Button confirm onClick={() => props.onSave(student, interviewer)}>Save</Button>
                </section>
            </section>
        </main>
    )
}