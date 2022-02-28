import React, { ChangeEvent, useState } from "react";

export default function useInput(initialValue: string | null) {
  const [input, setInput] = useState<string| null>(initialValue);

  const onChange = (e: any) => {
    const {
      target: { value },
    } = e;
    setInput(value);
  };

  return [input, onChange, setInput] as [
    string,
    any,
    React.Dispatch<React.SetStateAction<string>>
  ];
}
