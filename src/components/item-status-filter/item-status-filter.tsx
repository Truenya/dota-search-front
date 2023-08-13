import './item-status-filter.css';
import {getId} from '../../shared';
import React from 'react';
import {useSelector} from "react-redux";
import {useActions} from "../../store/useActions";


const Button = (props: { filter: string; label: string; onClick: (ItemType: ItemType) => void; }) => {
    const {filter, label, onClick} = props;
    let lower = label.toLowerCase();
    if (lower !== 'all') lower = lower.slice(0, -1);
    const className = filter === lower ? 'btn-grad' : 'btn-outline-secondary';
    return (
        <button type="button"
                className={`btn ${className}`}
                onClick={() => {
                    onClick(lower);
                }}>
            {label}
        </button>
    );
};

const ItemStatusFilter = () => {
    const {setItemType} = useActions();

    const filter = useSelector((state) => state.filter);
    const onChangeFilter = (itemType) => {
        setItemType(itemType);
    }

    const buttons = ['Messages', 'Commands', 'Players'].map(el => {
        const id = getId('filter_');
        return (<Button filter={filter.ItemType} label={el} onClick={onChangeFilter} key={id}/>);
    });
    return (
        <div className="btn-group">
            {buttons}
        </div>
    );
};

export default ItemStatusFilter;
