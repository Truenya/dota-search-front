import {ItemTypeC, Player,} from "../../shared";
import {useAppSelector} from "../app/hooks";
import {MessageProps} from "../list-item/message/Message";

export const filterBySearch = (arr: Player[] | MessageProps[], term: string) => {
    if (term.trim() === '') return arr;
    return arr.filter((item: Player | MessageProps) => {
        const {Data} = item;
        if (Data === undefined) return false;
        const lowerLabel = Data!.toLowerCase();
        return lowerLabel.indexOf(term.toLowerCase()) > -1;
    });
};

export const filterByState = (itemz) => {
    let items = [...itemz];
    const {filter} = useAppSelector(state => state);
    const {positions, ItemType, MMR} = filter;
    if ([ItemTypeC.PLAYER, ItemTypeC.COMMAND].includes(ItemType)) {
        items = items.filter((p: Player) => {
            // @ts-ignore FIXME
            return Object.entries(p.PossiblePos).some(([k, v]) => {
                return positions[k] && positions[k] === v;
            });
        })
            .filter((p: Player) => {
                const pts = +p.MMR;
                return pts > MMR[0];
            })
            .filter((p: Player) => {
                const pts = +p.MMR;
                return pts < MMR[1];
            })

    }
    return items;
};