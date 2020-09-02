// @flow

export type TypeJSON =
| null
| void
| string
| number
| boolean
| { [string]: TypeJSON }
| Array<TypeJSON>;
