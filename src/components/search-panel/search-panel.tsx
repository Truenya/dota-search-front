import './search-panel.css';
import React from 'react';
import {useAppSelector} from "../app/hooks";
import {useActions} from "../../store/useActions";

const SearchPanel = () => {
    const search = useAppSelector(state => state.search.term);
    const {setTerm} = useActions();
    return (
        <input type="text"
               className="form-control search-input input-group-text"
               placeholder="Type to search"
               onChange={(e) => setTerm(e.target.value)}
               value={search}
        />
    );
};

export default SearchPanel;
