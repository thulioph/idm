const throwError = (errorObj) => {
  const { message } = errorObj
  throw new Error(message)
}

export default throwError;
