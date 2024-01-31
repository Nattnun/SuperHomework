import axios from "axios";
import { React, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function HomeworkForm() {
  // use useState to keep values of subject
  const [subject, setSubject] = useState([]);
  const [input, setInput] = useState({
    subjectId: "",
    question: "",
    startdate: new Date(),
    duedate: new Date(),
    published: false,
  });

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const run = async () => {
      const rs = await axios.get("http://localhost:9999/subject");
      console.log(rs.data.subjects);
      setSubject(rs.data.subjects);
    };
    run();
  }, []);

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const rs = await axios.post("http://localhost:9999/homework", input, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("add new Homework success");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex flex-col gap-3 min-w-[600px] w-4/6 border mx-auto p-3 rounded">
      <h1 className="text-4xl">New Homework</h1>
      <form onSubmit={hdlSubmit} className="flex flex-col gap-2">
        {/* selectDropDown */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Select subject</span>
          </div>
          <select
            value={input.subjectId}
            name="subjectId"
            onChange={hdlChange}
            className="select select-bordered"
          >
            <option disabled value="" selected>
              Pick one
            </option>
            {subject.map((el) => {
              return (
                <option key={el.id} value={el.id}>
                  {el.title}
                </option>
              );
            })}
            {/* <option>HTML</option>
            <option>CSS</option>
            <option>JS</option> */}
          </select>
        </label>
        {/* endSelectDropDown */}
        {/* textArea */}
        <label className="form-control">
          <div className="label">
            <span className="label-text">Question</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Bio"
            name="question"
            value={input.question}
            onChange={hdlChange}
          ></textarea>
        </label>
        {/* endTextArea */}
        {/* toggle */}
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-5">
            <span className="label-text">Published</span>
            <input
              type="checkbox"
              className="toggle"
              name="published"
              checked={input.published}
              onChange={(e) =>
                setInput((prv) => ({ ...prv, published: !prv.published }))
              }
            />
          </label>
        </div>
        {/* endToggle */}
        {/* dateInput */}
        <div className="flex justify-between px-3">
          <div className="form-control">
            <div className="label">
              <span className="label-text">Start Date</span>
            </div>
            {/* <input
              type="date"
              name="startdate"
              value={input.startdate}
              onChange={hdlChange}
            /> */}
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={input.startdate}
              onChange={(date) =>
                setInput((prv) => ({ ...prv, startdate: date }))
              }
            />
          </div>
          <div className="form-control">
            <div className="label">
              <span className="label-text">Due Date</span>
            </div>
            {/* <input type="date" className="" /> */}
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={input.duedate}
              onChange={(date) =>
                setInput((prv) => ({ ...prv, duedate: date }))
              }
            />
          </div>
        </div>
        {/* dateInputEnd */}
        <button
          type="submit"
          className="btn btn-outline btn-primary mt-[160px]"
        >
          Create Homework
        </button>
      </form>
    </div>
  );
}
