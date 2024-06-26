import { Loader } from "lucide-react";

export const LoadingPage = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Loader className="h-6 w-6 text-primary animate-spin" />
    </div>
  );
};
