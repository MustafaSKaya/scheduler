import React, { Fragment } from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from "hooks/useVisualMode";
import Status from './Status';
import Confirm from './Confirm';

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {

    console.log(name, interviewer);

    const interview = {
      student: name,
      interviewer
    };

    console.log(interview)

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  };

  const deleteInterview = () => {
    const interview = null;

    transition(DELETING);

    props.cancelInterview(props.id, interview)
      .then(() => transition(EMPTY))
  };

  return (
    <Fragment>
      <Header time={props.time}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back(EMPTY)} onSave={save}/>}
      {mode === SAVING && <Status message={SAVING}/>}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === CONFIRM && <Confirm message="Are you sure you would like to delete?" onConfirm={deleteInterview} onCancel={back} />}
      {mode === EDIT && <Form studentName={props.interview.student} interviewerId={props.interview.interviewer.id} interviewers={props.interviewers} onSave={save} onCancel={back} />}
    </Fragment>
  )
};