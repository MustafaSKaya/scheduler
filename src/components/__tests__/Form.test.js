import React from "react";

import { render, cleanup, fireEvent, prettyDOM } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("validates that the student name is not blank", () => {
    /* 1. Create the mock onSave function */

    const onSave = jest.fn();

    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined */

    const { getByText } = render(<Form interviewers={interviewers} onSave={onSave} />)

    /* 3. Click the save button */

    const saveButton = getByText("Save");
    fireEvent.click(saveButton)

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();

    expect(onSave).not.toHaveBeenCalled();
  });

  it("calls onSave function when the name is defined", () => {
    /* 1. Create the mock onSave function */

    const onSave = jest.fn();

    /* 2. Render the Form with interviewers, name and the onSave mock function passed as an onSave prop */

    const { getByText, queryByText } = render(
      <Form
        interviewers={interviewers}
        student="Lydia Miller-Jones"
        onSave={onSave}
      />)

    /* 3. Click the save button */

    const saveButton = getByText("Save");
    fireEvent.click(saveButton)

    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(onSave).toHaveBeenCalledTimes(1);

    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });
});