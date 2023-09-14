#!/bin/sh

TMP_DB="tmp-$RANDOM.csv"

csvdb "CREATE TABLE \"$TMP_DB\" (code,start,end)";

(
    echo "id,category,name,type,direction,startTime,startDay,startMonth,startYear,startSorx,endTime,endDay,endMonth,endYear,endSorx,duration";
    curl -s "https://www.hko.gov.hk/dps/wxinfo/climat/warndb/tc.dat" | tr "\t" "," | grep -v UUUU;
) | csvdb "INSERT INTO \"$TMP_DB\" SELECT 'TC_'||type AS code, MAKE_DATETIME(startYear,startMonth,startDay,startTime/100,startTime%100) AS start, MAKE_DATETIME(endYear,endMonth,endDay,endTime/100,endTime%100) AS end WHERE type != 'X'";

(
    echo "id,category,name,type,direction,startTime,startDay,startMonth,startYear,startSorx,endTime,endDay,endMonth,endYear,endSorx,duration";
    curl -s "https://www.hko.gov.hk/dps/wxinfo/climat/warndb/tc.dat" | tr "\t" "," | grep -v UUUU;
) | csvdb "INSERT INTO \"$TMP_DB\" SELECT category AS code, MAKE_DATETIME(startYear,startMonth,startDay,startTime/100,startTime%100) AS start, MAKE_DATETIME(endYear,endMonth,endDay,endTime/100,endTime%100) AS end WHERE category = 'MSN'";

(
    echo "type,startYear,startMonth,startDay,startHour,startMinute,endYear,endMonth,endDay,endHour,endMinute,durationHours,durationMinutes";
    curl -s "https://www.hko.gov.hk/dps/wxinfo/climat/warndb/rstorm.dat" | tr "\t" "," | grep -v UUUU;
) | csvdb "INSERT INTO \"$TMP_DB\" SELECT 'RAIN_'||type AS code, MAKE_DATETIME(startYear,startMonth,startDay,startHour,startMinute) AS start, MAKE_DATETIME(endYear,endMonth,endDay,endHour,endMinute) AS end";

(
    echo "startYear,startMonth,startDay,startHour,startMinute,endYear,endMonth,endDay,endHour,endMinute,durationHours,durationMinutes";
    curl -s "https://www.hko.gov.hk/dps/wxinfo/climat/warndb/lslip.dat" | tr "\t" "," | grep -v UUUU;
) | csvdb "INSERT INTO \"$TMP_DB\" SELECT 'LS' AS code, MAKE_DATETIME(startYear,startMonth,startDay,startHour,startMinute) AS start, MAKE_DATETIME(endYear,endMonth,endDay,endHour,endMinute) AS end";

(
    echo "startYear,startMonth,startDay,startHour,startMinute,endYear,endMonth,endDay,endHour,endMinute,durationHours,durationMinutes";
    curl -s "https://www.hko.gov.hk/dps/wxinfo/climat/warndb/thunder.dat" | tr "\t" "," | grep -v UUUU;
) | csvdb "INSERT INTO \"$TMP_DB\" SELECT 'THUNDER' AS code, MAKE_DATETIME(startYear,startMonth,startDay,startHour,startMinute) AS start, MAKE_DATETIME(endYear,endMonth,endDay,endHour,endMinute) AS end";

(
    echo "type,startYear,startMonth,startDay,startHour,startMinute,endYear,endMonth,endDay,endHour,endMinute,durationHours,durationMinutes";
    curl -s "https://www.hko.gov.hk/dps/wxinfo/climat/warndb/fire.dat" | tr "\t" "," | grep -v UUUU;
) | csvdb "INSERT INTO \"$TMP_DB\" SELECT 'FIRE_'||type AS code, MAKE_DATETIME(startYear,startMonth,startDay,startHour,startMinute) AS start, MAKE_DATETIME(endYear,endMonth,endDay,endHour,endMinute) AS end";

(
    echo "startYear,startMonth,startDay,startHour,startMinute,endYear,endMonth,endDay,endHour,endMinute,durationHours,durationMinutes";
    curl -s "https://www.hko.gov.hk/dps/wxinfo/climat/warndb/frost.dat" | tr "\t" "," | grep -v UUUU;
) | csvdb "INSERT INTO \"$TMP_DB\" SELECT 'FROST' AS code, MAKE_DATETIME(startYear,startMonth,startDay,startHour,startMinute) AS start, MAKE_DATETIME(endYear,endMonth,endDay,endHour,endMinute) AS end";

(
    echo "startYear,startMonth,startDay,startHour,startMinute,endYear,endMonth,endDay,endHour,endMinute,durationHours,durationMinutes";
    curl -s "https://www.hko.gov.hk/dps/wxinfo/climat/warndb/cold.dat" | tr "\t" "," | grep -v UUUU;
) | csvdb "INSERT INTO \"$TMP_DB\" SELECT 'COLD' AS code, MAKE_DATETIME(startYear,startMonth,startDay,startHour,startMinute) AS start, MAKE_DATETIME(endYear,endMonth,endDay,endHour,endMinute) AS end";

(
    echo "startYear,startMonth,startDay,startHour,startMinute,endYear,endMonth,endDay,endHour,endMinute,durationHours,durationMinutes";
    curl -s "https://www.hko.gov.hk/dps/wxinfo/climat/warndb/hot.dat" | tr "\t" "," | grep -v UUUU;
) | csvdb "INSERT INTO \"$TMP_DB\" SELECT 'HOT' AS code, MAKE_DATETIME(startYear,startMonth,startDay,startHour,startMinute) AS start, MAKE_DATETIME(endYear,endMonth,endDay,endHour,endMinute) AS end";

(
    echo "startYear,startMonth,startDay,startHour,startMinute,endYear,endMonth,endDay,endHour,endMinute,durationHours,durationMinutes";
    curl -s "https://www.hko.gov.hk/dps/wxinfo/climat/warndb/nf.dat" | tr "\t" "," | grep -v UUUU;
) | csvdb "INSERT INTO \"$TMP_DB\" SELECT 'NF' AS code, MAKE_DATETIME(startYear,startMonth,startDay,startHour,startMinute) AS start, MAKE_DATETIME(endYear,endMonth,endDay,endHour,endMinute) AS end";

csvdb -F json "FROM \"$TMP_DB\" ORDER BY start";

rm $TMP_DB;