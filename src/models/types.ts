
export interface IPosition{
    id: number;
    name: string;
    description: string;
    parentId: number | null;
    children: IPosition[];
}