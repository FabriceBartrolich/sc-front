export interface Show {
    id?: number;
    title?:string;
    name?: string;
    is_finished?: boolean;
    description?: string | null;
    poster_path: string;
    id_user?: number;
    is_viewed?: boolean;
    is_wished?: boolean;
}
