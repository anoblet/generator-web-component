import { LitElement, customElement} from "lit-element";

import Style from "./Style";
import Template from "./Template";

@customElement("<%=tag%>")
export class <%=className%> extends LitElement {
  public static styles = Style;
  public render = Template.bind(this);
}
