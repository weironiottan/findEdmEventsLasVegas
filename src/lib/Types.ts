export const Months = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sept',
    'oct',
    'nov',
    'dec'
]


export const Weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
]

export enum EdmEventInputId {
    artistName = "artistName",
    venue = "venue",
    inputDate = "date",
}


// You can define your data type
export interface EdmEventInterface {
    Id: string;
    ClubName: string;
    ArtistName: string;
    EventDate: string;
    TicketUrl: string;
}