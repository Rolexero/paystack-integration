import React, { ButtonHTMLAttributes } from "react";
import tw, { styled } from "twin.macro";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = ({ ...props }: ButtonProps) => {
  return <ButtonWrapper {...props}>{props.value}</ButtonWrapper>;
};

const ButtonWrapper = styled.button`
  ${tw`text-white w-full bg-[#000000] rounded-lg p-3 mt-4 hover:bg-[#1a1a1a]`}
`;
