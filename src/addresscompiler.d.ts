declare module "addresscompiler" {
  export type Item = Address | Group;

  export interface Address {
    name?: string | null;
    address: string;
  };

  type Group = {
    name: string;
    group: Array<Address>;
  };

  declare const AddressCompiler: {
    compile: (addresses: Item | Array<Item>) => string;
  };

  export = AddressCompiler;
}
