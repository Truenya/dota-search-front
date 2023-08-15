import './list-item.css';
import PlayerCard from './player/PlayerCard';
import Message, {MessageProps} from './message/Message';
import CommandCard from "./command/CommandCard";
import React from 'react';
import {FIXMELATER} from "../../shared/Constants";

// FIXME почему сюда itemType приходит? Хочу ItemType
const ListItem = (props: MessageProps | FIXMELATER) => {
    switch (props.itemType) {
        case 'player':
            return <PlayerCard {...props}/>;
        case 'message':
            return <Message {...props}/>;
        case 'command':
            return <CommandCard {...props}/>;
        default:
            return (
                <div className="container-fluid list-item">
                    <div className="row">
                        {JSON.stringify(props)}
                    </div>
                </div>
            );
    }
};

export default ListItem;
