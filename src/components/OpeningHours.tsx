import React from 'react';
import { Clock, CheckCircle2, XCircle, AlertCircle, Calendar } from 'lucide-react';
import { CAFE_DATA, getOpeningStatus } from '../data/cafeData';

export const OpeningHours: React.FC = () => {
  const status = getOpeningStatus();

  return (
    <section id="oeffnungszeiten" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider bg-[#eeeae4] text-[#4a3728] mb-3">
              <Clock className="w-3.5 h-3.5" />
              Zeiten & Tage
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#2d2d2d] tracking-tight">
              Öffnungszeiten
            </h2>
            <p className="mt-2 text-base text-[#6e6359]">
              Wir freuen uns darauf, dich im Eiscafé Ambiente in Pößneck zu begrüßen.
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#eeeae4] shadow-xs relative overflow-hidden">
            {/* Top Status Banner (Dynamic Calculation) */}
            <div
              className={`rounded-xl p-5 mb-8 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                status.isOpenRightNow
                  ? 'bg-[#eef5ed] border-[#d2e3d3] text-[#2d5f30]'
                  : status.isTodayOpen
                  ? 'bg-[#f4efe8] border-[#eeeae4] text-[#635547]'
                  : 'bg-[#faeded] border-[#f0d4d4] text-[#823535]'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-white shadow-2xs">
                  {status.isOpenRightNow ? (
                    <CheckCircle2 className="w-6 h-6 text-[#2d5f30]" />
                  ) : status.isTodayOpen ? (
                    <Clock className="w-6 h-6 text-[#4a3728]" />
                  ) : (
                    <XCircle className="w-6 h-6 text-[#823535]" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold font-serif-title">
                      {status.statusHeadline}
                    </span>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                        status.isOpenRightNow
                          ? 'bg-[#2d5f30] text-white'
                          : status.isTodayOpen
                          ? 'bg-[#4a3728] text-white'
                          : 'bg-[#823535] text-white'
                      }`}
                    >
                      {status.statusBadge}
                    </span>
                  </div>
                  <p className="text-sm mt-0.5 opacity-90">{status.statusSubtext}</p>
                </div>
              </div>

              <div className="sm:text-right shrink-0">
                <span className="text-xs uppercase tracking-wider font-medium opacity-75">
                  Wochentag
                </span>
                <p className="text-sm font-semibold text-[#2d2d2d] flex items-center gap-1.5 sm:justify-end">
                  <Calendar className="w-3.5 h-3.5 text-[#4a3728]" />
                  {status.todaySchedule.dayName}
                </p>
              </div>
            </div>

            {/* List of Days - dynamically mapped from central CAFE_DATA */}
            <div className="divide-y divide-[#eeeae4]">
              {CAFE_DATA.openingHours.map((schedule) => {
                const isToday = schedule.dayIndex === status.currentDayIndex;

                return (
                  <div
                    key={schedule.dayName}
                    className={`py-3.5 px-3 sm:px-4 rounded-lg flex items-center justify-between transition-all ${
                      isToday
                        ? 'bg-[#f4efe8] font-semibold text-[#2d2d2d] border border-[#eeeae4]'
                        : 'text-[#6e6359] hover:bg-[#fdfbf7]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-base sm:text-lg">{schedule.dayName}</span>
                      {isToday && (
                        <span className="text-[11px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#4a3728] text-white">
                          Heute
                        </span>
                      )}
                    </div>

                    <div className="text-right">
                      {schedule.isOpen ? (
                        <span
                          className={`text-sm sm:text-base ${
                            isToday ? 'text-[#4a3728] font-semibold' : 'text-[#2d2d2d]'
                          }`}
                        >
                          {schedule.displayHours}
                        </span>
                      ) : (
                        <span className="text-sm sm:text-base text-[#823535] font-medium italic">
                          {schedule.displayHours} (Ruhetag)
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Subtext info regarding seasonal & local notes */}
            <div className="mt-8 pt-6 border-t border-[#eeeae4] flex items-start gap-3 text-xs sm:text-sm text-[#8b7e74]">
              <AlertCircle className="w-4 h-4 text-[#4a3728] shrink-0 mt-0.5" />
              <p>
                An gesetzlichen Feiertagen können die Öffnungszeiten abweichen. Bei Fragen oder für Reservierungen erreichst du uns gerne telefonisch unter{' '}
                <a
                  href={`tel:${CAFE_DATA.phones.landlineRaw}`}
                  className="font-medium text-[#4a3728] underline hover:text-[#3a2c20]"
                >
                  {CAFE_DATA.phones.landline}
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
