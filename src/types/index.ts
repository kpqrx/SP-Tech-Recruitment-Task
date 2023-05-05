type PriceType = { [year: string]: number } | number;

export type PackageType = {
  services: number[];
  optionalServices?: number[];
  price: PriceType;
};
export type ServiceType = {
  id: number;
  dependsOn?: number[];
  type: "internet";
  price: PriceType;
};
