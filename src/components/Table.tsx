import React from "react";
import { formatDateStr } from "../helper/utlis";

interface TableProps {
  transactionData?: any;
}

export const Table: React.FC<TableProps> = ({
  transactionData,
}: TableProps) => {
  return (
    <table
      className={`rounded-lg mt-5 w-full container mx-auto table-auto overflow-x-scroll text-black ${
        transactionData?.length === 0 ? "hidden" : ""
      }`}
    >
      <thead>
        <tr className="text-left border-b w-full  border-gray-300 bg-colorGold">
          <th className="">Amount</th>
          <th className="">Customer</th>
          <th className="">Reference</th>
          <th className="">Date</th>
        </tr>
      </thead>
      {transactionData?.map(
        (
          transaction: {
            currency: string;
            amount: string;
            reference: string;
            paidAt: string;
            customer: { email: string };
          },
          index: number
        ) => (
          <tbody key={index}>
            <tr className="border-b cursor-pointer w-full  border-gray-600">
              <td className="px-4 py-3 ">
                {transaction?.currency} {transaction?.amount}
              </td>
              <td className="px-4 py-3 ">{transaction?.customer.email}</td>
              <td className="px-4 py-3 ">{transaction?.reference}</td>
              <td className="px-4 py-3 ">
                {formatDateStr(transaction?.paidAt, "MMM D,  h:mm A")}
              </td>
            </tr>
          </tbody>
        )
      )}
    </table>
  );
};
