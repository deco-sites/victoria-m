import { useSignal } from "@preact/signals"

export interface Props {
  /**
  * @title Cupom
  */
 cupom: string;
 /**
  * @title Descrição do Cupom
  */
 description: string;
}

const Cupom = ({ cupom, description }: Props) => {
  
  const message = useSignal(cupom);
  
  async function copyCouponToClipboard(text: string) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    }

    return document.execCommand("copy", true, text);
  }

  const handleCopyCouponClick = () => {
    copyCouponToClipboard(cupom).then(() => {
      message.value = "Cupom copiado com sucesso";
      setTimeout(() => {
        message.value = cupom;
      }, 10000);
    }).catch((err)=> {
      alert("Ocorreu um erro ao copiar o cupom, tente novamente mais tarde.")
    });
  };

  return (
    <>
      <div class="cupom-wrapper w-full flex justify-center flex-col items-center my-10">
        <div class="w-full flex justify-center">
          <span>{description}</span>
        </div>
        <div class="max-w-sm border-dashed border border-gray-400 p-4 mt-3">
          <button onClick={handleCopyCouponClick}>
            <span>{message}</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Cupom;