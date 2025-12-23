// Add image import
const aboutBg = new URL('/images/About-bg.png', import.meta.url).href;
const schoolImg = new URL('/images/school.png', import.meta.url).href;
const bscImg = new URL('/images/bsc.png', import.meta.url).href;
const itiImg = new URL('/images/iti.png', import.meta.url).href;

const AboutBanner = () => {
  return (
    <section
      className="w-full py-16 md:py-24 bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${aboutBg})` }}
    >
      <div className="container mx-auto px-4">

        <div className="grid md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="rounded-xl overflow-hidden shadow-xl bg-white/95">
            <img src={schoolImg} className="w-full h-52 object-cover" />

            <div className="bg-blue-700 text-white text-center py-4">
              <h3 className="text-xl font-bold">School Classes 9th to 12th</h3>
              <p className="text-sm opacity-90">Biology & Mathematics</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl overflow-hidden shadow-xl bg-white/95">
            <img src={bscImg} className="w-full h-52 object-cover" />

            <div className="bg-indigo-700 text-white text-center py-4">
              <h3 className="text-xl font-bold">B.Sc Coaching</h3>
              <p className="text-sm opacity-90">
                Zoology • Botany • Chemistry • Physics • Mathematics
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl overflow-hidden shadow-xl bg-white/95">
            <img src={itiImg} className="w-full h-52 object-cover" />

            <div className="bg-orange-600 text-white text-center py-4">
              <h3 className="text-xl font-bold">ITI Courses</h3>
              <p className="text-sm opacity-90">
                Technical & Vocational Training
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutBanner;
