import "./style.scss";

import type { ChangeEvent } from "react";
import { useState } from "react";

import MessageBottom from "../../alert/MessageBottom/MessageBottom";
import { Button } from "../../buttons/Button/Button";

type BookDemoType = {
  first_name: string;
  last_name: string;
  email: string;
  website_url: string;
  tell_us_more: string;
};

interface BookDemoFormProps {
  submit_text?: string;
}

const BookDemoForm = ({ submit_text = "Submit" }: BookDemoFormProps) => {
  const [okMessage, setOkMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [values, setValues] = useState<BookDemoType>({
    first_name: "",
    last_name: "",
    email: "",
    website_url: "",
    tell_us_more: "",
  });

  const handleAlert = () => {
    setOkMessage(false);
    setErrorMessage(false);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target as HTMLInputElement | HTMLTextAreaElement;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = () => {
    
    // const data = new FormData();
    // data.append("first_name", values.first_name);
    // data.append("last_name", values.last_name);
    // data.append("email", values.email);
    // data.append("website_url", values.website_url);
    // data.append(
    //   "tell_us_more",
    //   `${values.tell_us_more} \n\nform_source:${window.location.pathname + window.location.search + window.location.hash}`,
    // );

    // fetch("https://pkgs.defguard.net/api/customer/signup", {
    //   mode: "no-cors",
    //   method: "POST",
    //   body: data,
    // })
    //   .then(() => {
    //     setOkMessage(true);
    //   })
    //   .catch(() => {
    //     setErrorMessage(true);
    //   });   

    const dataForSheet = new URLSearchParams();
    const utmSource = new URLSearchParams(window.location.search).get("utm_source") || "";
    const utmAnchor = window.location.hash ? window.location.hash.slice(1) : "";

    dataForSheet.append("first_name", values.first_name);
    dataForSheet.append("last_name", values.last_name);
    dataForSheet.append("email", values.email);
    dataForSheet.append("website_url", values.website_url);
    dataForSheet.append("tell_us_more", values.tell_us_more);
    dataForSheet.append("utm_source", utmSource);
    dataForSheet.append("utm_anchor", utmAnchor);

    fetch("https://script.google.com/macros/s/AKfycbwzb0VMOExWk9RmMu6tfGXroddK7lB5VjW-QSWEKGBMyNgtVr1MKM-2xEIkh7AW6-Ex/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: dataForSheet.toString(),
    })
      .then(() => {
        setOkMessage(true);
      })
      .catch(() => {
        setErrorMessage(true);
      });
  };

  return (
    <>
      <form
        id="book-form"
        className="book"
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="double-inputs">
          <label htmlFor="first_name">
            First name
            <input type="text" required name="first_name" onChange={handleInputChange} />
          </label>
          <label htmlFor="last_name">
            Last name
            <input type="text" required name="last_name" onChange={handleInputChange} />
          </label>
        </div>
        <div className="double-inputs">
          <label htmlFor="email">
            Email
            <input type="email" required name="email" onChange={handleInputChange} />
          </label>
          <label htmlFor="website_url">
            Company website URL
            <input type="text" required name="website_url" onChange={handleInputChange} />
          </label>
        </div>
        <label className="single-input" htmlFor="tell_us_more">
          Anything else you wish to tell us?
          <textarea rows={7} name="tell_us_more" onChange={handleInputChange}></textarea>
        </label>
        <div className="button">
          <Button text={submit_text} type="submit" />
        </div>
      </form>
      {okMessage && (
        <MessageBottom message="Form sent successfully" handleButton={handleAlert} />
      )}
      {errorMessage && (
        <MessageBottom message="Something went wrong" handleButton={handleAlert} />
      )}
    </>
  );
};

export default BookDemoForm;
