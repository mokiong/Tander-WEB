import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea
} from "@chakra-ui/core";

type inputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  textarea?: boolean;
  _focus?: any;
  pr?: string;
  large?: boolean;
  size?: string;
};

type inputTextArea = typeof Input | typeof Textarea;

// '' = false
// 'error message' = true

export const InputField: React.FC<inputFieldProps> = ({
  label,
  textarea,
  large,
  ...props
}) => {
  const [field, { error }] = useField(props);
  let InputOrTextarea = Input;

  if (textarea) {
    (InputOrTextarea as inputTextArea) = Textarea;
  }

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputOrTextarea {...field} {...props} id={field.name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
