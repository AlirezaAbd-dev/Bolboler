import { BounceLoader } from "react-spinners";

type LoadingSpinnerProps = {
  big?: boolean;
};

export function LoadingSpinner({ big = false }: LoadingSpinnerProps) {
  return (
    <div className="flex justify-center p-2">
      <BounceLoader size={big ? 60 : 50} color="rgba(00, 60, 200, .8)" />
    </div>
  );
}
