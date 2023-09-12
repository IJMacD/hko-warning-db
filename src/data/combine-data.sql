CREATE TABLE warnings AS FROM cold.tsv SELECT 'COLD' AS "code", MAKE_DATETIME(startYear,startMonth,startDay,startHour,startMinute,0) AS start, MAKE_DATETIME(endYear,endMonth,endDay,endHour,endMinute,0) AS end
INSERT INTO warnings FROM fire.tsv SELECT 'FIRE_'||code AS "code", MAKE_DATETIME(startYear,startMonth,startDay,startHour,startMinute,0) AS start, MAKE_DATETIME(endYear,endMonth,endDay,endHour,endMinute,0) AS end;
INSERT INTO warnings FROM frost.tsv SELECT 'FROST' AS "code", MAKE_DATETIME(startYear,startMonth,startDay,startHour,startMinute,0) AS start, MAKE_DATETIME(endYear,endMonth,endDay,endHour,endMinute,0) AS end;
INSERT INTO warnings FROM hot.tsv SELECT 'HOT' AS "code", MAKE_DATETIME(startYear,startMonth,startDay,startHour,startMinute,0) AS start, MAKE_DATETIME(endYear,endMonth,endDay,endHour,endMinute,0) AS end;
INSERT INTO warnings FROM lslip.tsv SELECT 'LS' AS "code", MAKE_DATETIME(startYear,startMonth,startDay,startHour,startMinute,0) AS start, MAKE_DATETIME(endYear,endMonth,endDay,endHour,endMinute,0) AS end;
INSERT INTO warnings FROM nf.tsv SELECT 'FNT' AS "code", MAKE_DATETIME(startYear,startMonth,startDay,startHour,startMinute,0) AS start, MAKE_DATETIME(endYear,endMonth,endDay,endHour,endMinute,0) AS end;
INSERT INTO warnings FROM rstorm.tsv SELECT 'RAIN_'||code AS "code", MAKE_DATETIME(startYear,startMonth,startDay,startHour,startMinute,0) AS start, MAKE_DATETIME(endYear,endMonth,endDay,endHour,endMinute,0) AS end;
INSERT INTO warnings FROM thunder.tsv SELECT 'THUNDER' AS "code", MAKE_DATETIME(startYear,startMonth,startDay,startHour,startMinute,0) AS start, MAKE_DATETIME(endYear,endMonth,endDay,endHour,endMinute,0) AS end;
INSERT INTO warnings FROM tc.tsv SELECT 'TC_'||code||direction AS "code", MAKE_DATETIME(startYear,startMonth,startDay,startTime/100,startTime%100,0) AS start, MAKE_DATETIME(endYear,endMonth,endDay,endTime/100,endTime%100,0) AS end;
TABLE warnings;