function AuthLayout({
  children,
  title,
  subtitle,
}) {

  return (
    <div
      className='min-h-screen flex items-center justify-center px-4'
      style={{
        background:
          'var(--bg-primary)',
      }}
    >

      <div
        className='w-full max-w-md rounded-2xl p-8 border shadow-lg'
        style={{
          background:
            'var(--bg-secondary)',

          borderColor:
            'var(--border-color)',
        }}
      >

        <div className='mb-8 text-center'>

          <h1
            className='text-3xl font-bold mb-2'
          >
            {title}
          </h1>

          <p
            style={{
              color:
                'var(--text-secondary)',
            }}
          >
            {subtitle}
          </p>

        </div>

        {children}

      </div>

    </div>
  );
}

export default AuthLayout;