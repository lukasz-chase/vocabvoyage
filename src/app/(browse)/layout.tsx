import Nav from "@/components/Nav";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Nav />
      <div className="ml-14 md:ml-40 lg:ml-60">{children}</div>
    </div>
  );
};

export default BrowseLayout;
