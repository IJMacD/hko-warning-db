import { useEffect, useState } from "react";
import warnings from '/warnings.csv?url';
import { CSVDB } from "csvdb";

export function useWarningsDB() {
    const [ data, setData ] = useState(null as CSVDB|null);

    useEffect(() => {
        fetch(warnings).then(r => r.text()).then(d => {
            setData(new CSVDB(d));
        });
    }, []);

    return data;
}