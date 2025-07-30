export interface Carro {
  id?: number;
  marca: string;
  modelo: string;
  ano: number;
  cor: string;
  placa: string;
  tipoCombustivel: string;
  portas: number;
  precoAluguelPorDia: number;
  precoVenda: number;
  urlImagem?: string;
  disponivelParaAluguel: boolean;
  disponivelParaVenda: boolean;
}
