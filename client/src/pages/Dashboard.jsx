import MainLayout
from '../layouts/MainLayout';

import StatCard
from '../components/dashboard/StatCard';

function Dashboard() {

  return (

    <MainLayout
      title='Dashboard'
    >

      {/* TOP STATS */}

      <div
        className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5'
      >

        <StatCard
          title='Active Trackers'
          value='12'
          subtitle='Currently running'
        />

        <StatCard
          title='Total Completions'
          value='284'
          subtitle='Tasks completed'
        />

        <StatCard
          title='Best Streak'
          value='32 Days'
          subtitle='Personal best'
        />

        <StatCard
          title='Consistency'
          value='87%'
          subtitle='Last 30 days'
        />

      </div>

      {/* MAIN CONTENT */}

      <div
        className='grid grid-cols-1 xl:grid-cols-3 gap-5 mt-6'
      >

        {/* LEFT SECTION */}

        <div className='xl:col-span-2 space-y-5'>

          {/* TRACKER OVERVIEW */}

          <div
            className='rounded-2xl border p-5'
            style={{
              background:
                'var(--bg-secondary)',

              borderColor:
                'var(--border-color)',
            }}
          >

            <h2
              className='text-xl font-semibold mb-5'
            >
              Tracker Overview
            </h2>

            <div className='space-y-4'>

              {[
                {
                  title:
                    'Workout',

                  progress: '82%',
                },

                {
                  title:
                    'Reading',

                  progress: '64%',
                },

                {
                  title:
                    'Meditation',

                  progress: '91%',
                },

              ].map((item) => (

                <div key={item.title}>

                  <div
                    className='flex justify-between mb-2'
                  >

                    <span>
                      {item.title}
                    </span>

                    <span>
                      {item.progress}
                    </span>

                  </div>

                  <div
                    className='h-3 rounded-full overflow-hidden'
                    style={{
                      background:
                        'var(--hover-bg)',
                    }}
                  >

                    <div
                      className='h-full rounded-full'
                      style={{
                        width:
                          item.progress,

                        background:
                          'var(--accent-green)',
                      }}
                    />

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* RECENT ACTIVITY */}

          <div
            className='rounded-2xl border p-5'
            style={{
              background:
                'var(--bg-secondary)',

              borderColor:
                'var(--border-color)',
            }}
          >

            <h2
              className='text-xl font-semibold mb-5'
            >
              Recent Activity
            </h2>

            <div className='space-y-4'>

              {[
                'Completed Workout',
                'Checked in Reading',
                'Meditation streak reached 7 days',
                'Completed Morning Routine',
              ].map((activity) => (

                <div
                  key={activity}

                  className='border rounded-xl px-4 py-3'
                  style={{
                    borderColor:
                      'var(--border-color)',
                  }}
                >

                  {activity}

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* RIGHT SECTION */}

        <div>

          {/* HEATMAP PREVIEW */}

          <div
            className='rounded-2xl border p-5'
            style={{
              background:
                'var(--bg-secondary)',

              borderColor:
                'var(--border-color)',
            }}
          >

            <h2
              className='text-xl font-semibold mb-5'
            >
              Activity Heatmap
            </h2>

            <div
              className='grid grid-cols-7 gap-2'
            >

              {Array.from({
                length: 70,
              }).map((_, index) => {

                const levels = [
                  '#161b22',
                  '#0e4429',
                  '#006d32',
                  '#26a641',
                  '#39d353',
                ];

                const randomLevel =
                  levels[
                    Math.floor(
                      Math.random()
                      * levels.length
                    )
                  ];

                return (

                  <div
                    key={index}

                    className='w-5 h-5 rounded-sm'
                    style={{
                      background:
                        randomLevel,
                    }}
                  />

                );

              })}

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default Dashboard;