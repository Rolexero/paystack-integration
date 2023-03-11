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
import toast from "react-hot-toast";

const initialValues: InitializeTransactionModel = {
  email: "",
  amount: 0,
};

function App() {
  const [loading, setLoading] = useState<boolean>(false);

  const queryParams = new URLSearchParams(window.location.search);
  const term = queryParams.get("reference");

  useEffect(() => {
    if (term) {
      verifyTransaction(term);
    }
  }, [term]);

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
      initializeTransaction();
    },
  });

  async function initializeTransaction() {
    setLoading(true);

    await axios
      .get("http://localhost:3004/initialize", {
        params: { email: values.email, amount: values.amount },
      })
      .then((response) => {
        window.open(response?.data?.data?.authorization_url);
        resetForm();
      })
      .catch((err) => toast.error(err));
    setLoading(false);
  }

  async function verifyTransaction(verificationId: string) {
    setLoading(true);
    await axios
      .get("http://localhost:3004/verify/", {
        params: { verification_id: verificationId },
      })
      .then((response) => {
        if (response?.data?.data?.status || response?.data?.message) {
          toast.success("Transaction verification successful");
        }
      })
      .catch((err) => toast.error(err));
    setLoading(false);
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
            value={loading ? "Please Wait" : "Pay Now"}
            disabled={loading}
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
