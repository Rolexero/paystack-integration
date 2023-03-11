import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import tw, { styled } from "twin.macro";
import { Button } from "./comonents/Button";
import { InputField } from "./comonents/InputField";
import { InitializeTransactionModel } from "./types/model";
import { useFormik } from "formik";
import { InitializeTransactionSchema } from "./models/Schema";
import axios from "axios";
import { useLocation } from "react-router-dom";

const initialValues: InitializeTransactionModel = {
  email: "",
  amount: 0,
};

function App() {
  const [reference, setReference] = useState("");

  const queryParams = new URLSearchParams(window.location.search);
  const term = queryParams.get("reference");

  if (term) {
    console.log(term);
  }

  const {
    errors,
    values,
    handleSubmit,
    handleChange,
    setFieldValue,
    resetForm,
  } = useFormik<InitializeTransactionModel>({
    initialValues,
    validationSchema: InitializeTransactionSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: () => {
      fetchMovie();

      console.log(values);
    },
  });

  const options = {
    method: "POST",
    url: "http://localhost:3004/initialize",
    params: { email: values.email, amount: values.amount },
  };

  async function fetchMovie() {
    await axios
      .get("http://localhost:3004/initialize", {
        params: { email: values.email, amount: values.amount },
      })
      .then((response) => {
        console.log(response?.data?.data?.authorization_url);
        window.open(response?.data?.data?.authorization_url);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Container>
      <Wrapper>
        <h1>Hi, Welcome to Paystack Payment Integration</h1>
        <span>Initialize a Transaction here😊</span>
        <form onSubmit={handleSubmit}>
          <InputField
            placeholder="Email"
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email}
            isError={Boolean(errors.email)}
            helperText={errors.email ? `*${errors.email}` : ""}
          />
          <InputField
            placeholder="Amount"
            type="number"
            name="amount"
            onChange={handleChange}
            value={values.amount}
            isError={Boolean(errors.amount)}
            helperText={errors.amount ? `*${errors.amount}` : ""}
          />

          <Button
            value={"Pay Now"}
            type="submit"
            className="disabled:cursor-not-allowed"
          />
        </form>
      </Wrapper>
    </Container>
  );
}

export const Container = styled.div`
  ${tw`h-[100vh] flex justify-center items-center `}
  font-family: 'Work Sans', sans-serif;
`;

export const Wrapper = styled.div`
  ${tw` h-[604px] w-[450px] flex flex-col justify-center items-center m-auto container border-[1px] rounded-lg p-6`}
  h1 {
    ${tw`font-bold text-[18px] mt-4`}
  }
  span {
    ${tw`font-medium text-[14px] mt-2 text-[#747474]`}
  }

  form {
    ${tw`mt-6 w-full`};
    input {
      padding: 11px 20px;
      ${tw`outline-none  rounded-lg w-full my-3 `}
    }
  }
`;

export default App;
