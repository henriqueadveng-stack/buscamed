// Interfaces
export interface Distribuidor {
  id: string;
  nome: string;
  logo?: string;
  avaliacao: number;
  entregas: number;
  localizacao: string;
}

export interface Oferta {
  id: string;
  distribuidorId: string;
  preco: number;
  precoAntigo?: number;
  emEstoque: boolean;
  prazoEntrega: string;
  frete?: number;
  parcelamento?: string;
}

export interface Equipamento {
  id: string;
  nome: string;
  categoria: string;
  categoriaSlug: string;
  descricao: string;
  especificacoes: string[];
  imagem: string;
  imagensAdicionais?: string[];
  marca?: string;
  modelo?: string;
  registroAnvisa?: string;
  garantia?: string;
  ofertas: Oferta[];
  novo: boolean;
  popular: boolean;
  promocao: boolean;
  dataCadastro: string;
}

export interface Categoria {
  id: string;
  nome: string;
  slug: string;
  icone: string;
  descricao: string;
  quantidade: number;
}

// Distribuidores
export const distribuidores: Distribuidor[] = [
  { id: "dist-1", nome: "MedEquip Brasil", avaliacao: 4.8, entregas: 1250, localizacao: "São Paulo, SP" },
  { id: "dist-2", nome: "Hospitalar SP", avaliacao: 4.6, entregas: 890, localizacao: "São Paulo, SP" },
  { id: "dist-3", nome: "TechMed Solutions", avaliacao: 4.9, entregas: 2100, localizacao: "Rio de Janeiro, RJ" },
  { id: "dist-4", nome: "Saúde Total", avaliacao: 4.5, entregas: 650, localizacao: "Belo Horizonte, MG" },
  { id: "dist-5", nome: "EquipoMed", avaliacao: 4.7, entregas: 1100, localizacao: "Curitiba, PR" },
  { id: "dist-6", nome: "MedSul Equipamentos", avaliacao: 4.4, entregas: 480, localizacao: "Porto Alegre, RS" },
];

// Categorias
export const categorias: Categoria[] = [
  { id: "cat-1", nome: "Mobiliário Hospitalar", slug: "mobiliario-hospitalar", icone: "Armchair", descricao: "Camas, macas, mesas cirúrgicas e mobiliário hospitalar em geral", quantidade: 245 },
  { id: "cat-2", nome: "Monitorização", slug: "monitorizacao", icone: "HeartPulse", descricao: "Monitores multiparamétricos, centrais de monitorização e oxímetros", quantidade: 189 },
  { id: "cat-3", nome: "Ventilação", slug: "ventilacao", icone: "Wind", descricao: "Ventiladores mecânicos, CPAP, BiPAP e equipamentos respiratórios", quantidade: 134 },
  { id: "cat-4", nome: "Emergência", slug: "emergencia", icone: "Siren", descricao: "Desfibriladores, carros de emergência e equipamentos de ressuscitação", quantidade: 98 },
  { id: "cat-5", nome: "Diagnóstico por Imagem", slug: "diagnostico-imagem", icone: "ScanLine", descricao: "Raio-X, ultrassom, tomografia e equipamentos de imagem", quantidade: 156 },
  { id: "cat-6", nome: "Diagnóstico", slug: "diagnostico", icone: "Stethoscope", descricao: "ECG, estetoscópios, otoscópios e equipamentos de diagnóstico clínico", quantidade: 203 },
  { id: "cat-7", nome: "Infusão", slug: "infusao", icone: "Droplets", descricao: "Bombas de infusão, seringas e equipamentos de administração de medicamentos", quantidade: 87 },
  { id: "cat-8", nome: "Vias Aéreas", slug: "vias-aereas", icone: "CircleDot", descricao: "Laringoscópios, tubos endotraqueais e equipamentos de via aérea", quantidade: 76 },
  { id: "cat-9", nome: "Iluminação", slug: "iluminacao", icone: "Lightbulb", descricao: "Focos cirúrgicos, lanternas de exame e iluminação médica", quantidade: 45 },
  { id: "cat-10", nome: "Aspiração", slug: "aspiracao", icone: "Wind", descricao: "Aspiradores cirúrgicos e de secreção", quantidade: 38 },
];

