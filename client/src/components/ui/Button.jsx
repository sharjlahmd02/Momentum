function Button({
  children,
  onClick,
  type = 'button',
  loading = false,
}) {

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className='w-full py-3 rounded-xl font-semibold transition-all'
      style={{
        background:
          'var(--accent-green)',

        color: '#fff',

        opacity:
          loading ? 0.7 : 1,
      }}
    >

      {loading
        ? 'Please wait...'
        : children}

    </button>
  );
}

export default Button;