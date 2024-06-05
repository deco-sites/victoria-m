import { signal, useSignal, useSignalEffect } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { sendEvent } from "$store/sdk/analytics.tsx";
import Icon from "$store/components/ui/Icon.tsx";

export const sumVotes = signal<number>(0);

export interface Props {
  productId: string;
}

export default function ProductVote({ productId }: Props) {
  const hasVoted = useSignal(false);
  const productVotes = useSignal(0);

  // deno-lint-ignore no-explicit-any
  const ToastContainerComponent = ToastContainer as any;

  useSignalEffect(() => {
    const getVotes = async () => {
      const votesTotalProduct = await invoke["deco-sites/victoria-m"].loaders
        .votesProduct({ productId });
      productVotes.value = votesTotalProduct.product;

      const votesTotal = await invoke["deco-sites/victoria-m"].loaders
        .votesTotal();
      sumVotes.value = votesTotal.total;
    };

    getVotes();

    setInterval(getVotes, 30000);
  });

  const addVote = async () => {
    if (hasVoted.value !== true) {
      hasVoted.value = true;
      const vote = await invoke["deco-sites/victoria-m"].actions.sendVote({
        productId,
      });
      sumVotes.value = vote.total;
      productVotes.value = vote.product;

      toast.success("Obrigado por votar!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });

      sendEvent({
        name: "post_score",
        params: {
          score: vote.product,
          character: productId,
        },
      });
    }
  };

  return (
    <div class="flex gap-2">
      <ToastContainerComponent />
      <button onClick={addVote}>
        {hasVoted.value
          ? (
            <Icon
              id="IconMoodCheck"
              class="text-emerald-600"
              width={24}
              height={24}
            />
          )
          : <Icon id="IconMoodSmile" width={24} height={24} />}
      </button>
      <p class="text-lg">{productVotes.value}</p>
    </div>
  );
}
