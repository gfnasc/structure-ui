# 🏗️ StructureUI

> **The Headless Behavior Engine for Vue 3 & Nuxt.**
> Lógica complexa, Acessibilidade e Performance extrema. Zero CSS.

![Vue 3](https://img.shields.io/badge/Vue-3.x-green)
![Nuxt Ready](https://img.shields.io/badge/Nuxt-Ready-00DC82)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 🌟 Por que StructureUI?

Você já passou por isso: começa um projeto novo e precisa de um Modal.
1. Você instala uma lib de UI famosa 📦.
2. O Modal vem com estilos que não batem com seu design 🎨.
3. Você perde horas sobrescrevendo CSS com `!important` ⚔️.
4. O bundle size aumenta em 500kb 📉.
5. O Lighthouse reclama de acessibilidade e TBT 🚨.

**A StructureUI inverte esse jogo.**

Nós acreditamos que **Comportamento** e **Estilo** devem ser separados.
- **Nós cuidamos da Engenharia**: Focus traps, portais, sincronização SSR, lazy hydration, virtualização e ARIA attributes.
- **Você cuida da Arte**: Use Tailwind, CSS Modules, Sass ou Styled Components. Sem conflitos, sem overrides.

### O que você ganha "de graça":
- 🛡️ **Segurança SSR**: Seus IDs nunca mais vão quebrar a hidratação do Nuxt.
- ⚡ **Performance Nativa**: Componentes que sabem quando carregar (Lazy) e como renderizar listas infinitas (Virtual).
- ♿ **Acessibilidade de Elite**: Navegação por teclado e leitores de tela funcionam "out of the box".
- 🧩 **Liberdade Total**: Mude seu Design System inteiro sem tocar na lógica dos componentes.

---

## 📦 Instalação

```bash
npm install structure-ui
# ou
yarn add structure-ui
```

---

## 🛠️ Composables (Hooks)

A StructureUI expõe seus "superpoderes" através de composables. Aqui está o guia detalhado de como usá-los.

### `useStructureId`
Gera IDs únicos que são idênticos no Servidor (SSR) e no Cliente.

**Assinatura:**
```ts
function useStructureId(prefix?: string): string
```

**Uso:**
```vue
<script setup>
import { useStructureId } from 'structure-ui';

// Gera algo como "input-12" (garantido ser o mesmo no server e client)
const id = useStructureId('input');
</script>

<template>
  <label :for="id">Nome</label>
  <input :id="id" type="text" />
</template>
```

---

### `useIntersectionObserver`
Detecta quando um elemento entra na viewport. Base para Lazy Loading e Analytics.

**Assinatura:**
```ts
function useIntersectionObserver(
  target: Ref<HTMLElement | null>,
  options?: { threshold?: number; rootMargin?: string; once?: boolean }
): { isIntersecting: Ref<boolean>; cleanup: () => void }
```

**Uso:**
```vue
<script setup>
import { ref } from 'vue';
import { useIntersectionObserver } from 'structure-ui';

const target = ref(null);
const { isIntersecting } = useIntersectionObserver(target, {
  threshold: 0.5, // Dispara quando 50% estiver visível
  once: true      // Para de observar após a primeira vez (ótimo para animações de entrada)
});
</script>
```

---

### `useSwipe`
Engine de gestos touch-first para interações mobile.

**Assinatura:**
```ts
function useSwipe(
  target: Ref<HTMLElement | null>,
  options?: { 
    onSwipeStart?: (e) => void; 
    onSwipe?: (e) => void; 
    onSwipeEnd?: (e, direction: 'UP'|'DOWN'|'LEFT'|'RIGHT') => void 
  }
): { isSwiping: Ref<boolean>; direction: Ref<string>; lengthX: Ref<number>; lengthY: Ref<number> }
```

**Uso:**
```vue
<script setup>
import { ref } from 'vue';
import { useSwipe } from 'structure-ui';

const card = ref(null);
const { direction } = useSwipe(card, {
  onSwipeEnd: (e, dir) => {
    if (dir === 'RIGHT') alert('Liked!');
    if (dir === 'LEFT') alert('Disliked!');
  }
});
</script>
```

---

### `useSyncState`
Sincroniza estado entre SSR e Client (usando `useState` do Nuxt se disponível) e opcionalmente persiste no navegador.

**Assinatura:**
```ts
function useSyncState<T>(
  key: string, 
  initialValue: () => T, 
  options?: { persistence?: 'localStorage' | 'sessionStorage' }
): Ref<T>
```

**Uso:**
```vue
<script setup>
import { useSyncState } from 'structure-ui';

// Este estado será compartilhado entre componentes (se Nuxt) e salvo no localStorage
const theme = useSyncState('theme', () => 'light', {
  persistence: 'localStorage'
});
</script>
```

---

### `useScrollLock`
Trava o scroll do `body` quando um modal ou menu está aberto.

**Assinatura:**
```ts
function useScrollLock(isLocked: Ref<boolean>): void
```

**Uso:**
```vue
<script setup>
import { ref } from 'vue';
import { useScrollLock } from 'structure-ui';

const isOpen = ref(false);
useScrollLock(isOpen); // O scroll do body trava automaticamente quando isOpen = true
</script>
```

---

### `useFocusTrap`
Mantém o foco do teclado preso dentro de um container (essencial para Modais).

**Assinatura:**
```ts
function useFocusTrap(target: Ref<HTMLElement | null>, isActive: Ref<boolean>): void
```

---

### `useClickOutside`
Detecta cliques fora de um elemento alvo.

**Assinatura:**
```ts
function useClickOutside(
  target: Ref<HTMLElement | null>, 
  callback: () => void, 
  isActive: Ref<boolean>
): void
```

---

## 🧩 Catálogo de Componentes (API)

### `<Button>`
Um botão acessível que gerencia estados de carregamento e desabilitação.

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `disabled` | `boolean` | `false` | Desabilita o botão e aplica `aria-disabled`. |
| `loading` | `boolean` | `false` | Estado de carregamento. Aplica `aria-busy` e previne cliques. |
| `type` | `string` | `'button'` | Tipo HTML (`submit`, `reset`, `button`). |

**Slots:**
- `default`: Conteúdo do botão.
- `loading`: Conteúdo mostrado quando `loading=true` (ex: Spinner).

---

### `<Link>`
Abstração inteligente que renderiza `RouterLink` (para rotas internas) ou `<a>` (para externas).

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `to` | `string` | - | Rota interna (Vue Router). |
| `href` | `string` | - | URL externa. |
| `external` | `boolean` | `false` | Força renderização como `<a>` com `target="_blank"`. |
| `disabled` | `boolean` | `false` | Desabilita o link visualmente e remove a navegação. |

---

### `<Image>`
Imagem com Lazy Loading nativo, prevenção de CLS e cache de sessão.

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `src` | `string` | - | URL da imagem. |
| `width` | `number` | - | Largura intrínseca (para cálculo de aspect ratio). |
| `height` | `number` | - | Altura intrínseca (para cálculo de aspect ratio). |
| `loading` | `'lazy' \| 'eager'` | `'lazy'` | Estratégia de carregamento. |

**Slots:**
- `placeholder`: Mostrado enquanto a imagem não carrega/não está visível.
- `error`: Mostrado se a imagem falhar ao carregar.

---

### `<Modal>` / `<Drawer>`
Overlays completos com Focus Trap, Scroll Lock e Click Outside.

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `modelValue` | `boolean` | - | Controla visibilidade (`v-model`). |
| `closeOnOutsideClick` | `boolean` | `true` | Fecha ao clicar no backdrop. |
| `teleportTo` | `string` | `'body'` | Destino do Teleport. |

**Slots:**
- `default`: Recebe `{ close, titleId, descId }` no scope para facilitar a construção do conteúdo acessível.

---

### `<VirtualList>`
Renderiza listas massivas com alta performance.

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `items` | `Array` | `[]` | Lista de dados. |
| `itemHeight` | `number` | - | Altura fixa de cada item em pixels. |
| `buffer` | `number` | `5` | Quantos itens extras renderizar fora da viewport. |

**Slots:**
- `default`: Recebe `{ item, index }` para renderizar cada linha.

---

### `<LazyHydrate>`
Adia a hidratação de componentes pesados.

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `whenVisible` | `boolean` | `false` | Hidrata quando entra na viewport. |
| `whenIdle` | `boolean` | `false` | Hidrata quando o navegador está ocioso. |
| `ssr` | `boolean` | `false` | Se `true`, renderiza no server (mas não hidrata JS até o gatilho). |

**Slots:**
- `default`: O componente pesado.
- `placeholder`: O que mostrar antes da hidratação.

---

## 🛡️ Guia de Engenharia & Boas Práticas

### 1. Hydration Safety (O Fim do "Piscar")
O erro mais comum em SSR é gerar IDs aleatórios (`Math.random()`) no setup. Isso faz o servidor renderizar `id="123"` e o cliente `id="456"`, causando erros de hidratação e quebra de acessibilidade.

**✅ A Solução:** Use sempre `useStructureId`.
```js
// Garante que o ID seja o mesmo no Server e no Client
const inputId = useStructureId('field'); 
```

### 2. Core Web Vitals: CLS Zero
Imagens sem dimensões explícitas empurram o conteúdo para baixo quando carregam, destruindo sua pontuação de CLS (Cumulative Layout Shift).

**✅ A Solução:** O componente `<Image>` usa a técnica de "Aspect Ratio Box". Sempre forneça `width` e `height`.
```html
<!-- Reserva o espaço exato antes mesmo de baixar 1 byte da imagem -->
<Image src="/banner.jpg" :width="1920" :height="600" />
```

### 3. Gerenciamento da Main Thread (TBT)
Hidratar componentes pesados (como Mapas, Carrosséis complexos ou Gráficos) no carregamento inicial bloqueia a thread principal, deixando a página não interativa.

**✅ A Solução:** Use `<LazyHydrate>` para adiar a hidratação até que seja estritamente necessário.
```html
<!-- Só carrega o JS do mapa quando o usuário rolar até ele -->
<LazyHydrate whenVisible>
  <GoogleMaps />
</LazyHydrate>
```

### 4. Virtualização vs Paginação
Renderizar 5.000 linhas no DOM trava qualquer navegador. Paginação é uma solução, mas Scroll Infinito é melhor para UX em feeds.

**✅ A Solução:** Use `<VirtualList>` para renderizar apenas o que está na tela.
```html
<!-- Renderiza apenas ~10 itens no DOM, mesmo com 10.000 itens na lista -->
<VirtualList :items="bigData" :itemHeight="50" />
```

### 5. Acessibilidade "Invisível"
Ao criar componentes customizados, nunca remova o outline de foco sem fornecer uma alternativa visual clara.

**✅ A Solução:** Use classes de utilidade para gerenciar o foco.
```html
<!-- Tailwind example -->
<button class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
  Acessível e Bonito
</button>
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia nosso guia de contribuição antes de enviar um PR.

1. Fork o projeto
2. Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

**StructureUI** — Construído para a próxima geração de apps Vue.js.
