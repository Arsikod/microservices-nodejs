import { Publisher, Subjects, TicketUpdatedEvent } from "@nurdev/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
