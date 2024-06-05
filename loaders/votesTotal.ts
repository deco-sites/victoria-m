export interface VotesTotal {
  total: number;
}

export default async function votesTotal(
  _props: VotesTotal,
): Promise<VotesTotal> {
  const res = await fetch("https://camp-api.deco.cx/events", {
    headers: {
      "x-api-key": "victoria-m",
    },
  });

  return res.json();
}