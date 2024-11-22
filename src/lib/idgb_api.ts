import { env } from "../env";

export const getGame = async (id?: string) => {
  if (!id) return null;
  // @ts-ignore
  const { access_token } = await fetch({
    url: `https://id.twitch.tv/oauth2/token?client_id=${env.IGDB_ID}&client_secret=${env.IGDB_SECRET}&grant_type=client_credentials`,
    method: "POST",
    body: null,
  }).then((rsp) => rsp.json());

  // @ts-ignore
  const ttb = await fetch({
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": env.IGDB_ID,
      Authorization: `Bearer ${access_token}`,
    },
    url: "https://api.igdb.com/v4/game_time_to_beats/",
    body: `
  fields *;
  exclude checksum;
  where id = ${id};
  `,
  }).then((rsp) => rsp.json());
  console.log(ttb);

  // @ts-ignore
  const info = await fetch({
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": env.IGDB_ID,
      Authorization: `Bearer ${access_token}`,
    },
    url: "https://api.igdb.com/v4/games/",
    body: `
    fields *, age_ratings.*, platforms.*, game_modes.*, genres.*, franchises.*, involved_companies.*, ports.*, screenshots.*, release_dates.*, alternative_names.*, themes.*, videos.*, websites.*;
    exclude player_perspectives,bundles, language_supports, multiplayer_modes, collections, external_games, similar_games, tags, game_localizations, checksum, age_ratings.checksum, alternative_names.checksum, franchises.checksum, game_modes.checksum, genres.checksum, involved_companies.checksum, keywords, platforms.checksum, release_dates.checksum, videos.checksum, websites.checksum, screenshots.checksum, themes.checksum, id, platforms.websites, artworks, game_engines, age_ratings.content_descriptions, age_ratings.synopsis, hypes; 
    where id = ${id};
    `,
  }).then((rsp) => rsp.json());
  return {
    ...info[0],
    ports: info[0].ports?.map((a: any) => a.id),
    remakes: info[0].remakes || [],
    remasters: info[0].remasters || [],
  };
};
