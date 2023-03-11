import * as YUP from "yup";
export const InitializeTransactionSchema = YUP.object().shape({
  email: YUP.string().email("Please enter a vaild email").required("Required"),
  amount: YUP.number().required().positive().integer(),
});
