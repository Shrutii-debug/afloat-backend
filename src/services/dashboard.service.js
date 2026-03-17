import { getTodayClassCountService } from "./timetable.service.js";
import { getUrgentNoticeCountService } from "./notice.service.js";
import { getInternshipsService } from "./internship.service.js";

export const getDashboardService = async (user) => {
  const todayClasses = await getTodayClassCountService(user);
  const urgentNotices = await getUrgentNoticeCountService(user);
  const internships = await getInternshipsService();

  return {
    name: user.name,
    todayClasses,
    urgentNotices,
    internshipCount: internships.length,
  };
};