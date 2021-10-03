import { Publisher } from "../../common/src/events/base-publisher";
import { ExpirationCompleteEvent } from "../../common/src/events/expiration-complete-event";
import { Subjects } from "../listeners/subjects";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
