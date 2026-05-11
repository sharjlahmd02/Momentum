import ThemeToggle
from '../ui/ThemeToggle';

function Navbar({
  title,
}) {

  return (

    <header
      className='h-20 border-b px-6 flex items-center justify-between'
      style={{
        background:
          'var(--bg-secondary)',

        borderColor:
          'var(--border-color)',
      }}
    >

      <div>

        <h1
          className='text-2xl font-bold'
        >
          {title}
        </h1>

      </div>

      <div className='flex items-center gap-4'>

        <ThemeToggle />

      </div>

    </header>
  );
}

export default Navbar;