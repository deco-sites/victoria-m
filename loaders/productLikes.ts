export interface ProductVotesApiResponse {
  product: number;
}

export interface productLikesProps {
  productId: string;
}

export default async function productLikes(
  props: productLikesProps,
  _req: Request,
  _ctx: unknown,
): Promise<ProductVotesApiResponse | undefined> {
  try {
    const productVotesResponse = await fetch(
      `https://camp-api.deco.cx/event/${props.productId}`,
      {
        headers: {
          "x-api-key": "victoria-m",
        },
      },
    );

    const productVotes = await productVotesResponse.json();

    return productVotes.product;
  } catch (e) {
    console.error({ Error: e });
  }
}
