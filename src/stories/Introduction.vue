<template>
  <div class="prose max-w-none p-8 font-sans text-slate-800">
    <h1 class="text-4xl font-bold mb-6 text-indigo-700">StructureUI: The Headless Behavior Engine</h1>
    
    <p class="text-lg mb-8">
      <strong>StructureUI</strong> não é apenas uma biblioteca de componentes; é uma <strong>Engine de Comportamento</strong> para Vue 3 e Nuxt. 
      Nosso foco é fornecer a lógica complexa, acessibilidade (a11y) e otimizações de performance (SSR/Hydration), 
      deixando o visual 100% a cargo do desenvolvedor.
    </p>

    <hr class="my-8 border-slate-200" />

    <h2 class="text-2xl font-bold mb-4">🚀 Filosofia Core</h2>
    
    <div class="grid md:grid-cols-2 gap-6 mb-8">
      <div class="bg-slate-50 p-6 rounded-lg border border-slate-200">
        <h3 class="font-bold text-lg mb-2">1. Headless & Style-Agnostic</h3>
        <ul class="list-disc pl-5 space-y-1">
          <li><strong>Zero CSS</strong>: Nenhum estilo imposto.</li>
          <li><strong>DOM Limpo</strong>: Apenas markup semântico.</li>
          <li><strong>Acessibilidade First</strong>: Focus traps e ARIA nativos.</li>
        </ul>
      </div>
      
      <div class="bg-slate-50 p-6 rounded-lg border border-slate-200">
        <h3 class="font-bold text-lg mb-2">2. Performance Obsession</h3>
        <ul class="list-disc pl-5 space-y-1">
          <li><strong>Lazy Hydration</strong>: Carregamento sob demanda.</li>
          <li><strong>SSR Safe</strong>: IDs determinísticos.</li>
          <li><strong>Virtualização</strong>: Listas infinitas performáticas.</li>
        </ul>
      </div>
    </div>

    <hr class="my-8 border-slate-200" />

    <h2 class="text-2xl font-bold mb-4">🛠️ Composables API</h2>
    
    <div class="space-y-6">
      <section>
        <h3 class="font-mono text-lg font-bold text-indigo-600 bg-indigo-50 inline-block px-2 py-1 rounded">useStructureId</h3>
        <p class="mt-2 text-slate-600">Gera IDs únicos idênticos no Server e Client.</p>
        <pre class="bg-slate-900 text-slate-50 p-4 rounded-lg mt-3 overflow-x-auto text-sm"><code>const inputId = useStructureId('input');</code></pre>
      </section>

      <section>
        <h3 class="font-mono text-lg font-bold text-indigo-600 bg-indigo-50 inline-block px-2 py-1 rounded">useIntersectionObserver</h3>
        <p class="mt-2 text-slate-600">Detecta visibilidade de elementos.</p>
        <pre class="bg-slate-900 text-slate-50 p-4 rounded-lg mt-3 overflow-x-auto text-sm"><code>const { isIntersecting } = useIntersectionObserver(target);</code></pre>
      </section>

      <section>
        <h3 class="font-mono text-lg font-bold text-indigo-600 bg-indigo-50 inline-block px-2 py-1 rounded">useSwipe</h3>
        <p class="mt-2 text-slate-600">Engine de gestos touch-first.</p>
        <pre class="bg-slate-900 text-slate-50 p-4 rounded-lg mt-3 overflow-x-auto text-sm"><code>const { direction } = useSwipe(el);</code></pre>
      </section>
    </div>
  </div>
</template>
