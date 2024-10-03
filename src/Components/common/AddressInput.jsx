import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { AutoComplete } from 'primereact/autocomplete';
import axios from 'axios';
import { getAddressSuggesitions } from '../../utils/api';

const AddressInput = ({control, name, placeholder}) => {
    const [suggestions, setSuggestions] = useState([]);
    const [query, setQuery] = useState('');

    const fetchAddressSuggestions = async (query) => {
        const timeout = setTimeout(async () => {
            try {
                const link = getAddressSuggesitions(query);
                const res = await axios.get(link);
                const data = res.data.data.map((data) => ({
                    name: data.address, value: data.address
                }))
                setSuggestions(data);
            } catch (error) {
                setSuggestions([]);
                throw new Error(error);
            }
        }, 500);
        return () => {
            clearInterval(timeout)
        }
    };

    useEffect(() => {
        if (query !== '') {
            fetchAddressSuggestions(query);
        } else {
            setSuggestions([]);
        }
    }, [query]);

    const handleAutoCompleteChange = (e) => {
        const value = e.query;
        setQuery(value);
    };
    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <AutoComplete
                    className='w-full' placeholder={placeholder}
                    value={field.value}
                    suggestions={suggestions}
                    completeMethod={handleAutoCompleteChange}
                    field="name"
                    onChange={(e) => field.onChange(e.value)}
                />
            )}
        />
    )
}

export default AddressInput;