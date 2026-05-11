import Sidebar
from '../components/dashboard/Sidebar';

import Navbar
from '../components/dashboard/Navbar';

function MainLayout({
  children,
  title,
}) {

  return (

    <div
      className='min-h-screen flex'
      style={{
        background:
          'var(--bg-primary)',
      }}
    >

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN AREA */}

      <div className='flex-1 flex flex-col'>

        <Navbar title={title} />

        <main className='p-6'>

          {children}

        </main>

      </div>

    </div>
  );
}

export default MainLayout;