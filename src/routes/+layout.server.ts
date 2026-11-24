import type { LayoutServerLoad } from "./$types"
import getUser from "$lib/db/call/getUser";

export const load: LayoutServerLoad = async (event) => {
  const session = await event.locals.auth()

  // show the name the user chose instead of the one provided by the login provider
  if (session?.user?.email) {
    const user = await getUser(session.user.email);

    if (user) {
      session.user.name = user.username;
    }
  }

  return {
    session,
  }
}
