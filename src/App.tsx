import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import tw, { styled } from "twin.macro";
import { Button } from "./components/Button";
import { InputField } from "./components/InputField";
import { InitializeTransactionModel } from "./types/model";
import { useFormik } from "formik";
import { InitializeTransactionSchema } from "./models/Schema";
import axios from "axios";
import toast from "react-hot-toast";
import { Table } from "./components/Table";

const initialValues: InitializeTransactionModel = {
  full_name: "",
  email: "",
  amount: 0,
};

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentForm, setCurrentForm] = useState(1);
  const [transactionData, setTransactionData] = useState([]);

  const queryParams = new URLSearchParams(window.location.search);
  const term = queryParams.get("reference");

  useEffect(() => {
    listTransaction();
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
        params: {
          email: values.email,
          amount: values.amount,
          full_name: values.full_name,
        },
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
        console.log(response);
        if (response?.data?.data?.status || response?.data?.message) {
          toast.success("Transaction verification successful");
        }
      })
      .catch((err) => toast.error(err));
    setLoading(false);
  }

  async function listTransaction() {
    await axios
      .get("http://localhost:3004/list_transaction")
      .then((response) => {
        setTransactionData(response?.data?.data);
      })
      .catch((err) => toast.error(err));
  }

  return (
    <>
      {(() => {
        switch (currentForm) {
          case 1:
            return (
              <Container>
                <Wrapper>
                  <h1>Hi, Welcome to Paystack Payment Integration</h1>
                  <span>Initialize a Transaction here😊</span>
                  <form onSubmit={handleSubmit}>
                    <InputField
                      placeholder="Full Name"
                      type="text"
                      name="full_name"
                      onChange={handleChange}
                      value={values.full_name}
                      isError={Boolean(errors.full_name)}
                      helperText={
                        errors.full_name ? `*${errors.full_name}` : ""
                      }
                    />
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
                    <Button
                      value="View Transactions"
                      type="button"
                      onClick={() => setCurrentForm(2)}
                    />
                  </form>
                </Wrapper>
              </Container>
            );
          case 2:
            return (
              <div className="p-10 overflow-x-scroll w-full">
                <Button
                  value="Back"
                  type="button"
                  onClick={() => setCurrentForm(1)}
                />
                {transactionData?.length ? (
                  <Table transactionData={transactionData} />
                ) : (
                  <p>No Transaction made for this business</p>
                )}
              </div>
            );
          default:
            return null;
        }
      })()}
    </>
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
