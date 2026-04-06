export default function Hero() {
  return (
    <div className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        <div>
          <p className="text-sm text-gray-500 mb-2">What is X'perienced?</p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Discover Success Stories
          </h1>

          <p className="text-gray-600 mt-4 text-sm leading-relaxed">
            X'perienced is a platform where students share real interview
            experiences from placements and internships. Learn from others,
            understand real questions, and prepare smarter.
          </p>

          <p className="text-gray-600 mt-4 text-sm leading-relaxed">
            Whether you are preparing for your first interview or aiming for top
            companies, this platform helps you with real insights.
          </p>
          <p className="text-green-600 font-medium mt-5 cursor-pointer">
            Dive into Stories →
          </p>

          <div className="mt-8 border rounded-xl p-5 shadow-sm bg-white border-green-400">
            <h3 className="text-lg font-semibold text-gray-900">
              Share Your Journey
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Contribute your interview experience and help others prepare
              better.
            </p>
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4 border-green-400">
            <span className="text-green-600 text-sm font-medium">
              New Stories
            </span>

            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              Latest Insights
            </span>
          </div>

          <div className="space-y-4">
            <div className="border rounded-lg p-3 hover:bg-gray-50 transition cursor-pointer">
              <p className="text-xs text-gray-400">10 mins read • Recently</p>
              <p className="text-sm font-medium text-gray-800">
                Amazon SDE Interview Experience
              </p>
            </div>

            <div className="border rounded-lg p-3 hover:bg-gray-50 transition cursor-pointer">
              <p className="text-xs text-gray-400">5 mins read • Recently</p>
              <p className="text-sm font-medium text-gray-800">
                Google Internship Experience
              </p>
            </div>

            <div className="border rounded-lg p-3 hover:bg-gray-50 transition cursor-pointer">
              <p className="text-xs text-gray-400">7 mins read • Recently</p>
              <p className="text-sm font-medium text-gray-800">
                Microsoft Placement Experience
              </p>
            </div>

            <div className="border rounded-lg p-3 hover:bg-gray-50 transition cursor-pointer">
              <p className="text-xs text-gray-400">12 mins read • Recently</p>
              <p className="text-sm font-medium text-gray-800">
                Flipkart SDE Interview Guide
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
