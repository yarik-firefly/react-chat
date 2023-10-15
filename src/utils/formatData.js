import { formatDistance, subDays } from "date-fns";
import ru from "date-fns/locale/ru";

const formatData = (date) => {
  return formatDistance(date, new Date(), {
    addSuffix: true,
    locale: ru,
  });
};

export { formatData };
