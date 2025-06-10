
export interface ListedProduct {
  id: string;
  comercialName: string;
  activeIngredient: string;
  manufacturer: string;
  category: string;
}

export const listedProducts: ListedProduct[] = [
  {
    id: "roundup-original",
    comercialName: "ROUNDUP ORIGINAL DI",
    activeIngredient: "Glifosato",
    manufacturer: "Bayer",
    category: "Herbicida"
  },
  {
    id: "nativo-sc",
    comercialName: "NATIVO SC",
    activeIngredient: "Tebuconazol + Trifloxistrobina",
    manufacturer: "Bayer",
    category: "Fungicida"
  },
  {
    id: "karate-zeon",
    comercialName: "KARATE ZEON 50 CS",
    activeIngredient: "Lambda-cialotrina",
    manufacturer: "Syngenta",
    category: "Inseticida"
  },
  {
    id: "tordon-24d",
    comercialName: "TORDON 2,4-D",
    activeIngredient: "Picloram + 2,4-D",
    manufacturer: "Corteva",
    category: "Herbicida"
  },
  {
    id: "gramoxone-200",
    comercialName: "GRAMOXONE 200",
    activeIngredient: "Paraquate",
    manufacturer: "Syngenta",
    category: "Herbicida"
  },
  {
    id: "connect",
    comercialName: "CONNECT",
    activeIngredient: "Imidacloprido + Beta-ciflutrina",
    manufacturer: "Bayer",
    category: "Inseticida"
  },
  {
    id: "primoleo",
    comercialName: "PRIMÓLEO",
    activeIngredient: "Atrazina + Óleo mineral",
    manufacturer: "Syngenta",
    category: "Herbicida"
  },
  {
    id: "verdict-r",
    comercialName: "VERDICT R",
    activeIngredient: "Haloxifope-P-metílico",
    manufacturer: "Dow AgroSciences",
    category: "Herbicida"
  }
];
