import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/core";

type inputTextAreaProps = {
  name: string;
  _focus?: any;
  pr?: string;
  placeholder: string;
};

export const InputTextArea: React.FC<inputTextAreaProps> = ({ ...props }) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name} />
      <Textarea
        overflow="none"
        resize="none"
        {...field}
        {...props}
        id={field.name}
        bgColor="white"
      />
    </FormControl>
  );
};
