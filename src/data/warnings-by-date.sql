FROM CALENDAR LEFT JOIN warnings ON date BETWEEN DATE(start) AND DATE(end) WHERE year = 2023 AND date <= CURRENT_DATE GROUP BY date SELECT date, LISTAGG(code)