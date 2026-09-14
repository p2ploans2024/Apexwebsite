"use server";

import { AuthError } from "next-auth";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { signInSchema, signUpSchema } from "@/lib/validators";

export type AuthFormState = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function signInAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const callbackUrl = String(formData.get("callbackUrl") || "/dashboard");

  try {
    await signIn("credentials", {
      email: parsed.data.email.toLowerCase(),
      password: parsed.data.password,
      redirectTo: callbackUrl.startsWith("/") ? callbackUrl : "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password." };
    }
    throw error;
  }

  return {};
}

export async function signUpAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const email = parsed.data.email.toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with that email already exists. Sign in instead." };
  }

  await prisma.user.create({
    data: {
      name: parsed.data.name,
      email,
      passwordHash: await hash(parsed.data.password, 12),
      role: "LEARNER",
    },
  });

  const callbackUrl = String(formData.get("callbackUrl") || "/dashboard");

  try {
    await signIn("credentials", {
      email,
      password: parsed.data.password,
      redirectTo: callbackUrl.startsWith("/") ? callbackUrl : "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/signin");
    }
    throw error;
  }

  return {};
}

export async function currentUser() {
  return auth();
}
