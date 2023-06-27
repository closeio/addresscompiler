declare module "addresscompiler" {
  export type Item = Address | Group;

  export interface Address {
    name?: string | null;
    address: string;
  };

  export interface Group {
    name: string;
    group: Array<Address>;
  };

  declare const AddressCompiler: {
    compile: (addresses: Item | Array<Item>) => string;
  };

  export = AddressCompiler;
}
