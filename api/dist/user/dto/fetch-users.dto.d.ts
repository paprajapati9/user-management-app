export declare enum SortOrder {
    DESC = "desc",
    ASC = "asc"
}
export declare class FetchUsersDto {
    query: string;
    offset: number;
    limit: number;
    order: 'asc' | 'desc';
    sortKey: string;
}
