import { OrderCancelledEvent, Publisher, Subjects } from "@nurdev/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
