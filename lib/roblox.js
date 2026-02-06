export async function getRobloxAvatar(robloxId) {
  const res = await fetch(
    `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${robloxId}&size=150x150&format=Png&isCircular=true`
  );

  const json = await res.json();
  return json.data[0].imageUrl;
}
