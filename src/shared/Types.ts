import {ItemType, ItemTypeC} from "./Constants";
import {getId} from "./util";

const posToString = {
    5: 'HardSupport',
    4: 'SoftSupport',
    3: 'Offlane',
    2: 'Midlane',
    1: 'Carry',
}
const stringToPos = {
    'HardSupport': 5,
    'SoftSupport': 4,
    'Offlane': 3,
    'Midlane': 2,
    'Carry': 1,
}

export type PositionType = 'HardSupport'|'SoftSupport'|'Offlane'|'Midlane'|'Carry';

export interface Positions {
    HardSupport: boolean,
    SoftSupport: boolean,
    Offlane: boolean,
    Midlane: boolean,
    Carry: boolean,
}

export function NewPositions(a: boolean) {
    return {
        HardSupport: a,
        SoftSupport: a,
        Offlane: a,
        Midlane: a,
        Carry: a,
    };
}

export function FromArray(a: number[]) {
    const positions = NewPositions(false);
    a.map(p => { // @ts-ignore
        positions[posToString[p]] = true
    });
    console.log(positions);
    return positions;
}

export function ToArray(p) {
    const positions: number[] = [];
    Object.entries(p).map(([k, v]) => {// @ts-ignore
        if (v) {
            positions.push(stringToPos[k])
        }
    });
    console.log(positions)
    return positions;
}

export interface Player_ {
    Data: string,
    Link: string,
    MMR: string,
    PossiblePos: Positions,
    ItemType: ItemType,
    Ip: string,
    key: string,
}

export function NewPlayer(){
    return {
        Data: '',
        Link: '',
        MMR: '',
        PossiblePos: NewPositions(true),
        ItemType: ItemTypeC.PLAYER,
        Ip: '',
        key: getId('player_'),
    }
}

export function NewCommand(){
    const a = NewPlayer();
    a.ItemType = ItemTypeC.COMMAND;
    return a;
}

export class Filter {
    ItemType: ItemType = ItemTypeC.MESSAGE
    positions: Positions = NewPositions(true);
    MMR: number[] = [0, 12000]
}