import { useCallback } from "react";

export function useBetForm() {
  const handleSubmit = useCallback(
    (event: React.SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault();
    },
    [],
  );

  return {
    handleSubmit,
  };
}
