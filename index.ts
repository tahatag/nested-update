export type UpdateOptions = {
  maxDepth?: number; // Optional depth limit for recursion
  createCopy?: boolean; // If true, creates a shallow copy instead of modifying the original
};

export function deepUpdate(
  data: any,
  key: string,
  value: any,
  newData: object,
  options: UpdateOptions = {},
  currentDepth: number = 0,
  visited: WeakSet<object> = new WeakSet()
): boolean {
  const { maxDepth = Infinity, createCopy = false } = options;

  // Exceeded max depth, stop recursion
  if (currentDepth > maxDepth) {
    return false;
  }

  // Circular reference check
  if (typeof data === "object" && data !== null) {
    if (visited.has(data)) {
      return false;
    }
    visited.add(data);
  }

  // Create a shallow copy if needed
  if (createCopy && currentDepth === 0) {
    data = Array.isArray(data) ? [...data] : { ...data };
  }

  // If the current data is an array, iterate over each element
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      // Create a copy for each item if needed
      if (createCopy) {
        data[i] = Array.isArray(item) ? [...item] : { ...item };
      }

      // Recursively check/update nested items
      if (
        deepUpdate(
          data[i],
          key,
          value,
          newData,
          options,
          currentDepth + 1,
          visited
        )
      ) {
        return true;
      }
    }
  }
  // If the current data is an object, iterate over its keys
  else if (typeof data === "object" && data !== null) {
    if (data[key] === value) {
      // Update the object if the key-value pair matches
      Object.assign(data, newData);
      return true;
    }

    for (const subKey in data) {
      if (data.hasOwnProperty(subKey)) {
        const subData = data[subKey];

        // Create a copy for each sub-object if needed
        if (createCopy && typeof subData === "object" && subData !== null) {
          data[subKey] = Array.isArray(subData) ? [...subData] : { ...subData };
        }

        // Recursively check/update nested objects
        if (
          deepUpdate(
            data[subKey],
            key,
            value,
            newData,
            options,
            currentDepth + 1,
            visited
          )
        ) {
          return true;
        }
      }
    }
  }

  // If no match is found
  return false;
}