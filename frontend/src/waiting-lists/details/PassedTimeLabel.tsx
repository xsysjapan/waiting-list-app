import * as React from "react";

export function convertToPassedTimeString(diffInSeconds: number): string {
  if (diffInSeconds < 10) {
    return "数秒前";
  }
  if (diffInSeconds < 20) {
    return "10秒前";
  }
  if (diffInSeconds < 30) {
    return "20秒前";
  }
  if (diffInSeconds < 40) {
    return "30秒前";
  }
  if (diffInSeconds < 50) {
    return "40秒前";
  }
  if (diffInSeconds < 60) {
    return "50秒前";
  }
  if (diffInSeconds < 3600) {
    return Math.floor(diffInSeconds / 60) + "分前";
  }
  if (diffInSeconds < 86400) {
    return Math.floor(diffInSeconds / 3600) + "時間前";
  }
  return Math.floor(diffInSeconds / 86400) + "日前";
}

export type PassedTimeLabelProps = {
  diffInSeconds: number;
};

export const PassedTimeLabel = (props: PassedTimeLabelProps) => {
  const { diffInSeconds } = props;
  const baseTime = React.useMemo(
    () => Date.now() - diffInSeconds * 1000,
    [diffInSeconds]
  );
  const [currentValue, setCurrentValue] = React.useState(
    convertToPassedTimeString(diffInSeconds)
  );
  React.useEffect(() => {
    if (currentValue.endsWith("日前")) {
      return;
    }
    if (currentValue.endsWith("秒前")) {
      const handle = setInterval(() => {
        setCurrentValue(
          convertToPassedTimeString((Date.now() - baseTime) / 1000)
        );
      }, 1000);
      return () => clearInterval(handle);
    }
    const handle = setInterval(() => {
      setCurrentValue(
        convertToPassedTimeString((Date.now() - baseTime) / 1000)
      );
    }, 10000);
    return () => clearInterval(handle);
  }, [currentValue, baseTime]);
  return <>{currentValue}</>;
};

export default PassedTimeLabel;
