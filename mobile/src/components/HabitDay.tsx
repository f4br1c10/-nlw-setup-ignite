import { TouchableOpacity, TouchableOpacityProps ,Dimensions } from "react-native";
import dayjs from "dayjs";

import { generateProgressPorcetage } from "../lib/generate-progress-porcetage";

import clsx from "clsx";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5);

interface Props extends TouchableOpacityProps {
  amountOfHabits?: number;
  amountCompleted?: number;
  date: Date
}

export function HabitDay({ amountOfHabits = 0, amountCompleted = 0, date, ...rest }: Props) {

  const amountAccomplishedPercetage = amountOfHabits > 0 ? generateProgressPorcetage(amountOfHabits, amountCompleted) : 0
  const today = dayjs().startOf('day').toDate()
  const isCurrentDay = dayjs(date).isSame(today)

  return (
    <TouchableOpacity
      className={clsx("rounded-lg border-2 m-1", {
        ["bg-zinc-900 border-zinc-800"] : amountAccomplishedPercetage === 0,
        ["bg-violet-900 border-violet-700"] : amountAccomplishedPercetage > 0 && amountAccomplishedPercetage < 20,
        ["bg-violet-800 border-violet-600"] : amountAccomplishedPercetage >= 20 && amountAccomplishedPercetage < 40,
        ["bg-violet-700 border-violet-500"] : amountAccomplishedPercetage >= 40 && amountAccomplishedPercetage < 60,
        ["bg-violet-600 border-violet-500"] : amountAccomplishedPercetage >= 60 && amountAccomplishedPercetage < 80,
        ["bg-violet-500 border-violet-400"] : amountAccomplishedPercetage >= 80,
        ["border-white border-4"] : isCurrentDay
      })}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.7}
      {...rest}
    />
  );
}