/* eslint-disable @typescript-eslint/no-explicit-any */
import { addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, isEqual, isSameMonth, isToday, startOfMonth, startOfWeek, subMonths } from "date-fns";
import { useCallback, useMemo, useState } from "react";
import CorePackage, { MessageEvents } from "@aycom366/web-sdk-template";

function App() {
  const days = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const daysInMonthIncludingStartAndEndOfWeek = useMemo(() => {
    return eachDayOfInterval({
      start: startOfWeek(startOfMonth(currentMonth)),
      end: endOfWeek(endOfMonth(currentMonth)),
    });
  }, [currentMonth]);

  const openWidget = useCallback(() => {
    const widgetPackage = new CorePackage({
      onEvent(event, data) {
        switch (event) {
          case MessageEvents.WIDGET_LOADED:
            console.log("loaded", data);
            break;
          case MessageEvents.WIDGET_CLOSED:
            console.log("closed", data);
            break;
          case MessageEvents.WIDGET_OPENED:
            console.log("widget opened", data);
            break;
          case MessageEvents.WIDGET_LOAD_ERROR:
            console.log("widget load error", data);
            break;
        }
      },
      publicKey: "Ayomide",
      meta: {
        order_ref: "kjdjkdjkdjds",
        custom: "pass anything",
      },
    });
    widgetPackage.setup();
    widgetPackage.open();
  }, []);

  return (
    <div className="w-screen h-screen grid items-center">
      <div className="flex gap-8 items-center justify-center flex-col">
        <h1 className="text-3xl">React Calendar </h1>
        <button onClick={openWidget}>open widget</button>
        <div className="flex gap-6  shadow-xl p-6 rounded-lg w-full max-w-lg flex-col">
          <p className="text-center">Selected date: {selectedDate.toDateString()}</p>
          <div className="flex justify-around ">
            <button onClick={prevMonth}>Prev</button>
            <h2>{format(currentMonth, "MMMM yyyy")}</h2>
            <button onClick={nextMonth}>Next</button>
          </div>
          <div className="flex flex-col gap-4">
            <header className="grid gap-4 w-full place-items-center  grid-cols-7">
              {days.map((day) => (
                <h3 key={day}>{day}</h3>
              ))}
            </header>
            <ul className="grid w-full gap-4 place-items-center  grid-cols-7">
              {daysInMonthIncludingStartAndEndOfWeek.map((date) => (
                <li key={date.toISOString()}>
                  <button
                    onClick={() => setSelectedDate(date)}
                    className={`w-[40px] cursor-pointer rounded-[20px] h-[40px] items-center justify-center flex relative
                              ${!isEqual(date, selectedDate) && "hover:bg-[#f1f1f1]"} ${isEqual(date, selectedDate) && "bg-[#3F5BF6] text-white"}
                              ${isSameMonth(date, new Date()) ? "text-[#344054]" : "text-[#b7b2b2]"}`}
                  >
                    <time dateTime={format(date, "yyyy-MM-dd")}>{format(date, "d")}</time>
                    {isToday(date) && <div className="w-[5px] bottom-1 rounded-full bg-[#3F5BF6] absolute  h-[5px]" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
