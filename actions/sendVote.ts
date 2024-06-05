interface Props {
  productId: string;
}

interface VoteResult {
  product: number;
  total: number;
}

export default async function action(
  props: Props,
): Promise<VoteResult> {
  const res = await fetch("https://camp-api.deco.cx/event", {
    method: "POST",
    headers: {
      "x-api-key": "victoria-m",
    },
    body: JSON.stringify(props),
  });

  return res.json();
}
