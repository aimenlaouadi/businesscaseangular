export interface ApiListResponse<EntityType> {
    '@id': string;
    'hydra:totalItems': number;
    'hydra:member': EntityType[];
}