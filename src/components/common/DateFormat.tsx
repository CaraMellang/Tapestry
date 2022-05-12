import dayjs from "dayjs";
import React, { useEffect, useLayoutEffect, useState } from "react";

interface DateFormatProps {
  dateValue: string | Date;
}

export default function DateFormat(dateValue: string | Date) {
  const [format, setFormat] = useState(
    dayjs(dateValue).format("YYYY년MM월DD일 HH:mm")
  );

  useEffect(() => {
    let currentDate = new Date();
    let itemDate = dayjs(dateValue);
    if (
      currentDate.getFullYear() === itemDate.get("year") &&
      currentDate.getMonth() + 1 === itemDate.get("month") + 1 &&
      currentDate.getDate() === itemDate.get("date") &&
      currentDate.getHours() - dayjs(itemDate).get("hour") === 0
    ) {
      setFormat(
        `${currentDate.getMinutes() - dayjs(itemDate).get("minute")}분 전`
      );
    } else if (
      currentDate.getFullYear() === itemDate.get("year") &&
      currentDate.getMonth() + 1 === itemDate.get("month") + 1 &&
      currentDate.getDate() === itemDate.get("date")
    ) {
      setFormat(
        `${currentDate.getHours() - dayjs(itemDate).get("hour")}시간 전`
      );
    } else if (itemDate.get("hour") < 12) {
      setFormat(dayjs(itemDate).format(`YYYY년MM월DD일 오전 HH:mm`));
    } else if (itemDate.get("hour") >= 12) {
      setFormat(dayjs(itemDate).format(`YYYY년MM월DD일 오후 hh:mm`));
    }
  }, [dateValue]);
  return format;
}
