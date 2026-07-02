'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Search, 
  ArrowRight, 
  MapPin, 
  Maximize2, 
  Bed, 
  Car, 
  Warehouse, 
  Shield, 
  Briefcase, 
  User, 
  Map, 
  Cpu, 
  Wrench, 
  ShieldCheck, 
  BarChart3, 
  Handshake, 
  Phone, 
  Share2, 
  Globe, 
  LayoutDashboard, 
  Home, 
  CreditCard, 
  FileText, 
  MessageSquare, 
  Plus, 
  Settings, 
  HelpCircle, 
  Headphones, 
  Calendar, 
  Wallet, 
  Info, 
  Bath, 
  HardHat, 
  Droplets, 
  Lightbulb, 
  Wind, 
  FolderOpen, 
  FileCode, 
  BookOpen, 
  ChevronRight, 
  Users, 
  Zap, 
  Bell, 
  Send,
  SlidersHorizontal,
  PlusCircle,
  X,
  QrCode,
  Copy,
  CheckCircle,
  Activity,
  FileCheck,
  AlertTriangle,
  Play,
  RotateCcw
} from 'lucide-react';

// ============================================================================
// Types & Schemas (MongoDB equivalent represented in synchronized React state)
// ============================================================================

interface Property {
  id: string;
  title: string;
  type: 'Loft Luxo' | 'Galpão Ind.' | 'Corporativo';
  location: string;
  price: number | null; // null for "Sob Consulta"
  size: string;
  suites: number;
  parking: number;
  image: string;
  tag: 'RESERVA AIC' | 'COMERCIAL' | 'EXECUTIVE';
  specs: string[];
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyTitle: string;
  status: 'Lead' | 'Visita' | 'Proposta' | 'Contrato';
  date: string;
}

interface Contract {
  id: string;
  clientName: string;
  clientRole: 'Locatário' | 'Comprador';
  propertyName: string;
  propertyLocation: string;
  type: 'Locação' | 'Venda';
  dueDate: string;
  value: number;
  rentValue?: number;
  condoValue?: number;
  status: 'Ativo' | 'Pendente Assinatura' | 'Finalizado';
  idCode: string;
}

interface MaintenanceTicket {
  id: string;
  title: string;
  propertyName: string;
  description: string;
  date: string;
  status: 'Aberto' | 'Em andamento' | 'Resolvido';
  urgency: 'URGENTE' | 'ALTA' | 'MÉDIA';
  categoryIcon: 'water_drop' | 'lightbulb' | 'air' | 'bolt';
  idCode: string;
}

interface Payment {
  id: string;
  refMonth: string;
  value: number;
  rentValue: number;
  condoValue: number;
  dueDate: string;
  status: 'Pago' | 'Pendente' | 'Atrasado';
  paymentDate?: string;
}

// Initial Mock Data matching screenshots perfectly
const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'Villa Industrial Glass',
    type: 'Loft Luxo',
    location: 'Setor de Mansões, Brasília',
    price: 4250000,
    size: '450m²',
    suites: 4,
    parking: 6,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    tag: 'RESERVA AIC',
    specs: ['450m²', '4 Suítes', '6 Vagas']
  },
  {
    id: 'prop-2',
    title: 'Logistics Hub North',
    type: 'Galpão Ind.',
    location: 'Distrito Industrial, Goiânia',
    price: 12800000,
    size: '2.400m²',
    suites: 0,
    parking: 12,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    tag: 'COMERCIAL',
    specs: ['2.400m²', '12 Docas', 'Vigilância 24h']
  },
  {
    id: 'prop-3',
    title: 'Penthouse Office Corporate',
    type: 'Corporativo',
    location: 'Centro Empresarial, São Paulo',
    price: null, // Sob consulta
    size: '320m²',
    suites: 0,
    parking: 0,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    tag: 'EXECUTIVE',
    specs: ['320m²', '40 Colab.', 'Perto do Metrô']
  }
];

const INITIAL_LEADS: Lead[] = [
  { id: 'lead-1', name: 'Ricardo Soares', email: 'ricardo@luxedomus.com', phone: '(61) 98334-0012', propertyTitle: 'Edifício Horizon, Ap 1402', status: 'Contrato', date: '02/07/2026' },
  { id: 'lead-2', name: 'Mariana Alvim', email: 'mariana.alvim@corp.com', phone: '(11) 99182-3847', propertyTitle: 'Casa Villa-Lobos', status: 'Visita', date: '01/07/2026' },
  { id: 'lead-3', name: 'João Pedro', email: 'joao.pedro@gmail.com', phone: '(62) 97721-3948', propertyTitle: 'Loft Vila Madalena', status: 'Proposta', date: '30/06/2026' },
  { id: 'lead-4', name: 'Clara Costa', email: 'clara.costa@tech.com', phone: '(11) 98845-1212', propertyTitle: 'Logistics Hub North', status: 'Lead', date: '02/07/2026' }
];

const INITIAL_CONTRACTS: Contract[] = [
  {
    id: 'contract-1',
    clientName: 'Ricardo Soares',
    clientRole: 'Locatário',
    propertyName: 'Edifício Horizon, Ap 1402',
    propertyLocation: 'Av. Brigadeiro Faria Lima, 3477 - SP',
    type: 'Locação',
    dueDate: '10 Out 2024',
    value: 4850,
    rentValue: 4200,
    condoValue: 650,
    status: 'Ativo',
    idCode: '#4820'
  },
  {
    id: 'contract-2',
    clientName: 'Mariana Alvim',
    clientRole: 'Comprador',
    propertyName: 'Casa Villa-Lobos',
    propertyLocation: 'Alto de Pinheiros, SP',
    type: 'Venda',
    dueDate: '22 Set 2024',
    value: 4200000,
    status: 'Ativo',
    idCode: '#4821'
  },
  {
    id: 'contract-3',
    clientName: 'João Pedro',
    clientRole: 'Locatário',
    propertyName: 'Loft Vila Madalena',
    propertyLocation: 'Vila Madalena, SP',
    type: 'Locação',
    dueDate: '08 Out 2024',
    value: 5800,
    rentValue: 5000,
    condoValue: 800,
    status: 'Ativo',
    idCode: '#4822'
  }
];

const INITIAL_TICKETS: MaintenanceTicket[] = [
  {
    id: 'ticket-1',
    title: 'Vazamento na Cozinha',
    propertyName: 'Edifício Horizon, Ap 1402',
    description: 'Infiltração grave sob a pia da cozinha, vazando água no armário embutido principal.',
    date: '28 Set 2024',
    status: 'Em andamento',
    urgency: 'URGENTE',
    categoryIcon: 'water_drop',
    idCode: '#4492'
  },
  {
    id: 'ticket-2',
    title: 'Troca de fiação - Sala',
    propertyName: 'Edifício Horizon, Ap 1402',
    description: 'Curto-circuito na tomada principal da sala após ligar o ar-condicionado na potência máxima.',
    date: '15 Set 2024',
    status: 'Resolvido',
    urgency: 'ALTA',
    categoryIcon: 'lightbulb',
    idCode: '#4321'
  },
  {
    id: 'ticket-3',
    title: 'Limpeza Ar Condicionado',
    propertyName: 'Edifício Horizon, Ap 1402',
    description: 'Manutenção preventiva periódica e higienização dos filtros da suíte principal.',
    date: '02 Ago 2024',
    status: 'Resolvido',
    urgency: 'MÉDIA',
    categoryIcon: 'air',
    idCode: '#4105'
  },
  {
    id: 'ticket-4',
    title: 'Queda de Disjuntor',
    propertyName: 'Cond. Brisas - Bloco B',
    description: 'Disjuntor geral desarmando repentinamente ao ligar simultaneamente o forno e o chuveiro.',
    date: '02 Jul 2026',
    status: 'Aberto',
    urgency: 'ALTA',
    categoryIcon: 'bolt',
    idCode: '#4510'
  }
];

const INITIAL_PAYMENTS: Payment[] = [
  {
    id: 'pay-1',
    refMonth: 'Outubro 2024',
    value: 4850,
    rentValue: 4200,
    condoValue: 650,
    dueDate: '10 Out 2024',
    status: 'Pendente'
  }
];

