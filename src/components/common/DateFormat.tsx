import dayjs from "dayjs";
import React, { useLayoutEffect, useState } from "react";

interface DateFormatProps {
  dateValue: string | Date;
}

export default function DateFormat({ dateValue }: DateFormatProps) {
  const [format, setFormat] = useState(
    dayjs(dateValue).format("YYYY년MM월DD일 HH:mm")
  );

  useLayoutEffect(() => {
    let currentDate = new Date();
    let itemDate = dayjs(dateValue);
    if (
      currentDate.getFullYear() === itemDate.get("year") &&
      currentDate.getMonth() + 1 === itemDate.get("month") &&
      currentDate.getDate() === itemDate.get("date")
    ) {
      setFormat(dayjs(itemDate).format("HH시간 전"));
    }
    if (itemDate.get("month") >= 12) {
    }
  }, []);
  return format
}
