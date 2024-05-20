interface Props {
  error: Error;
  resetErrorBoundary: () => void;
}

const Error = ({ error, resetErrorBoundary }: Props) => {
  return (
    <div>
      <p>Something went wrong</p>
      <p>{error.message}</p>
      <p>{error.stack}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default Error;