// Equipamentos com ofertas
export const equipamentos: Equipamento[] = [
  {
    id: "cama-hospitalar-eletrica-uti",
    nome: "Cama Hospitalar Elétrica UTI Adulto",
    categoria: "Mobiliário Hospitalar",
    categoriaSlug: "mobiliario-hospitalar",
    descricao: "Cama hospitalar elétrica para UTI adulto com múltiplas posições, grades laterais retráteis, controle remoto e sistema de pesagem integrado. Estrutura em aço carbono com pintura eletrostática.",
    especificacoes: ["Capacidade: 250 kg", "Altura ajustável: 45-80 cm", "Trendelenburg e Reverso", "4 motores elétricos", "Grades laterais em alumínio", "Rodízios com freio", "Sistema CPR de emergência"],
    imagem: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80",
    marca: "HospiBed",
    modelo: "UTI-4000E",
    registroAnvisa: "80123456789",
    garantia: "24 meses",
    ofertas: [
      { id: "of-001-1", distribuidorId: "dist-1", preco: 12500, precoAntigo: 14000, emEstoque: true, prazoEntrega: "7-10 dias úteis", frete: 0, parcelamento: "12x de R$ 1.041,67" },
      { id: "of-001-2", distribuidorId: "dist-2", preco: 13200, emEstoque: true, prazoEntrega: "5-7 dias úteis", frete: 350, parcelamento: "10x de R$ 1.320,00" },
      { id: "of-001-3", distribuidorId: "dist-3", preco: 11800, emEstoque: false, prazoEntrega: "15-20 dias úteis", frete: 0, parcelamento: "12x de R$ 983,33" },
      { id: "of-001-4", distribuidorId: "dist-5", preco: 14500, emEstoque: true, prazoEntrega: "3-5 dias úteis", frete: 0, parcelamento: "10x de R$ 1.450,00" },
    ],
    novo: false,
    popular: true,
    promocao: true,
    dataCadastro: "2024-06-15",
  },
  {
    id: "monitor-multiparametrico-completo",
    nome: "Monitor Multiparamétrico 15\" Touch",
    categoria: "Monitorização",
    categoriaSlug: "monitorizacao",
    descricao: "Monitor multiparamétrico de 15 polegadas com tela touchscreen, monitorização de ECG, SpO2, NIBP, temperatura, capnografia e débito cardíaco.",
    especificacoes: ["Tela LCD 15\" touchscreen", "ECG 12 derivações", "SpO2 com curva pletismográfica", "NIBP adulto/pediátrico/neonatal", "2 canais de temperatura", "Capnografia", "Bateria 4 horas", "WiFi e Ethernet"],
    imagem: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80",
    marca: "VitalSign",
    modelo: "VS-1500",
    registroAnvisa: "80234567890",
    garantia: "36 meses",
    ofertas: [
      { id: "of-002-1", distribuidorId: "dist-1", preco: 18500, emEstoque: true, prazoEntrega: "5-7 dias úteis", frete: 0, parcelamento: "12x de R$ 1.541,67" },
      { id: "of-002-2", distribuidorId: "dist-3", preco: 17200, precoAntigo: 19500, emEstoque: true, prazoEntrega: "7-10 dias úteis", frete: 0, parcelamento: "12x de R$ 1.433,33" },
      { id: "of-002-3", distribuidorId: "dist-4", preco: 19800, emEstoque: true, prazoEntrega: "10-12 dias úteis", frete: 250, parcelamento: "10x de R$ 1.980,00" },
    ],
    novo: true,
    popular: true,
    promocao: true,
    dataCadastro: "2024-11-20",
  },
  {
    id: "central-monitorizacao",
    nome: "Central de Monitorização 8 Leitos",
    categoria: "Monitorização",
    categoriaSlug: "monitorizacao",
    descricao: "Central de monitorização para até 8 leitos simultaneamente com tela de 24 polegadas, alarmes visuais e sonoros.",
    especificacoes: ["Tela LCD 24\" Full HD", "Visualização de até 8 leitos", "Armazenamento 72h", "Alarmes configuráveis", "Revisão de arritmias", "Integração HIS/EMR"],
    imagem: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&q=80",
    marca: "VitalSign",
    modelo: "Central-8",
    registroAnvisa: "80345678901",
    garantia: "24 meses",
    ofertas: [
      { id: "of-003-1", distribuidorId: "dist-1", preco: 45000, emEstoque: true, prazoEntrega: "15-20 dias úteis", frete: 0, parcelamento: "12x de R$ 3.750,00" },
      { id: "of-003-2", distribuidorId: "dist-3", preco: 42500, emEstoque: false, prazoEntrega: "20-25 dias úteis", frete: 0, parcelamento: "12x de R$ 3.541,67" },
    ],
    novo: false,
    popular: false,
    promocao: false,
    dataCadastro: "2024-03-10",
  },
  {
    id: "ventilador-mecanico-microprocessado",
    nome: "Ventilador Mecânico Microprocessado UTI",
    categoria: "Ventilação",
    categoriaSlug: "ventilacao",
    descricao: "Ventilador mecânico microprocessado para UTI adulto e pediátrico com modos invasivos e não invasivos.",
    especificacoes: ["Modos: VCV, PCV, SIMV, PSV, CPAP, BiLevel", "Volume: 20-2000 mL", "Frequência: 1-80 rpm", "PEEP: 0-45 cmH2O", "FiO2: 21-100%", "Tela touch 15\"", "Bateria 2 horas"],
    imagem: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&q=80",
    marca: "RespiCare",
    modelo: "RC-5000",
    registroAnvisa: "80456789012",
    garantia: "24 meses",
    ofertas: [
      { id: "of-004-1", distribuidorId: "dist-1", preco: 68000, precoAntigo: 75000, emEstoque: true, prazoEntrega: "10-15 dias úteis", frete: 0, parcelamento: "12x de R$ 5.666,67" },
      { id: "of-004-2", distribuidorId: "dist-2", preco: 72000, emEstoque: true, prazoEntrega: "7-10 dias úteis", frete: 0, parcelamento: "12x de R$ 6.000,00" },
      { id: "of-004-3", distribuidorId: "dist-3", preco: 65000, emEstoque: false, prazoEntrega: "20-30 dias úteis", frete: 0, parcelamento: "12x de R$ 5.416,67" },
      { id: "of-004-4", distribuidorId: "dist-5", preco: 78000, emEstoque: true, prazoEntrega: "5-7 dias úteis", frete: 0, parcelamento: "10x de R$ 7.800,00" },
    ],
    novo: false,
    popular: true,
    promocao: true,
    dataCadastro: "2024-01-20",
  },
  {
    id: "ventilador-mecanico-transporte",
    nome: "Ventilador de Transporte Portátil",
    categoria: "Ventilação",
    categoriaSlug: "ventilacao",
    descricao: "Ventilador de transporte portátil para adulto, pediátrico e neonatal. Leve e compacto.",
    especificacoes: ["Peso: 3.5 kg", "Modos: VCV, PCV, SIMV, CPAP", "Volume: 50-1500 mL", "Bateria: 6 horas", "Alarmes visuais e sonoros", "Certificação transporte aéreo"],
    imagem: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
    marca: "RespiCare",
    modelo: "RC-T200",
    registroAnvisa: "80567890123",
    garantia: "24 meses",
    ofertas: [
      { id: "of-005-1", distribuidorId: "dist-1", preco: 32000, emEstoque: true, prazoEntrega: "5-7 dias úteis", frete: 0, parcelamento: "12x de R$ 2.666,67" },
      { id: "of-005-2", distribuidorId: "dist-4", preco: 35000, emEstoque: true, prazoEntrega: "7-10 dias úteis", frete: 200, parcelamento: "10x de R$ 3.500,00" },
      { id: "of-005-3", distribuidorId: "dist-6", preco: 29500, precoAntigo: 33000, emEstoque: true, prazoEntrega: "10-12 dias úteis", frete: 0, parcelamento: "12x de R$ 2.458,33" },
    ],
    novo: true,
    popular: false,
    promocao: true,
    dataCadastro: "2024-10-05",
  },
  {
    id: "aspirador-cirurgico-portatil",
    nome: "Aspirador Cirúrgico Portátil",
    categoria: "Aspiração",
    categoriaSlug: "aspiracao",
    descricao: "Aspirador cirúrgico portátil de alta potência com regulagem de vácuo.",
    especificacoes: ["Vácuo máximo: -80 kPa", "Fluxo: 40 L/min", "Frasco coletor: 2000 mL", "Regulagem contínua", "Filtro bacteriano", "Rodízios com freio"],
    imagem: "https://images.unsplash.com/photo-1581595220892-4ef3b8a39f89?w=800&q=80",
    marca: "AspiraMed",
    modelo: "AM-3500",
    registroAnvisa: "80678901234",
    garantia: "12 meses",
    ofertas: [
      { id: "of-006-1", distribuidorId: "dist-1", preco: 3200, emEstoque: true, prazoEntrega: "3-5 dias úteis", frete: 0, parcelamento: "6x de R$ 533,33" },
      { id: "of-006-2", distribuidorId: "dist-2", preco: 3500, emEstoque: true, prazoEntrega: "5-7 dias úteis", frete: 80, parcelamento: "6x de R$ 583,33" },
      { id: "of-006-3", distribuidorId: "dist-4", preco: 2900, precoAntigo: 3400, emEstoque: true, prazoEntrega: "7-10 dias úteis", frete: 0, parcelamento: "6x de R$ 483,33" },
      { id: "of-006-4", distribuidorId: "dist-5", preco: 3800, emEstoque: true, prazoEntrega: "2-3 dias úteis", frete: 0, parcelamento: "6x de R$ 633,33" },
    ],
    novo: false,
    popular: false,
    promocao: true,
    dataCadastro: "2024-04-12",
  },
  {
    id: "bomba-infusao-continua",
    nome: "Bomba de Infusão Volumétrica",
    categoria: "Infusão",
    categoriaSlug: "infusao",
    descricao: "Bomba de infusão volumétrica de alta precisão para administração de medicamentos.",
    especificacoes: ["Taxa: 0.1-1200 mL/h", "Precisão: ±2%", "Bolus programável", "Biblioteca 1000 fármacos", "Histórico 500 infusões", "Bateria: 8 horas", "Sensor de ar e oclusão"],
    imagem: "https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?w=800&q=80",
    marca: "InfuTech",
    modelo: "IT-600V",
    registroAnvisa: "80789012345",
    garantia: "24 meses",
    ofertas: [
      { id: "of-007-1", distribuidorId: "dist-1", preco: 4500, emEstoque: true, prazoEntrega: "3-5 dias úteis", frete: 0, parcelamento: "10x de R$ 450,00" },
      { id: "of-007-2", distribuidorId: "dist-2", preco: 4200, precoAntigo: 4800, emEstoque: true, prazoEntrega: "5-7 dias úteis", frete: 0, parcelamento: "10x de R$ 420,00" },
      { id: "of-007-3", distribuidorId: "dist-3", preco: 4800, emEstoque: true, prazoEntrega: "3-5 dias úteis", frete: 0, parcelamento: "10x de R$ 480,00" },
      { id: "of-007-4", distribuidorId: "dist-4", preco: 5200, emEstoque: true, prazoEntrega: "7-10 dias úteis", frete: 100, parcelamento: "10x de R$ 520,00" },
      { id: "of-007-5", distribuidorId: "dist-6", preco: 3900, emEstoque: false, prazoEntrega: "15-20 dias úteis", frete: 0, parcelamento: "10x de R$ 390,00" },
    ],
    novo: false,
    popular: true,
    promocao: true,
    dataCadastro: "2024-02-28",
  },
  {
    id: "carro-emergencia-completo",
    nome: "Carro de Emergência Completo",
    categoria: "Emergência",
    categoriaSlug: "emergencia",
    descricao: "Carro de emergência completo em aço inox com 5 gavetas e suporte para desfibrilador.",
    especificacoes: ["Material: Aço inox 304", "5 gavetas com divisórias", "Suporte desfibrilador", "Suporte cilindro O2", "Tábua RCP inclusa", "Rodízios 5\" com freio"],
    imagem: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
    marca: "EmergeMed",
    modelo: "EM-500",
    registroAnvisa: "80890123456",
    garantia: "36 meses",
    ofertas: [
      { id: "of-008-1", distribuidorId: "dist-1", preco: 6500, emEstoque: true, prazoEntrega: "7-10 dias úteis", frete: 0, parcelamento: "10x de R$ 650,00" },
      { id: "of-008-2", distribuidorId: "dist-2", preco: 7200, emEstoque: true, prazoEntrega: "5-7 dias úteis", frete: 150, parcelamento: "10x de R$ 720,00" },
      { id: "of-008-3", distribuidorId: "dist-5", preco: 5800, precoAntigo: 6800, emEstoque: true, prazoEntrega: "10-12 dias úteis", frete: 0, parcelamento: "10x de R$ 580,00" },
      { id: "of-008-4", distribuidorId: "dist-6", preco: 6900, emEstoque: true, prazoEntrega: "7-10 dias úteis", frete: 0, parcelamento: "10x de R$ 690,00" },
    ],
    novo: false,
    popular: true,
    promocao: true,
    dataCadastro: "2024-05-18",
  },
  {
    id: "raio-x-portatil-movel",
    nome: "Aparelho de Raio-X Digital Móvel",
    categoria: "Diagnóstico por Imagem",
    categoriaSlug: "diagnostico-imagem",
    descricao: "Aparelho de raio-X digital móvel com detector flat panel, 32kW de potência.",
    especificacoes: ["Potência: 32 kW", "Detector: Flat Panel 43x43 cm", "Tensão: 40-150 kVp", "Corrente: 10-500 mA", "DICOM integrado", "Bateria 100 exposições"],
    imagem: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    marca: "ImageMed",
    modelo: "IM-DR32",
    registroAnvisa: "80901234567",
    garantia: "24 meses",
    ofertas: [
      { id: "of-009-1", distribuidorId: "dist-1", preco: 125000, emEstoque: true, prazoEntrega: "20-30 dias úteis", frete: 0, parcelamento: "12x de R$ 10.416,67" },
      { id: "of-009-2", distribuidorId: "dist-3", preco: 118000, precoAntigo: 135000, emEstoque: false, prazoEntrega: "30-45 dias úteis", frete: 0, parcelamento: "12x de R$ 9.833,33" },
      { id: "of-009-3", distribuidorId: "dist-5", preco: 132000, emEstoque: true, prazoEntrega: "15-20 dias úteis", frete: 0, parcelamento: "12x de R$ 11.000,00" },
    ],
    novo: false,
    popular: false,
    promocao: true,
    dataCadastro: "2024-07-22",
  },
  {
    id: "aparelho-ecg",
    nome: "Eletrocardiógrafo 12 Canais",
    categoria: "Diagnóstico",
    categoriaSlug: "diagnostico",
    descricao: "Eletrocardiógrafo digital de 12 canais com impressão térmica e interpretação automática.",
    especificacoes: ["12 derivações simultâneas", "Amostragem: 32000 Hz", "Impressora térmica", "Interpretação automática", "Memória: 1000 ECGs", "WiFi, USB, SD"],
    imagem: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    marca: "CardioTech",
    modelo: "CT-120",
    registroAnvisa: "81012345678",
    garantia: "24 meses",
    ofertas: [
      { id: "of-010-1", distribuidorId: "dist-1", preco: 5500, emEstoque: true, prazoEntrega: "3-5 dias úteis", frete: 0, parcelamento: "10x de R$ 550,00" },
      { id: "of-010-2", distribuidorId: "dist-2", preco: 4800, precoAntigo: 5800, emEstoque: true, prazoEntrega: "5-7 dias úteis", frete: 0, parcelamento: "10x de R$ 480,00" },
      { id: "of-010-3", distribuidorId: "dist-3", preco: 5200, emEstoque: true, prazoEntrega: "3-5 dias úteis", frete: 0, parcelamento: "10x de R$ 520,00" },
      { id: "of-010-4", distribuidorId: "dist-4", preco: 6200, emEstoque: true, prazoEntrega: "7-10 dias úteis", frete: 120, parcelamento: "10x de R$ 620,00" },
      { id: "of-010-5", distribuidorId: "dist-6", preco: 4500, emEstoque: false, prazoEntrega: "15-20 dias úteis", frete: 0, parcelamento: "10x de R$ 450,00" },
    ],
    novo: false,
    popular: true,
    promocao: true,
    dataCadastro: "2024-03-05",
  },
  {
    id: "desfibrilador-cardioversor",
    nome: "Desfibrilador Externo Automático (DEA)",
    categoria: "Emergência",
    categoriaSlug: "emergencia",
    descricao: "Desfibrilador externo automático com orientação por voz e tecnologia bifásica.",
    especificacoes: ["Tecnologia: Onda bifásica", "Energia: 150-200 J adulto", "Energia: 50-75 J pediátrico", "Orientação por voz", "Análise 8 segundos", "Bateria: 200 choques", "IP55"],
    imagem: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80",
    marca: "CardioLife",
    modelo: "CL-DEA100",
    registroAnvisa: "81123456789",
    garantia: "60 meses",
    ofertas: [
      { id: "of-011-1", distribuidorId: "dist-1", preco: 8500, emEstoque: true, prazoEntrega: "5-7 dias úteis", frete: 0, parcelamento: "10x de R$ 850,00" },
      { id: "of-011-2", distribuidorId: "dist-2", preco: 9200, emEstoque: true, prazoEntrega: "3-5 dias úteis", frete: 0, parcelamento: "10x de R$ 920,00" },
      { id: "of-011-3", distribuidorId: "dist-3", preco: 7800, precoAntigo: 9000, emEstoque: true, prazoEntrega: "7-10 dias úteis", frete: 0, parcelamento: "10x de R$ 780,00" },
      { id: "of-011-4", distribuidorId: "dist-5", preco: 8900, emEstoque: true, prazoEntrega: "5-7 dias úteis", frete: 0, parcelamento: "10x de R$ 890,00" },
    ],
    novo: true,
    popular: true,
    promocao: true,
    dataCadastro: "2024-11-01",
  },
  {
    id: "ultrassom-portatil",
    nome: "Ultrassom Portátil Colorido",
    categoria: "Diagnóstico por Imagem",
    categoriaSlug: "diagnostico-imagem",
    descricao: "Ultrassom portátil com Doppler colorido, tela de 15 polegadas e bateria longa duração.",
    especificacoes: ["Tela LCD 15\" LED", "Doppler: Colorido, PW, CW", "Frequência: 2-12 MHz", "Profundidade: até 30 cm", "Bateria: 3 horas", "Peso: 6 kg", "500 GB SSD"],
    imagem: "https://images.unsplash.com/photo-1581093577421-f561a654a353?w=800&q=80",
    marca: "SonoMed",
    modelo: "SM-P150",
    registroAnvisa: "81234567890",
    garantia: "24 meses",
    ofertas: [
      { id: "of-012-1", distribuidorId: "dist-1", preco: 45000, emEstoque: true, prazoEntrega: "10-15 dias úteis", frete: 0, parcelamento: "12x de R$ 3.750,00" },
      { id: "of-012-2", distribuidorId: "dist-3", preco: 42000, precoAntigo: 48000, emEstoque: true, prazoEntrega: "7-10 dias úteis", frete: 0, parcelamento: "12x de R$ 3.500,00" },
      { id: "of-012-3", distribuidorId: "dist-5", preco: 48500, emEstoque: true, prazoEntrega: "5-7 dias úteis", frete: 0, parcelamento: "12x de R$ 4.041,67" },
      { id: "of-012-4", distribuidorId: "dist-6", preco: 39000, emEstoque: false, prazoEntrega: "20-30 dias úteis", frete: 0, parcelamento: "12x de R$ 3.250,00" },
    ],
    novo: true,
    popular: true,
    promocao: true,
    dataCadastro: "2024-10-15",
  },
  {
    id: "foco-cirurgico-portatil-led",
    nome: "Foco Cirúrgico LED Portátil",
    categoria: "Iluminação",
    categoriaSlug: "iluminacao",
    descricao: "Foco cirúrgico LED portátil com intensidade de 130.000 lux e temperatura ajustável.",
    especificacoes: ["Iluminância: 130.000 lux", "Temperatura: 4.000-5.000 K", "Diâmetro foco: 20-30 cm", "LED: 50.000 horas", "Braço inox articulado", "Base com rodízios"],
    imagem: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&q=80",
    marca: "LightMed",
    modelo: "LM-LED130",
    registroAnvisa: "81345678901",
    garantia: "24 meses",
    ofertas: [
      { id: "of-013-1", distribuidorId: "dist-1", preco: 7500, emEstoque: true, prazoEntrega: "5-7 dias úteis", frete: 0, parcelamento: "10x de R$ 750,00" },
      { id: "of-013-2", distribuidorId: "dist-2", preco: 8200, emEstoque: true, prazoEntrega: "3-5 dias úteis", frete: 150, parcelamento: "10x de R$ 820,00" },
      { id: "of-013-3", distribuidorId: "dist-4", preco: 6800, precoAntigo: 7800, emEstoque: true, prazoEntrega: "7-10 dias úteis", frete: 0, parcelamento: "10x de R$ 680,00" },
      { id: "of-013-4", distribuidorId: "dist-6", preco: 7100, emEstoque: true, prazoEntrega: "10-12 dias úteis", frete: 0, parcelamento: "10x de R$ 710,00" },
    ],
    novo: false,
    popular: false,
    promocao: true,
    dataCadastro: "2024-06-30",
  },
  {
    id: "maca-transporte-hidraulica",
    nome: "Maca de Transporte Hidráulica",
    categoria: "Mobiliário Hospitalar",
    categoriaSlug: "mobiliario-hospitalar",
    descricao: "Maca de transporte com elevação hidráulica, grades laterais e colchão de alta densidade.",
    especificacoes: ["Capacidade: 200 kg", "Altura: 50-90 cm hidráulica", "Leito: 190x65 cm", "Trendelenburg manual", "Grades rebatíveis", "Colchão 8 cm incluso"],
    imagem: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
    marca: "TransMed",
    modelo: "TM-H200",
    registroAnvisa: "81456789012",
    garantia: "24 meses",
    ofertas: [
      { id: "of-014-1", distribuidorId: "dist-1", preco: 8500, emEstoque: true, prazoEntrega: "7-10 dias úteis", frete: 0, parcelamento: "10x de R$ 850,00" },
      { id: "of-014-2", distribuidorId: "dist-2", preco: 9200, emEstoque: true, prazoEntrega: "5-7 dias úteis", frete: 200, parcelamento: "10x de R$ 920,00" },
      { id: "of-014-3", distribuidorId: "dist-5", preco: 7800, precoAntigo: 8800, emEstoque: true, prazoEntrega: "10-12 dias úteis", frete: 0, parcelamento: "10x de R$ 780,00" },
      { id: "of-014-4", distribuidorId: "dist-6", preco: 8900, emEstoque: true, prazoEntrega: "7-10 dias úteis", frete: 0, parcelamento: "10x de R$ 890,00" },
    ],
    novo: false,
    popular: true,
    promocao: true,
    dataCadastro: "2024-04-25",
  },
  {
    id: "kit-intubacao-dificil",
    nome: "Kit de Intubação Difícil Completo",
    categoria: "Vias Aéreas",
    categoriaSlug: "vias-aereas",
    descricao: "Kit completo para intubação difícil com videolaringoscópio e acessórios.",
    especificacoes: ["Videolaringoscópio 4 lâminas", "5 máscaras laríngeas", "Bougie adulto e pediátrico", "Guias de intubação", "Pinça de Magill", "Maleta rígida"],
    imagem: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
    marca: "AirwayPro",
    modelo: "AP-KID500",
    registroAnvisa: "81567890123",
    garantia: "12 meses",
    ofertas: [
      { id: "of-015-1", distribuidorId: "dist-1", preco: 12500, emEstoque: true, prazoEntrega: "5-7 dias úteis", frete: 0, parcelamento: "10x de R$ 1.250,00" },
      { id: "of-015-2", distribuidorId: "dist-3", preco: 11800, precoAntigo: 14000, emEstoque: true, prazoEntrega: "7-10 dias úteis", frete: 0, parcelamento: "10x de R$ 1.180,00" },
      { id: "of-015-3", distribuidorId: "dist-5", preco: 13500, emEstoque: true, prazoEntrega: "3-5 dias úteis", frete: 0, parcelamento: "10x de R$ 1.350,00" },
    ],
    novo: true,
    popular: false,
    promocao: true,
    dataCadastro: "2024-09-10",
  },
  {
    id: "ressuscitador-manual-ambu",
    nome: "Ressuscitador Manual Adulto (Ambu)",
    categoria: "Emergência",
    categoriaSlug: "emergencia",
    descricao: "Ressuscitador manual adulto de silicone com válvula unidirecional e reservatório.",
    especificacoes: ["Material: Silicone médico", "Volume: 1600 mL", "Válvula unidirecional", "Reservatório O2: 2600 mL", "Máscara adulto tamanho 5", "Autoclavável 134°C", "Livre de látex"],
    imagem: "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=800&q=80",
    marca: "RespiCare",
    modelo: "RC-AMB100",
    registroAnvisa: "81678901234",
    garantia: "12 meses",
    ofertas: [
      { id: "of-016-1", distribuidorId: "dist-1", preco: 250, emEstoque: true, prazoEntrega: "2-3 dias úteis", frete: 25, parcelamento: "3x de R$ 83,33" },
      { id: "of-016-2", distribuidorId: "dist-2", preco: 280, emEstoque: true, prazoEntrega: "3-5 dias úteis", frete: 0, parcelamento: "3x de R$ 93,33" },
      { id: "of-016-3", distribuidorId: "dist-3", preco: 220, precoAntigo: 280, emEstoque: true, prazoEntrega: "5-7 dias úteis", frete: 0, parcelamento: "3x de R$ 73,33" },
      { id: "of-016-4", distribuidorId: "dist-4", preco: 290, emEstoque: true, prazoEntrega: "3-5 dias úteis", frete: 30, parcelamento: "3x de R$ 96,67" },
      { id: "of-016-5", distribuidorId: "dist-5", preco: 265, emEstoque: true, prazoEntrega: "2-3 dias úteis", frete: 0, parcelamento: "3x de R$ 88,33" },
    ],
    novo: false,
    popular: true,
    promocao: true,
    dataCadastro: "2024-01-15",
  },
];

