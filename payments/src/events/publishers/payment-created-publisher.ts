import { Subjects, Publisher, PaymentCreatedEvent } from "../../../common/src";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
