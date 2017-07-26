import Vue from 'vue';
import { Time } from './time';
import _ from 'lodash';

require('style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css');
require('bootstrap');

new Vue({
  el: '#app',
  data: {
    ordenar: {
      keys: ['pontos', 'gm', 'gs'],
      sort: ['desc', 'desc', 'asc']
    },
    filter:'',
    colunas: ['time', 'pontos', 'gm', 'gs', 'saldo'],
    times: [
      new Time('São Paulo', require('./assets/saopaulo.png')),
      new Time('Santos', require('./assets/santos.png')),
      new Time('Sem Mundial', require('./assets/semmundial.png')),
      new Time('Corinthians', require('./assets/corinthians.png')),
      new Time('Barcelona', require('./assets/barca.png')),
      new Time('Real Madrid', require('./assets/real.png')),
      new Time('Paris Saint Germain', require('./assets/psg.png')),
      new Time('Taquaritinga', require('./assets/cat.png'))
    ],
    novoJogo: {
      casa: {
        time: null,
        gols: 0
      },
      fora: {
        time: null,
        gols: 0
      }
    },
    view: 'tabela'
  },
  methods: {
    createNovoJogo() {
      let indexCasa = Math.floor(Math.random() * 8),
        indexFora = Math.floor(Math.random() * 8);

      this.novoJogo.casa.time = this.times[indexCasa];
      this.novoJogo.casa.gols = 0;
      this.novoJogo.fora.time = this.times[indexFora];
      this.novoJogo.fora.gols = 0;
      this.showView('novojogo');
    },
    showView(view) {
      this.view = view;
    },
    fimJogo() {
      let timeAdversario = this.novoJogo.fora.time;
      let gols = +this.novoJogo.casa.gols;
      let golsAdversario = +this.novoJogo.fora.gols;
      this.novoJogo.casa.time.fimJogo(timeAdversario, gols, golsAdversario);
      this.showView('tabela');
    },
    sortBy(col) {
      this.ordenar.keys = col;
      this.ordenar.sort = this.ordenar.sort === 'desc' ? 'asc' : 'desc';
    }
  },
  computed: {
    timesFiltered() {
      let colecao = _.orderBy(this.times, this.ordenar.keys, this.ordenar.sort);
      return _.filter(colecao, item => {
        return item.nome.indexOf(this.filter) >= 0;
      })
    }
  },
  filters: {
    saldo(time) {
      return time.gm - time.gs;
    },
    ucwords(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
});
