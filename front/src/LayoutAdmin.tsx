import React from 'react'
import { useState } from 'react';
import Sidebar from './components/admin/SideBar'
import Header from './components/admin/Header';
import useAdmin from './hooks/useAdmin';
import { useNavigate } from 'react-router-dom';

function LayoutAdmin({children}: {children: React.ReactNode}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isLoggedIn, loading} = useAdmin();
  const navigate = useNavigate();

    if (loading) {
      return <div>Loading...</div>; // Optionally show a loading spinner while checking
    }
  
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login if not logged in
      return null; // Do not render any children while redirecting
    }
  return (
    <>
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
    </>
  )
}

export default LayoutAdmin