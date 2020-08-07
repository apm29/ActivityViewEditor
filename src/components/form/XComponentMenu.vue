<template>
  <draggable
    :list="templateList"
    :group="{ name: 'template', pull: 'clone', put: false }"
    :clone="cloneTemplate"
    v-bind="dragOptions"
    class="template-area"
  >
    <div
      v-for="element in templateList"
      :key="element.id"
      class="template-item"
    >
      <img
        alt="..."
        v-if="singleLineText(element)"
        class="widget-icon"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAG1BMVEVHcEwZHiYZHiUaHyMdKCgZHiYaISQYHiQZHiYtE7tIAAAACXRSTlMAZVUSCTQmQxxVUCeiAAAA7ElEQVQoz9WSTW7CQAxGTQIlSz6XDFumvUBSUYklpTkAkXqAgkTXmS5YE1Gp167HM8micwK+ReK8/DzbCtG9Z4oyhTMghRnwmcDeoEugW7jH1NP10bS97SJ8wDVjvdsCfI0eFr+vXyAxAdYl5Wqy5SZ3HD1isUuiAgeiOcJXsSZqSz9DFQ/eI52/8ThIFU6bptmrid7PNsAaGjHl375Q2AYoJoeny2uAMF8SZ8TxPIiKsIyeaQIa4HzQVfVqvIzNzNBpdVTYhgXlWGT4mP5Ce/MD+lhT6D7Ao0feYDoBq53lf+ve3uSpn7v5C/8Auc4hwIODgzAAAAAASUVORK5CYII="
      />
      <img
        alt="..."
        v-if="multipleLineText(element)"
        class="widget-icon"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAGFBMVEUZHiVHcEwYHCYZHiQaHiYdHSEaHSQhLS17jR+UAAAACHRSTlNmADVSJRNDB3u7OmgAAACUSURBVCjPYxDEAhioICjC4IgpKMaQiClYYMyOKejgxIIpaFDKDCQVGMCACSIoyiZoEAhkQgFEUIhFUEERXaUwu2CAIbqZAYmCwqzogglmaclsaILiUONRBEXYQkNDDRxRBcVALndIRLW9gBHkU3ZUd4LcKCjMhKoS5BtBEWYqRwcWQQUGFACxnQEN4FZJm2QzVN0JAJnJMuKEusQeAAAAAElFTkSuQmCC"
      />
      <img
        alt="..."
        v-if="numberInput(element)"
        class="widget-icon"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAG1BMVEUZHiVHcEweHyYZHScZHiUYHiUhKSkZHiMZHyeFN1kHAAAACXRSTlNlABArT1wIPxx2kW44AAAA40lEQVQoz92Su2+CUBTGv8jL9QOLjEB0xxrDitWhI6HRWdKk6Ui7dJWlf7fnXKDYtIm7Zzjn3l++87gP8B/DXUA/GYPAxUEWC+CTJjwrDIBEHdB2YUWEhSMwdtpXHBnbbVROiBnWApsJmU2ZueTZIh6eAoHFljxZzFcmIKDCt5qMLdP/PNXuCtUa18wkSSOM8EGG+8Krr2Bsqw7YXUG/PIoP1zmqES6drrJmDNAvq/4S5qgH2Am/WrPtYS/UM8x+lEs8pmnKzEv8xhtqFno9jqjEtr+gDLoBXv4+x/v33fylm/ACBXhC6aliFlMAAAAASUVORK5CYII="
      />
      <img
        alt="..."
        v-if="radio(element) || switcher(element)"
        class="widget-icon"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAHlBMVEUYHiZHcEwnMTEZHSMbHiUZHyYbGyUYHCUZGyUaGiTzZ3XQAAAACnRSTlNmAAZQK10fRDcO712dBgAAAPJJREFUKM+Nk0EPwUAQhV9UqaNVxM0GcS0nbiXhXOIHkEjEDQfnJv4Akfi9dqctjTxiLrv92t15M/OKKgn8hOqx1x9Q7SLAPes8VDEkPJ2DM2A0316A1Rv24U7t2o1wyqAK3ElymR85OoUdjLO8dwxTeCi/xKhDOYG+vE2jg4nAnnt7w1a0FBgX8yWGnoUKizysQxvYgOjxAydZsTGwCS1aAdGocDSw7tgParb0gd0FCwPbntxvoWSMCwZeZRtYKGfCioHrkvRAwu7M8xdIj9NEVBIVT8ukDaGt402m46CD4yOmZqC24QbjVqSm5fb+4+94AgpfSS+2ESzdAAAAAElFTkSuQmCC"
      />
      <img
        alt="..."
        v-if="select(element) || checkbox(element)"
        class="widget-icon"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAG1BMVEUZHiZHcEwYHCgYHiUZHSYZHiUfIyolJSUXHCUVEW/fAAAACXRSTlNlAB1dNyUQBkxicou6AAAA+klEQVQoz52TvRKCMAyAI9WTFeRnhfP0HNHBuQzu6jm4Vl5A3oDF9zZNglUvi3YBPr6QNA2QKAt+h8Xq7L5geQVcj/4dlhZoTfs3uARzWN8uDewCzCCu/TUdoH1Ba078sbyZjjCD/Zi3I9XDyvQjLJuIYdnsQ92dF8BHnwLMfTzCexxY1Q5zgsfoxVKYVDOCwzaIUC9iglwwixFm8LAIeVDETA5hincbN4r0CPSKK/UiBTK0xoko0Pu0exIlnBKhyqIkopJQZVFK4uKtYTGR4mmbGbCYyDa5IVY6IA3h1uXuo3Vqk9Xj0A9OPWJ9GNSx0QdMHUV9aP/9EZ69VkfnYpHYCAAAAABJRU5ErkJggg=="
      />
      <img
        alt="..."
        v-if="datePicker(element)"
        class="widget-icon"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAG1BMVEUZHiVHcEwYHCNISEgZHyYYHycUHCwaJSUZICVNlGYDAAAACXRSTlNlAFEDVjYcC0MdqMEEAAAAy0lEQVQoz73TOw+CMBDA8VPEdrTUxypN3CVgXDU+4oivXRPjXDZGBhO/tkcLpiUqi/rf+C3XNgewF8F7vGz1V29tYOZoHNMnhkFGeIgFkvJQ4eAGjYzEgLmSdmCTIEZgIywQYxB+5uwENpLUE+AizggOInqQxEGyhQg+43E53WXMA40sPWvs3w00+z9Or0WJgerm6vZ1ODkW7b94zrDIxFM5vV1zJJ6KopePzH/5nnMbuzkOiY2yqXZpaaV2KYJK+dbxg22r4NOPUOkBusBGIdKfBoUAAAAASUVORK5CYII="
      />
      <img
        alt="..."
        v-if="timePicker(element)"
        class="widget-icon"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAG1BMVEUZHiVHcEwZHSIZHyYZIiQZHiYZHyYcHicYHyWJZRsxAAAACXRSTlNlAFFWCkU4I17EnVm3AAAA10lEQVQoz83Tvw8BMRQH8O/RHqNycUZ3CyMhrD2/5hrsJySMhxCjGPzd3suJtH7NvkvTT5qX5vUV6kPwHQ/LfFcfWmhEjlr+wmALz4gUFF/LBm4J4Rguok+YluPIiH1MaWlZjS8+YUe4NXWREJFSqZdjxVeqigfOdjmGawvt/AsGp03yhmegRMt0YWHIPZorlRUsbEAaUDOa0sIMu6CD4ZFrPDGlEyMuEVlofH4ooJhYOOH7hO3rUv1x67ou1hibwkVd4FlCzwl4lmp4SZeHduXa4OdHeMkd5fRAC6/z8FAAAAAASUVORK5CYII="
      />
      <img
        alt="..."
        v-if="rate(element)"
        class="widget-icon"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAALVBMVEVHcEyjpaijpaikpaikpaijpqijpamipKijpainp6ujpaijpKmjpqiho6ijpaiC2bxJAAAADnRSTlMAUNMrppGze2IL6DvAGUTLTL8AAAEzSURBVCjPY2CgEphsiSnGrPfIAEOQ6d07BQzBvmd1LzAE9R7yPUIX43iXwPauAcNIAV4MQ+WeMTDkPcQwEiiBauhk8XcJDAxs7wrhHuBuTXr37p0AAwMjkFKL2ADxCpD97gmIWQdigT3GBpQOF4ZoMixNWgcyiIHrzU0U488tAJIs7wqQBVkgrn33FFnQD2QlA8O8dwHICiE+4Fz3FEMhA8Otdw7oCoEuXfcEQyEDgxHMAezvEGHCjBAUQBKEBi8jUjhzvNsAk0W4jvXdBCgL7HEI4HkFD+sFcEGuN0AvFKkDlcc9gAveA7qz6d07dWDsP0bE2nMGGVD4ajDsQ7iz7uGWd+8iWYGi854jksybd++cGRiuvnt3DpF0rN69ywbRpu/eLYYLMvo5Qhhblwkw0AgAAP9derYvPabEAAAAAElFTkSuQmCC"
      />
      <img
        alt="..."
        v-if="alert(element)"
        class="widget-icon"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAHlBMVEUZHiZHcEwnMTEZHCcZHSUcHyYZHyYZHSUcHCYYHCWYRM0AAAAACnRSTlNmAAYgUitdOA9EtOoRvAAAAQ1JREFUKM+N0zFrwkAUB/A/VRMz5oISNw9swa2hCLpJFx2NgvMpdM9QcLW0pautX9jLe3cxyqt4S7hfkncv770gFhZuovoc6ytUEwMER11HVYBWqGu4Bmar0TvwdsYhgmV5fTT486imQc7BOqapHQ4w9+d+4dXhIaqSUYeIsUN34x8KMUBO+BR82F2KsMTUbAmLVrlL0KQAi7BEhQ1FM/Rk3IW2mIDz+c44K2QWe9D1Cin8WuxyrHS3Y51uLPY5lj8oLh4s7luXuGhbfG5cot3/g+Lr4kEupQopJZe8R07efaZH/kxXEI9cELF0rsjqZVwvsmsHL98OsXFyi8VhEMdGHjB5FMWhlcf7jr/jBIMdTHb6vXXXAAAAAElFTkSuQmCC"
      />
      <img
        alt="..."
        v-if="attachment(element)"
        class="widget-icon"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAGFBMVEUYHiZHcEwYHiMbISUcHicjKSoYHiYaHSVZqXl3AAAACHRSTlNlAE4XJAc2RvTCh8wAAAEGSURBVCjPtZKxcsIwDIb/GqhXVGNYwx3spk8Ab5Ck184h0M6h7z9Uso3tUEbQ4NN9+WzLikB3Ag+Fn80/aAao71vYgeOQoNny0kKfe0wTdIrIVmpHtMcuQiPfW1x8uo7Q8Um20uHgSYCFyMJrgKVI8wBHIs21hyORam9m0Qrc+4uy6Pg1Fi8MbRINZpIdGK6yKNmg5ZmO12UQ/ZatwI731CqJqhFYrf2NhUiwODKclSLBSFfdtBQFchPfcO6yGE3DvyGL8Ux6B3f9KsbbiT6aLEqdk9ieJDKsr2kSGS5jd7Morat0MxYFtlINfSGJAu0A/dPDl5anbiEjhM3NKJpfqNPTxjvEHzyKSP4qWAGJAAAAAElFTkSuQmCC"
      />
      <img
        alt="..."
        v-if="imageUpload(element)"
        class="widget-icon"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAFVBMVEVHcEwZHiYZHSIcHB4dHiYZHSYZHSWLIHzBAAAAB3RSTlMAZjQQIVdIOwNhIAAAALFJREFUKM+9kj0OwyAMhS1osr8ksLtSO8OQPdygUdq93P8SBZKogrC1ypNYvucfZJvoLMkZhZShBgc9yOprId+THcqC7k/wNh2hwHCEDJgSCjzRl5CVccrkUGBJL4Mco1hF0C4bXINEmAORD36CvJbzOjrBilBt1Vq8ySnWCWLv6zs598FKcG/b4I4pWCndfBfTEY3IhzzGDwQrg/IVkywq87zUIPHvO6odQ/Vsqgd2lj6zvie3/UanrAAAAABJRU5ErkJggg=="
      />
      {{ element.templateName }}
    </div>
  </draggable>
</template>

<script>
import TypedTemplateMixin from "@/components/form/TypedTemplateMixin";
import draggable from "vuedraggable";

export default {
  name: "XComponentMenu",
  mixins: [TypedTemplateMixin],
  components: {
    draggable
  },
  data: function() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.template-area {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: start;
  height: 100%;
}

.template-item {
  width: 45%;
  margin: 6px 4px;
  cursor: move;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  padding: 8px 4px;
  background-color: white;
  border-radius: 4px;
  border: #ddd 1px solid;
  /*box-shadow: #c8ebfb 2px 2px 4px;*/
  font-weight: bolder;
}
.widget-icon {
  width: 18px;
  height: 18px;
  margin-right: 5px;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
