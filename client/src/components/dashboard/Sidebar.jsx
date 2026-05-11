import {
  NavLink,
  useNavigate,
} from 'react-router-dom';

import {
  FiGrid,
  FiCalendar,
  FiTarget,
  FiLayers,
  FiLogOut,
} from 'react-icons/fi';

function Sidebar() {

  const navigate =
    useNavigate();

  const logout = () => {

    localStorage.removeItem(
      'token'
    );

    navigate('/login');
  };

  const navItems = [

    {
      name: 'Dashboard',
      path: '/',
      icon: <FiGrid />,
    },

    {
      name: 'Annual',
      path: '/annual',
      icon: <FiCalendar />,
    },

    {
      name: 'Monthly',
      path: '/monthly',
      icon: <FiTarget />,
    },

    {
      name: 'Custom',
      path: '/custom',
      icon: <FiLayers />,
    },

  ];

  return (

    <aside
      className='w-64 min-h-screen border-r p-5 flex flex-col'
      style={{
        background:
          'var(--bg-secondary)',

        borderColor:
          'var(--border-color)',
      }}
    >

      {/* LOGO */}

      <div className='mb-10'>

        <h1
          className='text-2xl font-bold'
          style={{
            color:
              'var(--accent-green)',
          }}
        >
          Momentum
        </h1>

      </div>

      {/* NAVIGATION */}

      <nav className='flex flex-col gap-2'>

        {navItems.map((item) => (

          <NavLink
            key={item.path}

            to={item.path}

            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all
              ${isActive
                ? 'font-semibold'
                : ''}
            `}

            style={({ isActive }) => ({
              background:
                isActive
                  ? 'var(--hover-bg)'
                  : 'transparent',

              color:
                'var(--text-primary)',
            })}
          >

            {item.icon}

            {item.name}

          </NavLink>

        ))}

      </nav>

      {/* LOGOUT */}

      <button
        onClick={logout}

        className='mt-auto flex items-center gap-3 px-4 py-3 rounded-xl transition-all'
      >

        <FiLogOut />

        Logout

      </button>

    </aside>
  );
}

export default Sidebar;