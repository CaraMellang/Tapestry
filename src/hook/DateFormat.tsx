import dayjs from "dayjs";
import React, { useEffect, useLayoutEffect, useState } from "react";

interface DateFormatProps {
  dateValue: string | Date;
  shortToggle?: boolean;
}
// https://kdinner.tistory.com/68
export default function DateFormat(
  dateValue: string | Date,
  isShort: boolean = false
) {
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
      if (currentDate.getMinutes() - dayjs(itemDate).get("minute") === 0) {
        setFormat("방금 전");
      } else {
        setFormat(
          `${currentDate.getMinutes() - dayjs(itemDate).get("minute")}분 전`
        );
      }
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
  }, [dateValue, isShort]);
  return format;
}
