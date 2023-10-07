import { WidgetOption } from "./types";
import { init, openWidget, turnOffVisibility } from "./utils";

export { WidgetOption, MessageEvents, WidgetResponse } from "./types";

export default class CorePackage {
  private options = {} as WidgetOption;

  constructor(props: WidgetOption) {
    this.options = props;
  }

  setup() {
    init(this.options);
  }

  close() {
    turnOffVisibility();
  }

  open() {
    openWidget(this.options);
    console.log("setting event now");
  }
}
