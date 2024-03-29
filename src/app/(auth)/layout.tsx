const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center space-y-6 bg-primary">
      {children}
    </div>
  );
};

export default AuthLayout;