// Funções auxiliares
export function getEquipamentoById(id: string): Equipamento | undefined {
  return equipamentos.find((eq) => eq.id === id);
}

export function getDistribuidorById(id: string): Distribuidor | undefined {
  return distribuidores.find((dist) => dist.id === id);
}

export function getCategoriaBySlug(slug: string): Categoria | undefined {
  return categorias.find((cat) => cat.slug === slug);
}

export function getEquipamentosPorCategoria(categoriaSlug: string): Equipamento[] {
  return equipamentos.filter((eq) => eq.categoriaSlug === categoriaSlug);
}

export function getEquipamentosPopulares(): Equipamento[] {
  return equipamentos.filter((eq) => eq.popular);
}

export function getEquipamentosNovos(): Equipamento[] {
  return equipamentos.filter((eq) => eq.novo);
}

export function getEquipamentosEmPromocao(): Equipamento[] {
  return equipamentos.filter((eq) => eq.promocao);
}

export function getMenorPreco(equipamento: Equipamento): number {
  if (equipamento.ofertas.length === 0) return 0;
  return Math.min(...equipamento.ofertas.map((o) => o.preco));
}

export function getMaiorPreco(equipamento: Equipamento): number {
  if (equipamento.ofertas.length === 0) return 0;
  return Math.max(...equipamento.ofertas.map((o) => o.preco));
}

export function formatarPreco(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function calcularDesconto(precoAtual: number, precoAntigo: number): number {
  return Math.round(((precoAntigo - precoAtual) / precoAntigo) * 100);
}

export function buscarEquipamentos(termo: string, categoriaSlug?: string): Equipamento[] {
  const termoNormalizado = termo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return equipamentos.filter((eq) => {
    if (categoriaSlug && categoriaSlug !== "todas" && eq.categoriaSlug !== categoriaSlug) return false;

    const nomeNorm = eq.nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const categoriaNorm = eq.categoria.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const descricaoNorm = eq.descricao.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const marcaNorm = (eq.marca || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    return nomeNorm.includes(termoNormalizado) || categoriaNorm.includes(termoNormalizado) || descricaoNorm.includes(termoNormalizado) || marcaNorm.includes(termoNormalizado);
  });
}
