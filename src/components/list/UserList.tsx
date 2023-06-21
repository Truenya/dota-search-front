import PlayerCard from "../list-item/player";
import {FIXMELATER} from "../../shared/Constants";
import {PlayerProps} from "../list-item/player/PlayerCard";
import Loader from "../common/loader";

export const UserList=(props: FIXMELATER)=>
{
    const {items, loaded} = props;
    // @ts-ignore
    if (!loaded ) return <Loader/>;
    const elements = items.map((item: PlayerProps) => {
        return (
            // @ts-ignore
            <li key={item.key} className="list-group-item">
                <PlayerCard
                    {...item}
                />
            </li>
        );
    });
    return (
        // @ts-ignore
        <ul className="list-group list">
            {elements}
        </ul>
    );
}