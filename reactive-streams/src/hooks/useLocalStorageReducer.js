import {useReducer, useEffect} from 'react';

const useLocalStorageReducer = (key, defaultValue, reducer) => {
    const [state, dispatch] = useReducer(reducer, defaultValue, () => {
        let val;
        try {
            val = JSON.parse(window.localStorage.getItem(key) || String(defaultValue));            
        } catch (err) {
            val = defaultValue;
        }
        return val;
    })

    useEffect(()=>{
        window.localStorage.setItem(key, JSON.stringify(state));
    }, [state, key]);

    return [state, dispatch];
};

export {useLocalStorageReducer};