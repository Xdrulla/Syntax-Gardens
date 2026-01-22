import { Garden } from './components/game';
import { ChallengeModal } from './components/challenges';
import { HUD } from './components/layout';
import { SeedBag } from './features/inventory';
import { ShopModal } from './features/shop';
import { UnlockNotification, SeasonTransition, SeasonalEventBanner } from './components/ui';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* HUD no topo */}
      <HUD />

      {/* Conteudo principal */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
          {/* Painel de sementes */}
          <aside className="w-full lg:w-64 lg:sticky lg:top-8">
            <SeedBag />
          </aside>

          {/* Area do jardim */}
          <div className="flex-1 max-w-2xl">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">
                Syntax Gardens
              </h1>
              <p className="text-slate-400">
                Cultive seu conhecimento em programacao
              </p>
            </div>

            <Garden />

            <div className="mt-6 text-center text-sm text-slate-500">
              <p>Clique em uma planta para rega-la resolvendo um desafio de codigo</p>
              <p>Plantas maduras podem ser colhidas para ganhar moedas e XP</p>
            </div>
          </div>
        </div>
      </main>

      {/* Modal de desafio */}
      <ChallengeModal />

      {/* Modal da loja */}
      <ShopModal />

      {/* Notificacoes de desbloqueio */}
      <UnlockNotification />

      {/* Transicao de estacao */}
      <SeasonTransition />

      {/* Banner de evento sazonal */}
      <SeasonalEventBanner />
    </div>
  );
}

export default App;