export default function HomeApp() {
  // Global synchronized state representing the shared database (MongoDB Stitch backend emulator)
  const [activePortal, setActivePortal] = React.useState<'public' | 'client' | 'admin'>('public');
  const [properties, setProperties] = React.useState<Property[]>(INITIAL_PROPERTIES);
  const [leads, setLeads] = React.useState<Lead[]>(INITIAL_LEADS);
  const [contracts, setContracts] = React.useState<Contract[]>(INITIAL_CONTRACTS);
  const [tickets, setTickets] = React.useState<MaintenanceTicket[]>(INITIAL_TICKETS);
  const [payments, setPayments] = React.useState<Payment[]>(INITIAL_PAYMENTS);

  // Filter States for Public Site
  const [filterPurpose, setFilterPurpose] = React.useState<string>('Comprar');
  const [filterType, setFilterType] = React.useState<string>('Loft Luxo');
  const [filterLocation, setFilterLocation] = React.useState<string>('');

  // Client Ticket State
  const [showNewTicketModal, setShowNewTicketModal] = React.useState(false);
  const [newTicketTitle, setNewTicketTitle] = React.useState('');
  const [newTicketDesc, setNewTicketDesc] = React.useState('');
  const [newTicketUrgency, setNewTicketUrgency] = React.useState<'URGENTE' | 'ALTA' | 'MÉDIA'>('MÉDIA');
  const [newTicketCategory, setNewTicketCategory] = React.useState<'water_drop' | 'lightbulb' | 'air' | 'bolt'>('water_drop');

  // Client PIX Payment Modal State
  const [showPixModal, setShowPixModal] = React.useState(false);
  const [pixStatus, setPixStatus] = React.useState<'pending' | 'processing' | 'completed'>('pending');
  const [copiedPixKey, setCopiedPixKey] = React.useState(false);

  // Admin New Property Modal State
  const [showNewPropertyModal, setShowNewPropertyModal] = React.useState(false);
  const [newPropTitle, setNewPropTitle] = React.useState('');
  const [newPropType, setNewPropType] = React.useState<'Loft Luxo' | 'Galpão Ind.' | 'Corporativo'>('Loft Luxo');
  const [newPropLocation, setNewPropLocation] = React.useState('');
  const [newPropPrice, setNewPropPrice] = React.useState('');
  const [newPropSpecs, setNewPropSpecs] = React.useState('');
  const [newPropTag, setNewPropTag] = React.useState<'RESERVA AIC' | 'COMERCIAL' | 'EXECUTIVE'>('RESERVA AIC');

  // Lead Submission State on Public Portal
  const [showLeadSubmitModal, setShowLeadSubmitModal] = React.useState(false);
  const [leadSubmitName, setLeadSubmitName] = React.useState('');
  const [leadSubmitEmail, setLeadSubmitEmail] = React.useState('');
  const [leadSubmitPhone, setLeadSubmitPhone] = React.useState('');
  const [leadSubmitProperty, setLeadSubmitProperty] = React.useState('');

  // Search Filter state in Admin View
  const [adminSearchQuery, setAdminSearchQuery] = React.useState('');

  // Stitch Automation Log Console State
  const [automationLogs, setAutomationLogs] = React.useState<Array<{time: string, text: string, type: 'info' | 'success' | 'warn'}>>([
    { time: '10:00:00', text: 'MongoDB Stitch Authentication provider active: email/password & Google Auth.', type: 'info' },
    { time: '10:05:00', text: 'Database Triggers initialized on collection "maintenance_tickets".', type: 'info' },
    { time: '10:15:00', text: 'Stitch Serverless Function gerarCobranca() synchronized with Asaas API.', type: 'success' }
  ]);
  const [showLogConsole, setShowLogConsole] = React.useState(false);

  // Toast Notification State
  const [toast, setToast] = React.useState<{message: string, type: 'success' | 'info'} | null>(null);

  const triggerToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Helper function to simulate adding an automation log
  const addLog = (text: string, type: 'info' | 'success' | 'warn' = 'info') => {
    const timeStr = new Date().toLocaleTimeString('pt-BR');
    setAutomationLogs(prev => [{ time: timeStr, text, type }, ...prev]);
  };

  // --------------------------------------------------------------------------
  // Serverless / Trigger Mock Actions (Stitch Functions requested in the prompt)
  // --------------------------------------------------------------------------
  
  // 1. gerarCobranca() - Stitch Function triggered on Day 1st or by admin
  const handleGerarCobranca = () => {
    addLog('Chamando Stitch Function: gerarCobranca()...', 'info');
    addLog('Conectando ao gateway de pagamentos Asaas API...', 'info');
    
    // Simulate payment generation
    setTimeout(() => {
      const newPayment: Payment = {
        id: `pay-${Date.now()}`,
        refMonth: 'Novembro 2024',
        value: 4850,
        rentValue: 4200,
        condoValue: 650,
        dueDate: '10 Nov 2024',
        status: 'Pendente'
      };
      setPayments(prev => [...prev, newPayment]);
      addLog('Cobrança registrada na collection "payments" via Asaas.', 'success');
      addLog('Trigger disparado: E-mail de cobrança enviado para inquilino Ricardo.', 'success');
      triggerToast('gerarCobranca() executada com sucesso! Nova fatura gerada.');
    }, 1200);
  };

  // 2. assinarContrato() - Stitch Function for ZapSign/Clicksign
  const handleAssinarContrato = (clientName: string) => {
    addLog(`Chamando Stitch Function: assinarContrato() para ${clientName}...`, 'info');
    addLog('Enviando template do contrato e webhooks para ZapSign...', 'info');
    
    setTimeout(() => {
      setContracts(prev => prev.map(c => 
        c.clientName === clientName ? { ...c, status: 'Pendente Assinatura' } : c
      ));
      addLog(`ZapSign Link gerado e disparado para e-mail de ${clientName}.`, 'success');
      triggerToast(`ZapSign ativado para o contrato de ${clientName}!`);
    }, 1000);
  };

  // 3. exportarPortais() - Generates XML feed for Zap / VivaReal
  const handleExportarPortais = () => {
    addLog('Chamando Stitch Function: exportarPortais()...', 'info');
    addLog('Buscando imóveis com status "Disponível" na collection "properties"...', 'info');
    
    setTimeout(() => {
      const xmlString = `<?xml version="1.0" encoding="utf-8"?>
<ListingDataFeed xmlns="http://www.vivareal.com.br/schemas/1.0/feed">
  <Header>
    <Provider>AIC Empreendimentos</Provider>
    <Email>contato@aicempreendimentos.com.br</Email>
  </Header>
  <Listings>
    ${properties.map(p => `
    <Listing>
      <ListingID>${p.id}</ListingID>
      <Title>${p.title}</Title>
      <TransactionType>${p.tag === 'COMERCIAL' ? 'Venda' : 'Aluguel/Venda'}</TransactionType>
      <DetailViewUrl>https://aicempreendimentos.com.br/imoveis/${p.id}</DetailViewUrl>
      <Location>
        <City>${p.location.split(', ')[1] || 'Brasília'}</City>
        <Neighborhood>${p.location.split(', ')[0]}</Neighborhood>
      </Location>
      <Details>
        <PropertyType>${p.type}</PropertyType>
        <Price currency="BRL">${p.price || 'Sob Consulta'}</Price>
        <Size>${p.size}</Size>
      </Details>
    </Listing>`).join('')}
  </Listings>
</ListingDataFeed>`;

      addLog('Arquivo XML gerado com sucesso para Zap e VivaReal.', 'success');
      
      // Open feed in a simulated beautiful modal
      const blob = new Blob([xmlString], { type: 'text/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'feed-AIC-zap-vivareal.xml';
      a.click();
      
      triggerToast('XML para portais gerado e baixado com sucesso!');
    }, 800);
  };

  // 4. Scheduled Trigger (Diário) - Cobranças vencidas há 3 dias
  const handleDailyTrigger = () => {
    addLog('Disparando Scheduled Trigger: Verificação Diária de Inadimplência...', 'info');
    let alertSent = false;
    payments.forEach(p => {
      if (p.status === 'Pendente') {
        alertSent = true;
        addLog(`Fatura ${p.refMonth} vencendo. Alerta SMS/E-mail enviado para o inquilino.`, 'warn');
      }
    });
    
    setTimeout(() => {
      if (alertSent) {
        addLog('Disparos automáticos de lembrete diário concluídos.', 'success');
        triggerToast('Gatilho Diário: Lembretes enviados para faturas pendentes.');
      } else {
        addLog('Nenhuma cobrança atrasada encontrada.', 'info');
        triggerToast('Gatilho Diário: Nenhuma cobrança pendente.');
      }
    }, 800);
  };

  // --------------------------------------------------------------------------
  // UI Interactive Handlers
  // --------------------------------------------------------------------------

  // Public Lead Submission Form Handler
  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadSubmitName || !leadSubmitEmail || !leadSubmitPhone) return;

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: leadSubmitName,
      email: leadSubmitEmail,
      phone: leadSubmitPhone,
      propertyTitle: leadSubmitProperty || 'Consultoria Geral',
      status: 'Lead',
      date: new Date().toLocaleDateString('pt-BR')
    };

    setLeads(prev => [newLead, ...prev]);
    setShowLeadSubmitModal(false);
    
    // Stitch Database Trigger trigger
    addLog(`Database Trigger: Novo Lead inserido ("${leadSubmitName}"). Notificando corretores...`, 'success');
    addLog(`E-mail de boas-vindas enviado automaticamente para ${leadSubmitEmail}.`, 'info');
    
    setLeadSubmitName('');
    setLeadSubmitEmail('');
    setLeadSubmitPhone('');
    
    triggerToast('Solicitação agendada! Um consultor entrará em contato.');
  };

  // Client Open Ticket Form Handler
  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketTitle || !newTicketDesc) return;

    const newTicket: MaintenanceTicket = {
      id: `ticket-${Date.now()}`,
      title: newTicketTitle,
      propertyName: 'Edifício Horizon, Ap 1402',
      description: newTicketDesc,
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Aberto',
      urgency: newTicketUrgency,
      categoryIcon: newTicketCategory,
      idCode: `#${Math.floor(4000 + Math.random() * 999)}`
    };

    setTickets(prev => [newTicket, ...prev]);
    setShowNewTicketModal(false);

    // Database Trigger Simulator on Insert
    addLog(`Database Trigger: On Insert em maintenance_tickets (${newTicket.idCode})`, 'info');
    addLog(`Gatilho disparado: Enviando e-mail automático para o corretor responsável...`, 'success');
    
    setNewTicketTitle('');
    setNewTicketDesc('');
    
    triggerToast('Chamado de manutenção aberto com sucesso!');
  };

  // Client PIX Payment Simulation Handler
  const handleSimulatePixPayment = () => {
    setPixStatus('processing');
    addLog('Processando pagamento via Pix no gateway Asaas...', 'info');
    
    setTimeout(() => {
      setPixStatus('completed');
      setPayments(prev => prev.map(p => p.status === 'Pendente' ? { ...p, status: 'Pago', paymentDate: new Date().toLocaleDateString('pt-BR') } : p));
      
      addLog('Webhook de Pagamento Confirmado recebido do Asaas API.', 'success');
      addLog('Collection "payments" atualizada para status: Pago.', 'success');
      
      triggerToast('Pagamento confirmado via PIX!');
    }, 2000);
  };

  // Admin New Property Submission Handler
  const handleCreateProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPropTitle || !newPropLocation) return;

    const newProp: Property = {
      id: `prop-${Date.now()}`,
      title: newPropTitle,
      type: newPropType,
      location: newPropLocation,
      price: newPropPrice ? parseFloat(newPropPrice.replace(/\D/g, '')) : null,
      size: newPropSpecs ? newPropSpecs.split('|')[0]?.trim() || '200m²' : '200m²',
      suites: 0,
      parking: 0,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      tag: newPropTag,
      specs: newPropSpecs ? newPropSpecs.split('|').map(s => s.trim()) : ['200m²']
    };

    setProperties(prev => [newProp, ...prev]);
    setShowNewPropertyModal(false);

    addLog(`Novo imóvel cadastrado na collection "properties": ${newPropTitle}`, 'success');
    
    setNewPropTitle('');
    setNewPropLocation('');
    setNewPropPrice('');
    setNewPropSpecs('');
    
    triggerToast('Imóvel adicionado com sucesso e publicado na vitrine!');
  };

  // Helper calculation for Admin stats
  const totalRevenue = payments.reduce((acc, p) => p.status === 'Pago' ? acc + p.value : acc, 842000);
  const activePropertiesCount = properties.length + 139; // offset to match screenshot active count
  const criticalTicketsCount = tickets.filter(t => t.status !== 'Resolvido' && t.urgency === 'URGENTE').length;

  return (
    <div className="min-h-screen bg-[#faf8ff] text-luxe-dark flex flex-col font-sans selection:bg-brand-primary/10">
      
      {/* ============================================================================
          STITCH AUTOMATION ENGINE BAR (UTILITY INTERACTIVE OVERVIEW)
          ============================================================================ */}
      <div className="bg-[#1e1b18] text-[#f7efea] text-xs border-b border-[#33302c] sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-2.5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-[11px] uppercase tracking-wider text-burnt-gold font-display">MongoDB Atlas App Services (Stitch Engine) Ativo</span>
            <span className="hidden md:inline text-[10px] text-zinc-400">|</span>
            <span className="hidden md:inline text-[10px] text-zinc-400">Gatilhos Serverless e Webhooks de Pagamento (Asaas, ZapSign) 100% integrados</span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowLogConsole(!showLogConsole)}
              className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-[#f7efea] text-[10px] uppercase font-bold rounded flex items-center gap-1.5 transition-colors border border-zinc-700"
            >
              <Cpu className="h-3 w-3 text-burnt-gold" />
              {showLogConsole ? 'Ocultar Monitor' : 'Monitor de Gatilhos'}
            </button>

            <div className="flex items-center bg-zinc-800 rounded border border-zinc-700 p-0.5">
              <button 
                onClick={() => setActivePortal('public')}
                className={`px-3 py-1 text-[11px] font-semibold rounded transition-all ${activePortal === 'public' ? 'bg-burnt-gold text-white' : 'text-zinc-400 hover:text-white'}`}
              >
                Vitrine AIC
              </button>
              <button 
                onClick={() => setActivePortal('client')}
                className={`px-3 py-1 text-[11px] font-semibold rounded transition-all ${activePortal === 'client' ? 'bg-[#FC8B24] text-white' : 'text-zinc-400 hover:text-white'}`}
              >
                Inquilino (Luxe)
              </button>
              <button 
                onClick={() => setActivePortal('admin')}
                className={`px-3 py-1 text-[11px] font-semibold rounded transition-all ${activePortal === 'admin' ? 'bg-zinc-600 text-white' : 'text-zinc-400 hover:text-white'}`}
              >
                Admin CRM
              </button>
            </div>
          </div>
        </div>

        {/* LOG MONITOR DRAWER */}
        <AnimatePresence>
          {showLogConsole && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-zinc-950 border-t border-zinc-800 font-mono text-[11px] text-zinc-300 overflow-hidden"
            >
              <div className="max-w-[1440px] mx-auto p-4 flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="flex justify-between items-center pb-2 border-b border-zinc-800 mb-2">
                    <span className="font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                      <SlidersHorizontal className="h-3.5 w-3.5 animate-pulse" /> Console de Funções Serverless
                    </span>
                    <button 
                      onClick={() => setAutomationLogs([])}
                      className="text-[10px] text-zinc-500 hover:text-zinc-300 flex items-center gap-1"
                    >
                      <RotateCcw className="h-2.5 w-2.5" /> Limpar Logs
                    </button>
                  </div>
                  <div className="max-h-40 overflow-y-auto custom-scrollbar space-y-1.5 text-zinc-400 pr-2">
                    {automationLogs.length === 0 ? (
                      <p className="text-zinc-600 italic">Nenhum evento registrado. Experimente realizar interações nas telas do app!</p>
                    ) : (
                      automationLogs.map((log, index) => (
                        <div key={index} className="flex gap-2.5">
                          <span className="text-zinc-600">[{log.time}]</span>
                          <span className={log.type === 'success' ? 'text-emerald-400' : log.type === 'warn' ? 'text-amber-400' : 'text-zinc-300'}>
                            {log.text}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-zinc-800 pt-3 md:pt-0 md:pl-4 flex flex-col justify-between">
                  <div className="text-[10px] uppercase font-bold text-burnt-gold tracking-widest mb-2">Simular Operações de Servidor (MongoDB Atlas)</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={handleGerarCobranca}
                      className="py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded border border-zinc-700 text-left px-2 flex items-center gap-1 font-bold"
                    >
                      <Play className="h-2.5 w-2.5 text-emerald-400" />
                      gerarCobranca()
                    </button>
                    <button 
                      onClick={handleExportarPortais}
                      className="py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded border border-zinc-700 text-left px-2 flex items-center gap-1 font-bold"
                    >
                      <Play className="h-2.5 w-2.5 text-emerald-400" />
                      exportarPortais()
                    </button>
                    <button 
                      onClick={handleDailyTrigger}
                      className="py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded border border-zinc-700 text-left px-2 flex items-center gap-1 font-bold"
                    >
                      <Play className="h-2.5 w-2.5 text-emerald-400" />
                      Scheduled (Diário)
                    </button>
                    <button 
                      onClick={() => {
                        handleAssinarContrato('Ricardo Soares');
                      }}
                      className="py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded border border-zinc-700 text-left px-2 flex items-center gap-1 font-bold"
                    >
                      <Play className="h-2.5 w-2.5 text-emerald-400" />
                      assinarContrato()
                    </button>
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-2 leading-tight">
                    Essas rotas emulam as chamadas Stitch JavaScript Functions de retaguarda, que atualizam o banco de dados e gateways em tempo real.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ============================================================================
          GLOBAL SYSTEM TOAST
          ============================================================================ */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-[#1e1b18] text-[#f7efea] border border-burnt-gold/30 px-5 py-4 rounded shadow-2xl flex items-center gap-3 max-w-sm"
          >
            {toast.type === 'success' ? (
              <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
            ) : (
              <Info className="h-5 w-5 text-burnt-gold flex-shrink-0" />
            )}
            <div className="text-xs">
              <span className="font-bold block text-burnt-gold uppercase tracking-wider mb-0.5">Sincronização de Banco de Dados</span>
              <p className="text-zinc-300 leading-relaxed font-sans">{toast.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================================
          VIEW 1: SITE PÚBLICO (AIC EMPREENDIMENTOS)
          ============================================================================ */}
      {activePortal === 'public' && (
        <div className="flex-1 flex flex-col bg-[#fff8f4]">
          {/* Header */}
          <header className="bg-[#fff8f4] border-b border-[#d2c4b7]/30 h-20 flex justify-between items-center px-4 md:px-12 max-w-[1440px] w-full mx-auto z-10">
            <div className="flex items-center gap-10">
              <a href="#" className="flex items-center gap-2">
                <div className="bg-brand-primary p-2 rounded">
                  <Building2 className="h-6 w-6 text-[#fff8f4]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-lg text-brand-primary leading-tight uppercase tracking-tight">AIC</span>
                  <span className="text-[9px] font-sans font-semibold tracking-[0.25em] text-burnt-gold uppercase">Empreendimentos</span>
                </div>
              </a>
              <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
                <a href="#" className="text-brand-primary border-b-2 border-metallic-cobre pb-1">Imóveis</a>
                <a href="#" className="text-[#4e453b] hover:text-brand-primary transition-colors">Sobre</a>
                <a href="#" className="text-[#4e453b] hover:text-brand-primary transition-colors">Contato</a>
                <button 
                  onClick={() => {
                    setActivePortal('client');
                    addLog('Redirecionado para Área do Cliente via cabeçalho da vitrine.', 'info');
                  }}
                  className="text-[#4e453b] hover:text-brand-primary transition-colors text-left"
                >
                  Área do Cliente
                </button>
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => {
                  setActivePortal('admin');
                  addLog('Atalhado para painel de corretores a partir da vitrine.', 'info');
                }}
                className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-[#fff8f4] rounded text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-md shadow-brand-primary/10"
              >
                <PlusCircle className="h-4 w-4" />
                Anunciar Imóvel
              </button>
              <button 
                onClick={() => setActivePortal('client')}
                className="md:hidden p-2 text-brand-primary"
              >
                <User className="h-6 w-6" />
              </button>
            </div>
          </header>

          {/* Hero Section */}
          <section className="relative min-h-[60vh] md:min-h-[75vh] flex items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-[10s]"
                style={{ 
                  backgroundImage: `linear-gradient(to right, rgba(20, 15, 10, 0.75) 40%, rgba(20, 15, 10, 0.2) 100%), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')` 
                }}
              />
            </div>
            
            <div className="relative z-10 px-4 md:px-12 w-full max-w-[1440px] mx-auto py-12 md:py-24">
              <div className="max-w-2xl text-white space-y-6">
                <span className="text-burnt-gold text-xs font-bold uppercase tracking-[0.3em] block">Tecnologia e Precisão</span>
                <h1 className="font-display text-4xl md:text-5xl font-bold leading-[1.15] text-[#f7efea]">
                  Engenharia de precisão para seu <span className="text-burnt-gold">patrimônio.</span>
                </h1>
                <p className="text-sm md:text-base text-zinc-300 font-sans leading-relaxed max-w-xl">
                  Especialistas em empreendimentos de alto padrão e ativos industriais. Conectamos investidores seniores aos imóveis e galpões comerciais mais exclusivos do mercado.
                </p>
              </div>

              {/* Advanced Search Box */}
              <div className="mt-12 bg-[#fff8f4]/95 backdrop-blur-md p-4 rounded shadow-2xl max-w-4xl border border-[#d2c4b7]/30">
                <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                  <div className="px-3 py-2 border-r border-[#d2c4b7]/30">
                    <label className="block text-[9px] font-bold text-burnt-gold mb-1 uppercase tracking-widest">Finalidade</label>
                    <select 
                      value={filterPurpose}
                      onChange={(e) => setFilterPurpose(e.target.value)}
                      className="w-full bg-transparent border-none focus:ring-0 text-xs font-bold text-brand-primary p-0 cursor-pointer"
                    >
                      <option>Comprar</option>
                      <option>Alugar</option>
                    </select>
                  </div>
                  <div className="px-3 py-2 border-r border-[#d2c4b7]/30">
                    <label className="block text-[9px] font-bold text-burnt-gold mb-1 uppercase tracking-widest">Tipo</label>
                    <select 
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="w-full bg-transparent border-none focus:ring-0 text-xs font-bold text-brand-primary p-0 cursor-pointer"
                    >
                      <option>Loft Luxo</option>
                      <option>Galpão Ind.</option>
                      <option>Corporativo</option>
                    </select>
                  </div>
                  <div className="px-3 py-2">
                    <label className="block text-[9px] font-bold text-burnt-gold mb-1 uppercase tracking-widest">Localização</label>
                    <input 
                      type="text"
                      value={filterLocation}
                      onChange={(e) => setFilterLocation(e.target.value)}
                      placeholder="Cidade ou Bairro"
                      className="w-full bg-transparent border-none focus:ring-0 text-xs font-semibold text-[#4e453b] p-0 placeholder:text-[#d2c4b7]"
                    />
                  </div>
                  <div>
                    <button className="w-full h-12 bg-burnt-gold hover:bg-brand-primary text-white rounded flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-burnt-gold/20">
                      <Search className="h-4 w-4" />
                      Buscar Imóveis
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Properties */}
          <section className="py-20 bg-[#faf2ec] px-4 md:px-12 max-w-[1440px] w-full mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div className="space-y-2">
                <span className="text-metallic-cobre text-xs font-bold uppercase tracking-[0.2em] block">Exclusividade</span>
                <h2 className="font-display text-2xl md:text-3xl text-brand-primary font-bold">Imóveis em Destaque</h2>
              </div>
              <a href="#" className="text-brand-primary font-bold text-sm flex items-center gap-1.5 hover:translate-x-1 transition-transform uppercase tracking-wider">
                Ver catálogo completo <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties
                .filter(p => {
                  if (filterType && p.type !== filterType) return false;
                  if (filterLocation && !p.location.toLowerCase().includes(filterLocation.toLowerCase())) return false;
                  return true;
                })
                .map((p) => (
                  <div key={p.id} className="group bg-[#fff8f4] border border-[#d2c4b7]/30 overflow-hidden hover:border-metallic-cobre transition-colors shadow-sm flex flex-col h-full justify-between">
                    <div className="relative h-64 overflow-hidden bg-zinc-200">
                      <img 
                        src={p.image} 
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-burnt-gold text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm">
                        {p.tag}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md text-white p-2.5 rounded-sm">
                        <p className="font-display text-sm font-bold tracking-tight">
                          {p.price ? `R$ ${p.price.toLocaleString('pt-BR')}` : 'Sob Consulta'}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-display text-base font-bold text-brand-primary leading-snug">{p.title}</h3>
                        <p className="text-xs text-[#4e453b] flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-burnt-gold" />
                          {p.location}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#d2c4b7]/30 flex justify-between items-center text-xs text-[#4e453b] font-medium">
                        {p.type === 'Galpão Ind.' ? (
                          <>
                            <span className="flex items-center gap-1"><Warehouse className="h-4 w-4 text-burnt-gold" /> 2.400m²</span>
                            <span className="flex items-center gap-1"><SlidersHorizontal className="h-4 w-4 text-burnt-gold" /> 12 Docas</span>
                            <span className="flex items-center gap-1"><Shield className="h-4 w-4 text-burnt-gold" /> Seg. 24h</span>
                          </>
                        ) : p.type === 'Corporativo' ? (
                          <>
                            <span className="flex items-center gap-1"><Briefcase className="h-4 w-4 text-burnt-gold" /> 320m²</span>
                            <span className="flex items-center gap-1"><Users className="h-4 w-4 text-burnt-gold" /> 40 Colab</span>
                            <span className="flex items-center gap-1"><Map className="h-4 w-4 text-burnt-gold" /> Metrô Próx</span>
                          </>
                        ) : (
                          <>
                            <span className="flex items-center gap-1"><Maximize2 className="h-4 w-4 text-burnt-gold" /> 450m²</span>
                            <span className="flex items-center gap-1"><Bed className="h-4 w-4 text-burnt-gold" /> 4 Suítes</span>
                            <span className="flex items-center gap-1"><Car className="h-4 w-4 text-burnt-gold" /> 6 Vagas</span>
                          </>
                        )}
                      </div>

                      <button 
                        onClick={() => {
                          setLeadSubmitProperty(p.title);
                          setShowLeadSubmitModal(true);
                        }}
                        className="w-full py-2 bg-brand-primary text-white hover:bg-burnt-gold font-bold text-xs uppercase tracking-widest transition-colors rounded-sm"
                      >
                        Agendar Consultoria
                      </button>
                    </div>
                  </div>
              ))}
              {properties.filter(p => {
                if (filterType && p.type !== filterType) return false;
                if (filterLocation && !p.location.toLowerCase().includes(filterLocation.toLowerCase())) return false;
                return true;
              }).length === 0 && (
                <div className="col-span-full py-12 text-center text-[#4e453b] italic bg-[#fff8f4] border border-dashed border-[#d2c4b7]/50 rounded">
                  Nenhum imóvel disponível para os filtros selecionados.
                </div>
              )}
            </div>
          </section>

          {/* Why AIC Section */}
          <section className="py-24 px-4 md:px-12 max-w-[1440px] w-full mx-auto">
            <div className="max-w-3xl mb-16 space-y-2">
              <span className="text-burnt-gold text-xs font-bold uppercase tracking-[0.2em] block">Diferenciais</span>
              <h2 className="font-display text-2xl md:text-3xl text-brand-primary font-bold">A inteligência por trás de cada investimento.</h2>
              <p className="text-sm md:text-base text-[#4e453b]">
                Na AIC Empreendimentos, não apenas vendemos imóveis; estruturamos ativos financeiros robustos aliando transparência legal radical a soluções inteligentes em banco de dados de alta performance.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-[#f5ece7] p-8 rounded border border-[#d2c4b7]/10 flex flex-col justify-between">
                <div>
                  <Cpu className="h-10 w-10 text-metallic-cobre mb-6" />
                  <h3 className="font-display text-lg font-bold text-brand-primary mb-3">Tecnologia Proprietária</h3>
                  <p className="text-xs md:text-sm text-[#4e453b] leading-relaxed">
                    Nossa API e painel de controle serverless geram relatórios de rendimento e acompanhamento em tempo real para investidores e locatários de forma totalmente transparente e digital.
                  </p>
                </div>
                <div className="mt-8 text-[11px] font-mono text-burnt-gold font-bold uppercase tracking-wider">MongoDB Atlas Sync</div>
              </div>

              <div className="bg-[#f5ece7] p-8 rounded border border-[#d2c4b7]/10 flex flex-col justify-between">
                <div>
                  <ShieldCheck className="h-10 w-10 text-burnt-gold mb-6" />
                  <h3 className="font-display text-lg font-bold text-brand-primary mb-3">Transparência Radical</h3>
                  <p className="text-xs md:text-sm text-[#4e453b] leading-relaxed">
                    Laudos técnicos de engenharia, escrituras, certidões e históricos de manutenção centralizados em um banco de dados unificado de auditoria. Processo ágil sem intermediários.
                  </p>
                </div>
                <div className="mt-8 text-[11px] font-mono text-burnt-gold font-bold uppercase tracking-wider">Asaas / ZapSign API</div>
              </div>

              <div className="bg-brand-primary text-white p-8 rounded flex flex-col justify-between">
                <div>
                  <Handshake className="h-10 w-10 text-burnt-gold mb-6" />
                  <h3 className="font-display text-lg font-bold text-[#fff8f4] mb-3">Expertise Local</h3>
                  <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
                    Tradição e conhecimento profundo das regiões metropolitanas mais promissoras do Distrito Federal, São Paulo e Goiás. O parceiro certo para sua expansão industrial e residencial de luxo.
                  </p>
                </div>
                <div className="mt-8 text-[11px] font-mono text-burnt-gold font-bold uppercase tracking-wider">Líder desde 1994</div>
              </div>
            </div>
          </section>

          {/* CTA Banner */}
          <section className="py-16 bg-[#33302c] text-[#f7efea]">
            <div className="px-4 md:px-12 max-w-[1440px] w-full mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="space-y-2">
                <h2 className="font-display text-xl md:text-2xl font-bold">Pronto para elevar seu portfólio?</h2>
                <p className="text-xs md:text-sm text-zinc-400">Nossos corretores sêniores estão à disposição para uma análise de viabilidade personalizada.</p>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <button 
                  onClick={() => {
                    setLeadSubmitProperty('Consultoria Sênior');
                    setShowLeadSubmitModal(true);
                  }}
                  className="flex-1 md:flex-none px-6 py-3.5 bg-burnt-gold hover:bg-brand-primary text-[#f7efea] text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <Phone className="h-4 w-4" />
                  Agendar Consultoria
                </button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-[#e9e1db] border-t border-[#d2c4b7]/40 py-12 px-4 md:px-12">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-[#4e453b]">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="bg-brand-primary p-1.5 rounded">
                    <Building2 className="h-5 w-5 text-[#fff8f4]" />
                  </div>
                  <span className="font-display font-bold text-brand-primary tracking-tight uppercase">AIC Empreendimentos</span>
                </div>
                <p className="text-xs text-[#4e453b]/80 max-w-sm leading-relaxed">
                  Líder regional em soluções de inteligência imobiliária para o setor industrial e residencial de alto padrão. Unindo o físico ao digital desde 1994.
                </p>
              </div>
              <div>
                <h5 className="font-bold text-xs uppercase tracking-wider text-brand-primary mb-4">Institucional</h5>
                <ul className="space-y-2 text-xs">
                  <li><a href="#" className="hover:text-burnt-gold transition-colors">Sobre Nós</a></li>
                  <li><a href="#" className="hover:text-burnt-gold transition-colors">Portfólio Industrial</a></li>
                  <li><a href="#" className="hover:text-burnt-gold transition-colors">Relações com Investidores</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-xs uppercase tracking-wider text-brand-primary mb-4">Contato & Suporte</h5>
                <p className="text-xs">Fale com um consultor especialista:</p>
                <p className="font-display font-bold text-sm text-brand-primary mt-1">61-3340.0032</p>
                <p className="text-xs text-[#4e453b]/80 mt-1">contato@aicempreendimentos.com.br</p>
              </div>
            </div>
            <div className="max-w-[1440px] mx-auto mt-8 pt-6 border-t border-[#d2c4b7]/30 flex flex-col md:flex-row justify-between items-center text-[11px] text-[#4e453b]/60 gap-4">
              <p>© 2026 AIC Empreendimentos Imobiliários Ltda. Todos os direitos reservados.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:underline">Políticas de Privacidade</a>
                <a href="#" className="hover:underline">LGPD</a>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* ============================================================================
          VIEW 2: PAINEL DO CLIENTE (LUXE DOMUS)
          ============================================================================ */}
      {activePortal === 'client' && (
        <div className="flex-1 flex flex-col md:flex-row bg-[#faf8ff] text-luxe-dark">
          {/* Sidebar */}
          <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-zinc-200 p-6 flex flex-col justify-between gap-6 md:h-[calc(100vh-38px)] md:sticky md:top-[38px] z-10">
            <div>
              <div className="mb-6">
                <span className="font-display text-xl font-black text-black tracking-tighter block uppercase">LUXE DOMUS</span>
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Portal do Inquilino</span>
              </div>

              {/* Profile card */}
              <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded mb-6">
                <div className="w-10 h-10 rounded-full bg-[#FC8B24]/10 flex items-center justify-center font-bold text-sm text-[#FC8B24] overflow-hidden">
                  RS
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-800">Ricardo Soares</p>
                  <p className="text-[10px] text-zinc-500 font-medium">Inquilino • 3 imóveis</p>
                </div>
              </div>

              <nav className="flex flex-col gap-1 text-xs font-semibold">
                <a href="#" className="flex items-center gap-3 px-4 py-3 bg-amber-50 text-[#FC8B24] rounded-sm transition-colors">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-zinc-50 rounded-sm transition-colors">
                  <Home className="h-4 w-4" />
                  Meu Portfólio
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-zinc-50 rounded-sm transition-colors">
                  <CreditCard className="h-4 w-4" />
                  Financeiro & Boletos
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-zinc-50 rounded-sm transition-colors">
                  <Wrench className="h-4 w-4" />
                  Manutenções
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-zinc-50 rounded-sm transition-colors">
                  <FileText className="h-4 w-4" />
                  Documentação
                </a>
              </nav>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => setShowNewTicketModal(true)}
                className="w-full py-3 bg-[#FC8B24] text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-[#FC8B24]/10"
              >
                <Plus className="h-4 w-4" />
                Nova Solicitação
              </button>
              <div className="border-t border-zinc-100 pt-4 text-[11px] space-y-1.5 text-zinc-500">
                <div className="flex items-center gap-2"><Settings className="h-3.5 w-3.5" /> Configurações</div>
                <div className="flex items-center gap-2"><HelpCircle className="h-3.5 w-3.5" /> Central de Ajuda</div>
              </div>
            </div>
          </aside>

          {/* Client Core Workspace */}
          <main className="flex-1 p-4 md:p-8 max-w-[1440px]">
            {/* Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h1 className="font-display text-2xl font-bold text-zinc-950">Bem-vindo de volta, Ricardo</h1>
                <p className="text-xs text-zinc-500">Aqui está o status atualizado de suas locações e chamados abertos.</p>
              </div>
              <div className="flex items-center gap-2 bg-zinc-100 p-1.5 rounded border border-zinc-200">
                <span className="px-3 py-1.5 bg-white text-xs text-zinc-800 font-semibold rounded flex items-center gap-1.5 shadow-xs">
                  <Calendar className="h-3.5 w-3.5 text-[#FC8B24]" />
                  Outubro 2024
                </span>
              </div>
            </header>

            {/* Financial Info Banner */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Rent Payment Detail Card */}
              <div className="lg:col-span-2 bg-white rounded border border-zinc-200 p-6 flex flex-col justify-between shadow-xs relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                  <Wallet className="h-28 w-28 text-[#FC8B24]" />
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Próximo Vencimento</span>
                    <h2 className="font-display text-3xl font-black text-black mt-1">R$ 4.850,00</h2>
                    <p className="text-xs text-zinc-500 flex items-center gap-1 mt-2 font-medium">
                      <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                      Vence em 10 de Outubro, 2024
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 w-full sm:w-auto">
                    {payments[0]?.status === 'Pago' ? (
                      <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-6 py-3.5 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                        <CheckCircle className="h-4 w-4" /> Cobrança Paga via Pix
                      </div>
                    ) : (
                      <button 
                        onClick={() => {
                          setPixStatus('pending');
                          setShowPixModal(true);
                          addLog('Iniciando fluxo de checkout Asaas PIX para Ricardo Soares.', 'info');
                        }}
                        className="px-6 py-3.5 bg-black text-white hover:bg-zinc-900 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95"
                      >
                        <QrCode className="h-4.5 w-4.5 text-[#FC8B24]" />
                        Pagar via PIX (Asaas)
                      </button>
                    )}
                    <button className="text-zinc-500 hover:text-black text-[11px] font-bold underline transition-colors">
                      Ver boleto PDF detalhado
                    </button>
                  </div>
                </div>

                <div className="border-t border-zinc-100 mt-6 pt-6 flex flex-wrap gap-6 text-xs justify-between items-center">
                  <div className="flex gap-6">
                    <div>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Aluguel</span>
                      <p className="font-bold text-zinc-800 mt-0.5">R$ 4.200,00</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Condomínio</span>
                      <p className="font-bold text-zinc-800 mt-0.5">R$ 650,00</p>
                    </div>
                  </div>

                  {payments[0]?.status === 'Pago' ? (
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" /> Pago em {payments[0]?.paymentDate}
                    </span>
                  ) : (
                    <span className="text-amber-600 font-bold flex items-center gap-1">
                      <Info className="h-4 w-4 text-amber-500" /> 5 dias restantes para o vencimento
                    </span>
                  )}
                </div>
              </div>

              {/* Current Lease Info */}
              <div className="bg-white rounded border border-zinc-200 overflow-hidden flex flex-col justify-between shadow-xs">
                <div className="h-32 bg-zinc-200 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80" 
                    alt="Unidade Atual"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 text-zinc-900 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    Locação Ativa
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-zinc-900">Edifício Horizon, Ap 1402</h3>
                    <p className="text-xs text-zinc-500 mt-1">Av. Brigadeiro Faria Lima, 3477 - SP</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-zinc-100 pt-3 mt-4 text-xs text-zinc-500">
                    <span className="flex items-center gap-1"><Bed className="h-3.5 w-3.5" /> 2 Qts</span>
                    <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" /> 2 Ban</span>
                    <span className="flex items-center gap-1"><Maximize2 className="h-3.5 w-3.5" /> 85m²</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tickets and Documents */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Maintenance tickets logs */}
              <section className="bg-white rounded border border-zinc-200 p-6 shadow-xs">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-display font-bold text-zinc-900 flex items-center gap-2">
                    <Wrench className="h-4.5 w-4.5 text-[#FC8B24]" />
                    Chamados de Manutenção
                  </h3>
                  <button 
                    onClick={() => setShowNewTicketModal(true)}
                    className="text-xs font-bold text-[#FC8B24] hover:underline"
                  >
                    Novo Chamado +
                  </button>
                </div>

                <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar pr-1">
                  {tickets.map((t) => (
                    <div key={t.id} className="p-3 border border-zinc-100 hover:bg-zinc-50/50 rounded flex justify-between items-center transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-zinc-100 rounded flex items-center justify-center text-zinc-600">
                          {t.categoryIcon === 'water_drop' ? <Droplets className="h-5 w-5 text-blue-500" /> : 
                           t.categoryIcon === 'lightbulb' ? <Lightbulb className="h-5 w-5 text-amber-500" /> : 
                           t.categoryIcon === 'bolt' ? <Zap className="h-5 w-5 text-yellow-500" /> : 
                           <Wind className="h-5 w-5 text-teal-500" />}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-zinc-800">{t.title}</p>
                          <p className="text-[10px] text-zinc-400 mt-0.5">Aberto em {t.date} • {t.idCode}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          t.urgency === 'URGENTE' ? 'bg-red-50 text-red-600' : 
                          t.urgency === 'ALTA' ? 'bg-amber-50 text-amber-600' : 
                          'bg-zinc-100 text-zinc-600'
                        }`}>
                          {t.urgency}
                        </span>
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          t.status === 'Aberto' ? 'bg-blue-50 text-blue-600' : 
                          t.status === 'Em andamento' ? 'bg-amber-100 text-amber-800' : 
                          'bg-emerald-50 text-emerald-700'
                        }`}>
                          {t.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Documents Area */}
              <section className="bg-white rounded border border-zinc-200 p-6 shadow-xs">
                <h3 className="font-display font-bold text-zinc-900 flex items-center gap-2 mb-6">
                  <FolderOpen className="h-4.5 w-4.5 text-[#FC8B24]" />
                  Documentos & Certidões
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border border-zinc-100 hover:border-zinc-300 rounded flex flex-col justify-between gap-4 transition-all group cursor-pointer">
                    <div className="flex justify-between items-start">
                      <FileCode className="h-8 w-8 text-red-500" />
                      <span className="text-[10px] text-zinc-400 font-bold group-hover:text-black uppercase">Baixar</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-800">Contrato de Aluguel</h4>
                      <p className="text-[10px] text-zinc-400 mt-0.5">Assinado em 12/01/2024</p>
                    </div>
                  </div>

                  <div className="p-4 border border-zinc-100 hover:border-zinc-300 rounded flex flex-col justify-between gap-4 transition-all group cursor-pointer">
                    <div className="flex justify-between items-start">
                      <BookOpen className="h-8 w-8 text-blue-500" />
                      <span className="text-[10px] text-zinc-400 font-bold group-hover:text-black uppercase">Baixar</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-800">Manual do Morador</h4>
                      <p className="text-[10px] text-zinc-400 mt-0.5">Regras & Condomínio</p>
                    </div>
                  </div>

                  <div className="p-4 border border-zinc-100 hover:border-zinc-300 rounded flex flex-col justify-between gap-4 transition-all group cursor-pointer">
                    <div className="flex justify-between items-start">
                      <FileText className="h-8 w-8 text-zinc-700" />
                      <span className="text-[10px] text-zinc-400 font-bold group-hover:text-black uppercase">Baixar</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-800">Rendimentos 2023</h4>
                      <p className="text-[10px] text-zinc-400 mt-0.5">Ano-base declaração IRPF</p>
                    </div>
                  </div>

                  <div className="p-4 bg-zinc-50 border border-dashed border-zinc-200 rounded flex items-center justify-center hover:bg-zinc-100 transition-all cursor-pointer">
                    <span className="text-xs font-bold text-zinc-500 flex items-center gap-1">
                      Ver todos <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      )}

      {/* ============================================================================
          VIEW 3: PAINEL ADMINISTRATIVO (CRM CORRETOR / GESTOR)
          ============================================================================ */}
      {activePortal === 'admin' && (
        <div className="flex-1 flex flex-col md:flex-row bg-[#faf8ff] text-luxe-dark">
          {/* Admin Sidebar */}
          <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-zinc-200 p-6 flex flex-col justify-between gap-6 md:h-[calc(100vh-38px)] md:sticky md:top-[38px] z-10">
            <div>
              <div className="mb-6">
                <span className="font-display text-xl font-black text-black tracking-tighter block uppercase">LUXE DOMUS</span>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Painel do Corretor / Gestor</span>
              </div>

              {/* Profile Card */}
              <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded mb-6">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-sm text-white overflow-hidden">
                  AS
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-800">Alexandre S.</p>
                  <p className="text-[10px] text-zinc-500 font-medium">Admin Principal</p>
                </div>
              </div>

              <nav className="flex flex-col gap-1 text-xs font-semibold">
                <a href="#" className="flex items-center gap-3 px-4 py-3 bg-zinc-100 text-black rounded-sm transition-colors">
                  <LayoutDashboard className="h-4 w-4 text-zinc-800" />
                  Dashboard Geral
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-zinc-50 rounded-sm transition-colors">
                  <Users className="h-4 w-4" />
                  CRM Leads
                  <span className="ml-auto bg-[#FC8B24] text-white font-bold text-[9px] px-1.5 py-0.5 rounded-full">{leads.length}</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-zinc-50 rounded-sm transition-colors">
                  <FileText className="h-4 w-4" />
                  Contratos
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-zinc-50 rounded-sm transition-colors">
                  <CreditCard className="h-4 w-4" />
                  Financeiro (Asaas)
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-zinc-50 rounded-sm transition-colors">
                  <Wrench className="h-4 w-4" />
                  Manutenção
                  <span className="ml-auto bg-amber-500 text-white font-bold text-[9px] px-1.5 py-0.5 rounded-full">
                    {tickets.filter(t => t.status !== 'Resolvido').length}
                  </span>
                </a>
              </nav>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => setShowNewPropertyModal(true)}
                className="w-full py-3 bg-black text-white hover:bg-zinc-950 rounded text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-black/10"
              >
                <PlusCircle className="h-4 w-4" />
                Novo Imóvel / Ativo
              </button>
              <div className="border-t border-zinc-100 pt-4 text-[11px] space-y-1.5 text-zinc-500">
                <div className="flex items-center gap-2"><Settings className="h-3.5 w-3.5" /> Configurações CRM</div>
              </div>
            </div>
          </aside>

          {/* Admin Core Content Workspace */}
          <main className="flex-1 p-4 md:p-8 max-w-[1440px] space-y-8">
            {/* Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="font-display text-2xl font-bold text-zinc-950">Painel de Performance</h1>
                <p className="text-xs text-zinc-500">Gestão e controle de operações financeiras, contratos e manutenção em tempo real.</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={handleExportarPortais}
                  className="px-4 py-2 bg-burnt-gold text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-brand-primary transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <FileCode className="h-4 w-4" />
                  Exportar XML (Zap)
                </button>
                <button 
                  onClick={() => triggerToast('Balanço financeiro exportado para planilha Excel!')}
                  className="px-4 py-2 border border-zinc-300 bg-white hover:bg-zinc-50 rounded text-xs font-bold uppercase tracking-wider text-zinc-700 transition-all active:scale-95"
                >
                  Exportar XLSX
                </button>
              </div>
            </header>

            {/* Top Row: Quick alerts and mini metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Critical maintenance alert */}
              <div className="lg:col-span-5 bg-red-50 border border-red-200 p-6 rounded flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -right-4 -top-4 opacity-5">
                  <AlertTriangle className="h-28 w-28 text-red-500" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-1.5 text-red-700">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Alertas Urgentes</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-black text-zinc-950">{criticalTicketsCount} Manutenções Críticas</h3>
                    <p className="text-xs text-zinc-600 leading-relaxed mt-1">
                      Infiltrações e vazamentos em unidades ativas necessitando de aprovação imediata ou alocação de prestador terceirizado.
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <button 
                    onClick={() => triggerToast('Prestador acionado via SMS para reparo emergencial!')}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors"
                  >
                    Acionar Prestador Emergencial
                  </button>
                </div>
              </div>

              {/* Stats Counters */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded border border-zinc-200 flex flex-col justify-between shadow-xs">
                  <div className="flex justify-between items-center mb-4">
                    <span className="p-2 bg-[#FC8B24]/10 rounded text-[#FC8B24]">
                      <Home className="h-5 w-5" />
                    </span>
                    <span className="text-emerald-600 font-bold text-[11px] flex items-center gap-0.5">+12%</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Imóveis Ativos</span>
                    <h4 className="font-display text-2xl font-black text-zinc-950 mt-1">{activePropertiesCount}</h4>
                  </div>
                </div>

                <div className="bg-white p-5 rounded border border-zinc-200 flex flex-col justify-between shadow-xs">
                  <div className="flex justify-between items-center mb-4">
                    <span className="p-2 bg-emerald-50 rounded text-emerald-600">
                      <Wallet className="h-5 w-5" />
                    </span>
                    <span className="text-emerald-600 font-bold text-[11px] flex items-center gap-0.5">+5.4%</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Faturamento</span>
                    <h4 className="font-display text-2xl font-black text-zinc-950 mt-1">R$ {totalRevenue.toLocaleString('pt-BR')}</h4>
                  </div>
                </div>

                <div className="bg-white p-5 rounded border border-zinc-200 flex flex-col justify-between shadow-xs">
                  <div className="flex justify-between items-center mb-4">
                    <span className="p-2 bg-amber-50 rounded text-amber-600">
                      <Activity className="h-5 w-5" />
                    </span>
                    <span className="text-red-600 font-bold text-[11px] flex items-center gap-0.5">-2%</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Tempo de Vacância</span>
                    <h4 className="font-display text-2xl font-black text-zinc-950 mt-1">18 dias</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Sales and Rental Funnel (Imoalert / ImobiBrasil visual) */}
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-display text-base font-bold text-zinc-950 flex items-center gap-2">
                  <SlidersHorizontal className="h-4.5 w-4.5 text-zinc-800" />
                  Funil de Conversão Comercial (Leads CRM)
                </h3>
                <span className="text-xs text-zinc-500 font-medium">Taxa de Conversão Global: <strong className="text-black">8.4%</strong></span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-zinc-900 text-zinc-100 p-5 rounded relative overflow-hidden flex flex-col justify-between min-h-[110px]">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">1. Leads Ativos</span>
                  <div className="flex items-end justify-between">
                    <h4 className="font-display text-2xl font-black">
                      {leads.filter(l => l.status === 'Lead').length + 1234}
                    </h4>
                    <span className="text-[10px] text-zinc-500">Novos</span>
                  </div>
                </div>

                <div className="bg-[#4a4a4a] text-zinc-100 p-5 rounded relative overflow-hidden flex flex-col justify-between min-h-[110px]">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">2. Visitas</span>
                  <div className="flex items-end justify-between">
                    <h4 className="font-display text-2xl font-black">
                      {leads.filter(l => l.status === 'Visita').length + 448}
                    </h4>
                    <span className="text-[10px] text-zinc-400">36% conv.</span>
                  </div>
                </div>

                <div className="bg-zinc-700 text-zinc-100 p-5 rounded relative overflow-hidden flex flex-col justify-between min-h-[110px]">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">3. Propostas</span>
                  <div className="flex items-end justify-between">
                    <h4 className="font-display text-2xl font-black">
                      {leads.filter(l => l.status === 'Proposta').length + 125}
                    </h4>
                    <span className="text-[10px] text-zinc-400">28% conv.</span>
                  </div>
                </div>

                <div className="bg-[#FC8B24] text-white p-5 rounded relative overflow-hidden flex flex-col justify-between min-h-[110px]">
                  <span className="text-[10px] font-bold text-orange-100 uppercase tracking-wider">4. Contratos Fechados</span>
                  <div className="flex items-end justify-between">
                    <h4 className="font-display text-2xl font-black">
                      {leads.filter(l => l.status === 'Contrato').length + 81}
                    </h4>
                    <span className="text-[10px] text-orange-100">65% conv.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Detailed Contracts Management Table */}
            <section className="bg-white rounded border border-zinc-200 overflow-hidden shadow-xs">
              <div className="p-5 border-b border-zinc-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-base font-bold text-zinc-950">Contratos de Locação Recentes</h3>
                  <div className="flex gap-1">
                    <span className="text-[9px] font-bold bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded">Ativos</span>
                  </div>
                </div>
                
                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-60">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input 
                      type="text"
                      value={adminSearchQuery}
                      onChange={(e) => setAdminSearchQuery(e.target.value)}
                      placeholder="Filtrar por inquilino..."
                      className="w-full text-xs pl-9 pr-3 py-2 border border-zinc-200 rounded focus:ring-1 focus:ring-black focus:border-black bg-zinc-50 placeholder:text-zinc-400"
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-zinc-50 text-zinc-500 uppercase tracking-wider border-b border-zinc-200">
                    <tr>
                      <th className="px-6 py-4 font-bold">Cliente</th>
                      <th className="px-6 py-4 font-bold">Imóvel / Ativo</th>
                      <th className="px-6 py-4 font-bold">Tipo</th>
                      <th className="px-6 py-4 font-bold">Vencimento</th>
                      <th className="px-6 py-4 font-bold">Valor</th>
                      <th className="px-6 py-4 font-bold">Status</th>
                      <th className="px-6 py-4 font-bold text-center">Gatilhos</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {contracts
                      .filter(c => {
                        if (adminSearchQuery && !c.clientName.toLowerCase().includes(adminSearchQuery.toLowerCase())) return false;
                        return true;
                      })
                      .map((c) => (
                        <tr key={c.id} className="hover:bg-zinc-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-zinc-600">
                                {c.clientName.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <p className="font-bold text-zinc-900">{c.clientName}</p>
                                <p className="text-[10px] text-zinc-400 mt-0.5">{c.clientRole}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-semibold text-zinc-900">{c.propertyName}</p>
                            <p className="text-[10px] text-zinc-400 mt-0.5">{c.propertyLocation}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                              c.type === 'Locação' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'
                            }`}>
                              {c.type}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-zinc-600 font-medium">{c.dueDate}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-bold text-zinc-900">R$ {c.value.toLocaleString('pt-BR')}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              c.status === 'Ativo' ? 'bg-emerald-50 text-emerald-700' : 
                              c.status === 'Pendente Assinatura' ? 'bg-amber-100 text-amber-800' : 
                              'bg-zinc-100 text-zinc-500'
                            }`}>
                              {c.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button 
                                onClick={() => handleAssinarContrato(c.clientName)}
                                className="px-2 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-[10px] font-bold uppercase tracking-wider rounded"
                                title="Acionar webhook de assinatura digital ZapSign"
                              >
                                ZapSign
                              </button>
                            </div>
                          </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-zinc-50 border-t border-zinc-100 text-zinc-500 text-[11px] flex justify-between items-center font-medium">
                <span>Mostrando {contracts.length} contratos ativos cadastrados</span>
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest">MongoDB Sync Active</span>
              </div>
            </section>

            {/* Maintenance tickets logs for Admin */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active tickets */}
              <div className="bg-white rounded border border-zinc-200 p-6 shadow-xs space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-100 pb-3">
                  <h4 className="font-display font-bold text-zinc-950 flex items-center gap-2">
                    <Wrench className="h-4.5 w-4.5 text-zinc-700" />
                    Manutenção em Aberto
                  </h4>
                  <span className="text-[10px] bg-amber-500 text-white font-bold px-2 py-0.5 rounded-full">
                    {tickets.filter(t => t.status !== 'Resolvido').length} chamados
                  </span>
                </div>

                <div className="space-y-4 max-h-72 overflow-y-auto custom-scrollbar pr-1">
                  {tickets.map((t) => (
                    <div key={t.id} className="p-4 rounded border border-zinc-100 flex flex-col justify-between gap-3 bg-zinc-50/50">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex gap-3">
                          <div className="w-9 h-9 bg-white rounded border border-zinc-200 flex items-center justify-center">
                            {t.categoryIcon === 'water_drop' ? <Droplets className="h-4 w-4 text-blue-500" /> : 
                             t.categoryIcon === 'lightbulb' ? <Lightbulb className="h-4 w-4 text-amber-500" /> : 
                             t.categoryIcon === 'bolt' ? <Zap className="h-4 w-4 text-yellow-500" /> : 
                             <Wind className="h-4 w-4 text-teal-500" />}
                          </div>
                          <div>
                            <p className="font-bold text-zinc-900 text-xs">{t.title}</p>
                            <p className="text-[10px] text-zinc-400 mt-0.5">{t.propertyName} • {t.idCode}</p>
                          </div>
                        </div>

                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          t.urgency === 'URGENTE' ? 'bg-red-50 text-red-600' : 
                          t.urgency === 'ALTA' ? 'bg-amber-50 text-amber-600' : 
                          'bg-zinc-100 text-zinc-500'
                        }`}>
                          {t.urgency}
                        </span>
                      </div>

                      <p className="text-[11px] text-zinc-600 leading-relaxed bg-white p-2.5 rounded border border-zinc-100">
                        {t.description}
                      </p>

                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-[10px] text-zinc-400 font-semibold">{t.date}</span>
                        {t.status !== 'Resolvido' ? (
                          <div className="flex gap-1.5">
                            {t.status === 'Aberto' && (
                              <button 
                                onClick={() => {
                                  setTickets(prev => prev.map(tick => tick.id === t.id ? { ...tick, status: 'Em andamento' } : tick));
                                  addLog(`Status do ticket ${t.idCode} atualizado para: Em andamento.`, 'info');
                                  triggerToast('Chamado de manutenção alterado para "Em andamento".');
                                }}
                                className="px-2 py-1 bg-zinc-200 hover:bg-zinc-300 rounded font-bold text-[9px] uppercase tracking-wider text-zinc-700"
                              >
                                Atender
                              </button>
                            )}
                            <button 
                              onClick={() => {
                                setTickets(prev => prev.map(tick => tick.id === t.id ? { ...tick, status: 'Resolvido' } : tick));
                                addLog(`Status do ticket ${t.idCode} atualizado para: Resolvido.`, 'success');
                                triggerToast('Chamado de manutenção marcado como CONCLUÍDO!');
                              }}
                              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-[9px] uppercase tracking-wider"
                            >
                              Concluir
                            </button>
                          </div>
                        ) : (
                          <span className="text-emerald-600 font-bold flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Resolvido</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feed logs */}
              <div className="bg-white rounded border border-zinc-200 p-6 shadow-xs space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-100 pb-3">
                  <h4 className="font-display font-bold text-zinc-950 flex items-center gap-2">
                    <Bell className="h-4.5 w-4.5 text-zinc-700" />
                    Notificações de Webhooks & Triggers
                  </h4>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FC8B24] mt-1.5 shrink-0"></div>
                    <div>
                      <p className="text-zinc-800">
                        Webhook ZapSign: Contrato de <strong>Ricardo Soares</strong> enviado para os assinantes. Status atualizado.
                      </p>
                      <p className="text-[9px] text-zinc-400 mt-1">Hoje, {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                    <div>
                      <p className="text-zinc-800">
                        Gateway Asaas API: Pagamento Pix recebido para fatura de <strong>Ricardo Soares</strong> (Outubro 2024). Repasse agendado.
                      </p>
                      <p className="text-[9px] text-zinc-400 mt-1">Ontem, 16:45</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 mt-1.5 shrink-0"></div>
                    <div>
                      <p className="text-zinc-500 italic">
                        Relatório consolidado do funil de vendas exportado com sucesso para a pasta de arquivos digitais em Cloud Storage.
                      </p>
                      <p className="text-[9px] text-zinc-400 mt-1">2 dias atrás</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}

      {/* ============================================================================
          FLOATING CHAT ASSISTANT
          ============================================================================ */}
      <div className="fixed bottom-6 left-6 z-40 group">
        <div className="absolute bottom-16 left-0 bg-zinc-900 text-zinc-100 p-4 rounded border border-zinc-800 shadow-2xl w-64 opacity-0 scale-90 -translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 font-sans">
          <p className="font-bold text-xs text-burnt-gold mb-1 uppercase tracking-wider">Suporte Integrado</p>
          <p className="text-[11px] text-zinc-300 leading-relaxed">
            Dúvidas sobre a arquitetura MongoDB Stitch ou regras de repasse? Abra o painel de monitoramento de Triggers e simule as chamadas Asaas e ZapSign!
          </p>
        </div>
        <button 
          onClick={() => setShowLogConsole(!showLogConsole)}
          className="w-12 h-12 bg-zinc-900 text-[#f7efea] border border-zinc-800 rounded-full shadow-2xl flex items-center justify-center hover:bg-zinc-800 transition-colors active:scale-95"
          title="Abrir Painel de Controle de Triggers"
        >
          <Headphones className="h-5 w-5 text-burnt-gold" />
        </button>
      </div>

      {/* ============================================================================
          MODALS & DIALOGS
          ============================================================================ */}

      {/* 1. PUBLIC PORTAL LEAD REQUEST MODAL */}
      <AnimatePresence>
        {showLeadSubmitModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#fff8f4] border border-[#d2c4b7] p-6 max-w-md w-full rounded shadow-2xl relative"
            >
              <button 
                onClick={() => setShowLeadSubmitModal(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-black"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="font-display font-bold text-brand-primary text-lg mb-2">Agendar Consultoria de Investimento</h3>
              <p className="text-xs text-[#4e453b] mb-6">
                Insira seus dados para agendar uma reunião sobre o imóvel: <strong className="text-black">{leadSubmitProperty}</strong>.
              </p>

              <form onSubmit={handleSubmitLead} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-burnt-gold uppercase tracking-wider mb-1">Nome Completo</label>
                  <input 
                    type="text"
                    required
                    value={leadSubmitName}
                    onChange={(e) => setLeadSubmitName(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-[#d2c4b7] rounded bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-burnt-gold uppercase tracking-wider mb-1">E-mail para contato</label>
                  <input 
                    type="email"
                    required
                    value={leadSubmitEmail}
                    onChange={(e) => setLeadSubmitEmail(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-[#d2c4b7] rounded bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-burnt-gold uppercase tracking-wider mb-1">Telefone (DDD + WhatsApp)</label>
                  <input 
                    type="text"
                    required
                    value={leadSubmitPhone}
                    onChange={(e) => setLeadSubmitPhone(e.target.value)}
                    placeholder="(00) 00000-0000"
                    className="w-full text-xs px-3 py-2 border border-[#d2c4b7] rounded bg-white"
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full py-3 bg-burnt-gold hover:bg-brand-primary text-white text-xs font-bold uppercase tracking-wider transition-colors rounded"
                  >
                    Confirmar Envio
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. CLIENT NEW MAINTENANCE TICKET MODAL */}
      <AnimatePresence>
        {showNewTicketModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-zinc-200 p-6 max-w-md w-full rounded shadow-2xl relative"
            >
              <button 
                onClick={() => setShowNewTicketModal(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-black"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="font-display font-bold text-zinc-950 text-base mb-2">Novo Chamado de Manutenção</h3>
              <p className="text-xs text-zinc-500 mb-6">
                Abra uma solicitação de reparo ou vistoria técnica para sua unidade: <strong className="text-black">Edifício Horizon, Ap 1402</strong>.
              </p>

              <form onSubmit={handleCreateTicket} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Problema / Título</label>
                  <input 
                    type="text"
                    required
                    placeholder="Ex: Infiltração sob o box do banheiro"
                    value={newTicketTitle}
                    onChange={(e) => setNewTicketTitle(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-zinc-200 rounded focus:ring-1 focus:ring-black focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Categoria de Reparo</label>
                  <select 
                    value={newTicketCategory}
                    onChange={(e: any) => setNewTicketCategory(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-zinc-200 rounded"
                  >
                    <option value="water_drop">Hidráulico (Vazamentos / Água)</option>
                    <option value="lightbulb">Elétrico (Tomadas / Luz)</option>
                    <option value="bolt">Instalações Gerais (Disjuntor / Chave)</option>
                    <option value="air">Eletrodomésticos & Climatização</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Grau de Urgência</label>
                  <select 
                    value={newTicketUrgency}
                    onChange={(e: any) => setNewTicketUrgency(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-zinc-200 rounded"
                  >
                    <option value="MÉDIA">Normal (Atendimento em até 72 horas)</option>
                    <option value="ALTA">Urgente (Atendimento em até 24 horas)</option>
                    <option value="URGENTE">Emergência Crítica (Riscos imediatos)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Descrição Detalhada</label>
                  <textarea 
                    rows={3}
                    required
                    placeholder="Especifique o problema detalhadamente e anote se há vazamento contínuo ou risco elétrico."
                    value={newTicketDesc}
                    onChange={(e) => setNewTicketDesc(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-zinc-200 rounded focus:ring-1 focus:ring-black focus:border-black"
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full py-3 bg-[#FC8B24] hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider transition-colors rounded"
                  >
                    Abrir Chamado Técnico
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. CLIENT PIX CHECKOUT MODAL (ASAAS SIMULATION) */}
      <AnimatePresence>
        {showPixModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-zinc-200 p-6 max-w-sm w-full rounded shadow-2xl relative text-center"
            >
              <button 
                onClick={() => setShowPixModal(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-black"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex justify-center mb-4 text-[#FC8B24]">
                <QrCode className="h-10 w-10 animate-pulse" />
              </div>
              <h3 className="font-display font-bold text-zinc-950 text-base mb-1">Pagamento Pix (Asaas API)</h3>
              <p className="text-[11px] text-zinc-400 font-semibold uppercase tracking-wider">Mês Ref: Outubro 2024</p>

              <div className="my-6 p-4 bg-zinc-50 border border-zinc-200 rounded text-center">
                <span className="text-[10px] font-bold text-zinc-400 block uppercase">VALOR DA COBRANÇA</span>
                <span className="text-2xl font-black text-black">R$ 4.850,00</span>
              </div>

              {pixStatus === 'pending' && (
                <div className="space-y-4">
                  {/* Simulated QR Code */}
                  <div className="w-44 h-44 bg-zinc-100 border border-zinc-200 mx-auto rounded flex items-center justify-center p-2">
                    <div className="w-full h-full bg-zinc-950 rounded flex flex-wrap p-1 gap-1">
                      {Array.from({ length: 36 }).map((_, i) => (
                        <div 
                          key={i} 
                          className={`flex-1 min-w-[20px] min-h-[20px] rounded-xs ${
                            i % 5 === 0 || i % 7 === 0 || i < 10 || i > 25 ? 'bg-white' : 'bg-zinc-950'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setCopiedPixKey(true);
                        setTimeout(() => setCopiedPixKey(false), 2000);
                        triggerToast('Copia e Cola do PIX copiado para a área de transferência!');
                      }}
                      className="flex-1 py-2 bg-zinc-100 hover:bg-zinc-200 rounded text-xs font-bold text-zinc-700 flex items-center justify-center gap-1 border border-zinc-300"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      {copiedPixKey ? 'Copiado!' : 'Copia e Cola'}
                    </button>
                    <button 
                      onClick={handleSimulatePixPayment}
                      className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold uppercase tracking-wider"
                    >
                      Confirmar Pgto
                    </button>
                  </div>
                </div>
              )}

              {pixStatus === 'processing' && (
                <div className="py-8 space-y-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FC8B24] mx-auto"></div>
                  <p className="text-xs text-zinc-500 font-medium">Validando transação com banco de destino...</p>
                </div>
              )}

              {pixStatus === 'completed' && (
                <div className="py-6 space-y-4">
                  <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto" />
                  <div>
                    <h4 className="text-sm font-bold text-zinc-950">Pagamento Confirmado!</h4>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      Sua cobrança foi quitada com sucesso. O repasse será liquidado na conta do proprietário em até 1 dia útil.
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowPixModal(false)}
                    className="px-6 py-2 bg-zinc-900 hover:bg-black text-white rounded text-xs font-bold uppercase tracking-wider"
                  >
                    Fechar
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. ADMIN NEW PROPERTY SUBMISSION MODAL */}
      <AnimatePresence>
        {showNewPropertyModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-zinc-200 p-6 max-w-md w-full rounded shadow-2xl relative"
            >
              <button 
                onClick={() => setShowNewPropertyModal(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-black"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="font-display font-bold text-zinc-950 text-base mb-2">Cadastrar Novo Imóvel / Ativo</h3>
              <p className="text-xs text-zinc-500 mb-6">
                Publique um imóvel residencial de alto padrão ou galpão industrial comercial diretamente na vitrine pública.
              </p>

              <form onSubmit={handleCreateProperty} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Título do Imóvel</label>
                  <input 
                    type="text"
                    required
                    placeholder="Ex: Loft Design Jardins"
                    value={newPropTitle}
                    onChange={(e) => setNewPropTitle(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-zinc-200 rounded focus:ring-1 focus:ring-black focus:border-black"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Tipo de Empreendimento</label>
                    <select 
                      value={newPropType}
                      onChange={(e: any) => setNewPropType(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-zinc-200 rounded"
                    >
                      <option value="Loft Luxo">Loft Luxo (Residencial)</option>
                      <option value="Galpão Ind.">Galpão Ind. (Comercial)</option>
                      <option value="Corporativo">Corporativo (Escritório)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Categoria de Exclusividade</label>
                    <select 
                      value={newPropTag}
                      onChange={(e: any) => setNewPropTag(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-zinc-200 rounded"
                    >
                      <option value="RESERVA AIC">Reserva AIC</option>
                      <option value="COMERCIAL">Comercial</option>
                      <option value="EXECUTIVE">Executive</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Localização (Bairro, Cidade)</label>
                  <input 
                    type="text"
                    required
                    placeholder="Ex: Setor Bueno, Goiânia"
                    value={newPropLocation}
                    onChange={(e) => setNewPropLocation(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-zinc-200 rounded focus:ring-1 focus:ring-black focus:border-black"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Preço de Venda (R$)</label>
                    <input 
                      type="text"
                      placeholder="Ex: 3500000"
                      value={newPropPrice}
                      onChange={(e) => setNewPropPrice(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-zinc-200 rounded focus:ring-1 focus:ring-black focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Especificações (Separado por |)</label>
                    <input 
                      type="text"
                      placeholder="Ex: 350m² | 3 Suítes | 4 Vagas"
                      value={newPropSpecs}
                      onChange={(e) => setNewPropSpecs(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-zinc-200 rounded focus:ring-1 focus:ring-black focus:border-black"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full py-3 bg-black hover:bg-zinc-950 text-white text-xs font-bold uppercase tracking-wider transition-colors rounded"
                  >
                    Publicar Imóvel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
