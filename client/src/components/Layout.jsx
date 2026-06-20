import Sidebar from "./layout/Sidebar";

function Layout({ children }) {
  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      <Sidebar />

      <main className="ml-[280px]">
        {children}
      </main>
    </div>
  );
}

export default Layout;
