export type UpdateOptions = {
    maxDepth?: number;
    createCopy?: boolean;
};
export declare function deepUpdate(data: any, key: string, value: any, newData: object, options?: UpdateOptions, currentDepth?: number, visited?: WeakSet<object>): boolean;
