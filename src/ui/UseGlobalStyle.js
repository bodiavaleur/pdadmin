import { createGlobalStyle } from "styled-components";

export const UseGlobalStyle = createGlobalStyle`
	.rangeslider-horizontal {
    background: white !important;
    width: 100px !important;
    height: 8px !important;
  }

  .rangeslider__fill {
    background: rgb(10, 132, 255) !important;
  }

  .rangeslider__handle {
    width: 20px !important;
    height: 20px !important;

    ::after {
      display: none !important;
    }
  }
`