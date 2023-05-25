declare module "addresscompiler" {
  type Item = Address | Group;

  type Address = {
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
