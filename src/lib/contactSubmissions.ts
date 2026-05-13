export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  source?: "contact" | "start-project";
};

export type ContactSubmissionInput = Omit<ContactSubmission, "id" | "createdAt">;
