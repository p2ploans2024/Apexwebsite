"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validators";

export type ContactState = {
  error?: string;
  success?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    topic: formData.get("topic"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const session = await auth();
  await prisma.contactMessage.create({
    data: {
      ...parsed.data,
      userId: session?.user?.id,
    },
  });

  return {
    success: "Message received. A training advisor will follow up on business days.",
  };
}
