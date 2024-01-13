import "../styles/globals.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { StateContextProvider } from "../Context/NFTs"; /*cho phép sử dụng context trong ứng dụng*/

//sử dụng CLI để khởi tạo dự án nên file này sẽ có sẵn, cung cấp một ngữ cảnh (context) để ứng dụng có thể tương tác với ThirdWeb
export default function App({ Component, pageProps }) {
   return (
    <ThirdwebProvider activeChain={ChainId.Mumbai}>
      <StateContextProvider> 
        <Component {...pageProps} /> {/* Đây là cách để render component được truyền vào như là một prop Component. pageProps là một đối tượng chứa các thuộc tính và giá trị được truyền vào component. */}
      </StateContextProvider>
    </ThirdwebProvider>
  );
}
