# nested-update

`nested-update` is a powerful and lightweight utility for deeply updating nested data structures like objects and arrays in JavaScript and TypeScript. It can search for a specific key-value pair in highly nested data and update it with a given data object. Additionally, it supports options for shallow copies to avoid mutating the original data.

## Features

- Search for objects within deeply nested data by key-value pairs.
- Update the matched objects with new data.
- Supports complex structures like nested arrays and objects.
- Optional shallow copy to preserve the original data structure.

## Installation

Install the package via npm:

```bash
npm install nested-update
```

Or with Yarn:

```bash
yarn add nested-update
```

## Usage

### Basic Example

```typescript
import { updateNestedData } from "nested-update";

const data = {
  id: 1,
  name: "Root",
  children: [
    { id: 2, name: "Child 1" },
    {
      id: 3,
      name: "Child 2",
      children: [{ id: 4, name: "Grandchild" }],
    },
  ],
};

const key = "id";
const value = 3;
const newData = { name: "Updated Child 2", additionalInfo: "Some new info" };

updateNestedData(data, key, value, newData);

console.log(data);
// Output will be updated data where the object with id 3 is modified
```

### Options

- **`createShallowCopy`** (default: `false`): If set to `true`, a shallow copy of the data structure will be created, leaving the original data untouched.

```typescript
const updatedData = updateNestedData(data, key, value, newData, {
  createShallowCopy: true,
});
console.log(updatedData);
// Original data remains unchanged, and a modified copy is returned
```

## API

### `updateNestedData(data, key, value, newData, options?)`

Searches through the nested data structure for a matching key-value pair and updates the found object with `newData`.

#### Parameters:

- **`data`**: The input data structure, can be an object or an array.
- **`key`**: The key to search for within the nested data.
- **`value`**: The value to match against the specified key.
- **`newData`**: The data object that will be merged with the matched object.
- **`options`**: An optional object with:
  - **`createShallowCopy`**: A boolean to indicate if a shallow copy should be created.

#### Returns:

- The updated data structure. If `createShallowCopy` is set to `true`, a shallow copy of the data is returned; otherwise, the original data is mutated.

## Examples

### Example 1: Deeply Nested Update

```typescript
const complexData = [
  {
    id: 1,
    items: [
      {
        id: 2,
        items: [{ id: 3, name: "Target" }],
      },
    ],
  },
];

updateNestedData(complexData, "id", 3, { name: "Updated Target" });

console.log(complexData);
// Output will have the object with id 3 updated
```

### Example 2: Shallow Copy Usage

```typescript
const originalData = {
  id: 1,
  name: "Original",
};

const updatedData = updateNestedData(
  originalData,
  "id",
  1,
  { name: "Updated" },
  { createShallowCopy: true }
);

console.log(originalData);
// Output: { id: 1, name: 'Original' }

console.log(updatedData);
// Output: { id: 1, name: 'Updated' }
```

## License

MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.
