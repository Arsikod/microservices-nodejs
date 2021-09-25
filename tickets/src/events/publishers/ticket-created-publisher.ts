import { Publisher, Subjects, TicketCreatedEvent } from "@nurdev/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
