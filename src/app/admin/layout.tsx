import AdminSidebar from "./sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-5 h-full">
      <AdminSidebar />
      {children}
    </div>
  );
};

export default AdminLayout;
