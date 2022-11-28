import { SDKOptions } from "..";
import { Contracts } from "./contracts";
import { Payments } from "./payments";
import { Products } from "./products";

export class Paywei {
  constructor(
    options: SDKOptions,
    public readonly payments = new Payments(options),
    public readonly products = new Products(options),
    public readonly contracts = new Contracts(options.network)
  ) {}
}
