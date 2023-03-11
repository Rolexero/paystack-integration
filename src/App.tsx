import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import tw, { styled } from "twin.macro";
import { Button } from "./comonents/Button";
import { InputField } from "./comonents/InputField";
import { InitializeTransactionModel } from "./types/model";
import { useFormik } from "formik";
import { InitializeTransactionSchema } from "./models/Schema";
import axios from "axios";

const initialValues: InitializeTransactionModel = {
  email: "",
  amount: 0,
};

function App() {
  useEffect(() => {
    async function fetchMovie() {
      const response = await axios.get("http://localhost:3004/initialize");
      console.log(response.data);
    }
    fetchMovie();
  }, []);

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
      console.log(values);
    },
  });

  const config = {
    reference: new Date().getTime().toString(),
    email: "user@example.com",
    amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: "pk_test_dsdfghuytfd2345678gvxxxxxxxxxx",
  };

  // you can call this function anything
  const onSuccess = (reference: string) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

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
