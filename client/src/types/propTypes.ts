import React from "react"

export type FormActionProps = {
  handleSubmit: (event: React.FormEvent<HTMLButtonElement>) => void,
  text: string,
  validateForm: () => boolean
}