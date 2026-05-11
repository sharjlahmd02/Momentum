function StatCard({
  title,
  value,
  subtitle,
}) {

  return (

    <div
      className='rounded-2xl border p-5'
      style={{
        background:
          'var(--bg-secondary)',

        borderColor:
          'var(--border-color)',
      }}
    >

      <p
        className='text-sm mb-2'
        style={{
          color:
            'var(--text-secondary)',
        }}
      >
        {title}
      </p>

      <h2 className='text-3xl font-bold'>
        {value}
      </h2>

      <p
        className='mt-2 text-sm'
        style={{
          color:
            'var(--text-secondary)',
        }}
      >
        {subtitle}
      </p>

    </div>
  );
}

export default StatCard;