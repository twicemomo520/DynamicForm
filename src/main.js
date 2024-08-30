import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// import * as echarts from 'echarts/core';
// import { TooltipComponent, LegendComponent } from 'echarts/components';
// import { PieChart } from 'echarts/charts';
// import { LabelLayout } from 'echarts/features';
// import { CanvasRenderer } from 'echarts/renderers';

// echarts.use([
//   TooltipComponent,
//   LegendComponent,
//   PieChart,
//   CanvasRenderer,
//   LabelLayout
// ]);
// Vue.prototype.$echarts = echarts


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
