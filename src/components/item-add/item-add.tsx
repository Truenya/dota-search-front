import React, {useState} from 'react';
import './item-add.css';
import {ItemTypeC, Player} from '../../shared';
import {CommandModal, PlayerModal} from "./Modals";
import {useAppSelector} from "../app/hooks";
import {api} from "../../services/DotaSearchService/DotaSearchService";

// Контроллер модалки с кнопкой активации
export const ItemAdd = () => {
    const [modalActive, setModalActive] = useState(false);
    const {itemType} = useAppSelector(state => state.filter);
    const onSubmitPlayer = (v: Player) => {
        api.SendToWs(v);
        setModalActive(false);
    };
    const onSubmitCommand = (v: Player) => {
        api.SendToWs(v);
        setModalActive(false);
    };
    if (itemType === ItemTypeC.MESSAGE) return (<div/>);
    if (itemType === ItemTypeC.COMMAND)
        return (
            <CommandModal onClick={() => {
                setModalActive(true);
            }} active={modalActive} active1={setModalActive} onAddCommand={onSubmitCommand}/>
        );

    return (
        <PlayerModal onClick={() => {
            setModalActive(true);
        }} active={modalActive} active1={setModalActive} onAddPlayer={onSubmitPlayer}/>
    );
};
