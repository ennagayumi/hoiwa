import { handleContactRequest, type ContactEnv } from "../../lib/contactMail";

type PagesContext = {
  request: Request;
  env: ContactEnv;
};

export async function onRequestPost({ request, env }: PagesContext) {
  return handleContactRequest(request, env);
}
