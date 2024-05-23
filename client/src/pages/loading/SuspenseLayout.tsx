import { Suspense } from "react";
import { Outlet } from "react-router";

interface Props {
  fallback: React.ReactNode;
}

const SuspenseLayout = ({ fallback }: Props) => {
  return (
    <Suspense fallback={fallback}>
      <Outlet />
    </Suspense>
  );
};

export default SuspenseLayout;
