// import { createApi } from '@reduxjs/toolkit/query/react'
// import {Positions, ItemTypeC} from "../../shared";
// import {createEntityAdapter} from "@reduxjs/toolkit";
//
//
// export type ItemTypo = ItemTypeC.PLAYER | ItemTypeC.COMMAND | ItemTypeC.MESSAGE | 'error';
//
// export interface Message {
//     msg_type: ItemTypo,
//     ID?: number,
//     Hash?: string,
//     Ip?: string,
//     Timestamp?: string,
//     Data: string,
//         Link: string,
//     PossiblePos?: Positions,
// }
//
// const messagesAdapter = createEntityAdapter<Message>()
// export const api = createApi({
//     baseQuery: ({ baseUrl: '/ws' }),
//     endpoints: () => ({
//         getMessages: ({
//             query: (itemType) => `item/${itemType}`,
//             transformResponse(response: Message[]) {
//                 return messagesAdapter.addMany(
//                     messagesAdapter.getInitialState(),
//                     response
//                 )
//             },
//             async onCacheEntryAdded(
//                 arg,
//                 { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
//             ) {
//                 // create a websocket connection when the cache subscription starts
//                 const ws = new WebSocket('ws://95.31.249.76:322')
//                 try {
//                     // wait for the initial query to resolve before proceeding
//                     await cacheDataLoaded
//
//                     // when data is received from the socket connection to the server,
//                     // if it is a message and for the appropriate channel,
//                     // update our query result with the received message
//                     const listener = (event: MessageEvent) => {
//                         const data = JSON.parse(event.data)
//                         console.log("got data", event.data)
//                         // if (!isMessage(data) || data.channel !== arg) return
//                         if (data.channel !== arg) return
//
//                         updateCachedData((draft) => {
//                             messagesAdapter.upsertOne(draft, data)
//                         })
//                     }
//
//                     ws.addEventListener('message', listener)
//                 } catch {
//                     // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
//                     // in which case `cacheDataLoaded` will throw
//                 }
//                 // cacheEntryRemoved will resolve when the cache subscription is no longer active
//                 await cacheEntryRemoved
//                 // perform cleanup steps once the `cacheEntryRemoved` promise resolves
//                 ws.close()
//             },
//         }),
//     }),
// })
//
// export const { useGetMessagesQuery } = api